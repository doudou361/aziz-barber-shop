import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import {
  createBarberShears,
  createMaterials,
  createStudioEnvMap,
} from '../three/groomingModels';

interface CraftShearsCanvasProps {
  scrollProgress: number; // 0..1 across section
  targetOpenDeg: number;
  targetTiltDeg: number;
  snipSignal: number; // increments when user clicks to snip
  reducedMotion?: boolean;
}

/**
 * Hero-scale interactive 3D forged stainless-steel barber shears for Section 4 ("THE CRAFT").
 * Reproduces the signature blade opening, closing snip, rotation sweep, and sliding golden specular glint.
 */
export const CraftShearsCanvas: React.FC<CraftShearsCanvasProps> = ({
  scrollProgress,
  targetOpenDeg,
  targetTiltDeg,
  snipSignal,
  reducedMotion = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef({
    scrollProgress,
    targetOpenDeg,
    targetTiltDeg,
    reducedMotion,
    mouseX: 0,
    mouseY: 0,
    snipImpulse: 0,
  });

  stateRef.current.scrollProgress = scrollProgress;
  stateRef.current.targetOpenDeg = targetOpenDeg;
  stateRef.current.targetTiltDeg = targetTiltDeg;
  stateRef.current.reducedMotion = reducedMotion;

  useEffect(() => {
    if (snipSignal > 0) {
      stateRef.current.snipImpulse = 1.0;
    }
  }, [snipSignal]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.32;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const envMap = createStudioEnvMap(renderer);
    scene.environment = envMap;

    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
    camera.position.set(0, 0, 9.4);

    // Razor-crisp directional studio lights + moving champagne glint pinpoint
    const keyLight = new THREE.DirectionalLight('#ffffff', 2.8);
    keyLight.position.set(4, 6, 8);
    scene.add(keyLight);

    const backRim = new THREE.DirectionalLight('#dde6f7', 2.2);
    backRim.position.set(-6, -3, -5);
    scene.add(backRim);

    const glintLight = new THREE.PointLight('#ffe8b6', 24, 14);
    glintLight.position.set(-1.2, 1.5, 2.8);
    scene.add(glintLight);

    const mats = createMaterials();
    const shears = createBarberShears(mats);
    shears.group.scale.setScalar(0.84);
    shears.group.position.set(0.0, -0.05, 0);
    scene.add(shears.group);

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 680;
      const h = container.clientHeight || 520;
      const aspect = w / h;
      camera.aspect = aspect;
      // Dynamically pull camera back on narrow viewports so tips, rings & tang never clip
      camera.position.z = aspect < 0.95 ? 16.0 : aspect < 1.25 ? 12.6 : 11.4;
      shears.group.position.x = aspect < 0.95 ? 0.15 : 0.1;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    };
    handleResize();
    const ro = new ResizeObserver(handleResize);
    ro.observe(container);

    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      stateRef.current.mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      stateRef.current.mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    let visible = true;
    const io = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? true;
      },
      { rootMargin: '120px' }
    );
    io.observe(container);

    let raf = 0;
    let currentOpen = 46;
    const clock = new THREE.Clock();

    const animate = () => {
      raf = requestAnimationFrame(animate);
      if (!visible) return;

      const dt = Math.min(clock.getDelta(), 0.05);
      const t = clock.getElapsedTime();
      const s = stateRef.current;

      // Decay click-to-snip impulse smoothly (sharp snap shut then effortless reopen)
      if (s.snipImpulse > 0.001) {
        s.snipImpulse = Math.max(0, s.snipImpulse - dt * 2.1);
      }
      const snipClose = Math.sin(s.snipImpulse * Math.PI) * 38;

      // Scroll drives organic open -> close -> sweep articulation matching video 4.375s -> 4.875s
      const scrollWave = s.reducedMotion ? 0 : Math.sin(s.scrollProgress * Math.PI * 1.4) * 22;
      const breathe = s.reducedMotion ? 0 : Math.sin(t * 1.25) * 3.5;

      const desiredOpen = Math.max(6, Math.min(68, s.targetOpenDeg + scrollWave + breathe - snipClose));
      currentOpen = THREE.MathUtils.lerp(currentOpen, desiredOpen, 0.12);
      shears.setOpenAngle(currentOpen);

      // Dramatic sweep tilt as user scrolls across The Craft
      const baseTiltRad = THREE.MathUtils.degToRad(s.targetTiltDeg);
      const scrollSpin = s.reducedMotion ? 0 : (s.scrollProgress - 0.5) * 0.72;
      const targetRotZ = baseTiltRad - scrollSpin;
      const targetRotY = s.reducedMotion ? -0.12 : -0.14 + s.mouseX * 0.32 + Math.sin(t * 0.55) * 0.07;
      const targetRotX = s.reducedMotion ? 0.08 : 0.08 + s.mouseY * 0.22 + Math.cos(t * 0.65) * 0.05;

      shears.group.rotation.z = THREE.MathUtils.lerp(shears.group.rotation.z, targetRotZ, 0.08);
      shears.group.rotation.y = THREE.MathUtils.lerp(shears.group.rotation.y, targetRotY, 0.08);
      shears.group.rotation.x = THREE.MathUtils.lerp(shears.group.rotation.x, targetRotX, 0.08);
      shears.group.position.y = THREE.MathUtils.lerp(
        shears.group.position.y,
        s.reducedMotion ? -0.05 : -0.05 + Math.sin(t * 0.9) * 0.1,
        0.08
      );

      // Sweep golden glint pinpoint along upper steel blade edge
      if (!s.reducedMotion) {
        const sweep = Math.sin(t * 0.95) * 2.6;
        glintLight.position.set(-1.0 + sweep, 1.4 + Math.cos(t * 0.95) * 0.8, 2.7);
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onPointerMove);
      ro.disconnect();
      io.disconnect();
      envMap.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full min-h-[340px] sm:min-h-[440px] lg:min-h-[540px] cursor-pointer"
      aria-label="Interactive articulated Japanese steel barber shears — click to snip"
      role="img"
    />
  );
};

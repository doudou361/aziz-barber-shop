import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import {
  createBarberShears,
  createCordlessClipper,
  createMaterials,
  createMatteElixirBottle,
  createStudioEnvMap,
} from '../three/groomingModels';

interface OrbitingToolsCanvasProps {
  variant: 'services' | 'experience' | 'halo';
  scrollProgress: number;
  paused?: boolean;
  reducedMotion?: boolean;
}

/**
 * Lightweight 3D orbiting studio instruments layered over the luxury barber chair scenes:
 * - 'services': angled clipper & shears gliding smoothly beside chair (reference screen_015.png)
 * - 'experience': clipper lower-left + open shears upper-left flanking chair (reference screen_025.png)
 * - 'halo': sculptural matte-black grooming mist bottle floating on upper-left halo arc (reference screen_031.png)
 */
export const OrbitingToolsCanvas: React.FC<OrbitingToolsCanvasProps> = ({
  variant,
  scrollProgress,
  paused = false,
  reducedMotion = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef({ scrollProgress, paused, reducedMotion });
  stateRef.current = { scrollProgress, paused, reducedMotion };

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
    renderer.toneMappingExposure = 1.25;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const envMap = createStudioEnvMap(renderer);
    scene.environment = envMap;

    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    camera.position.set(0, 0, 10.5);

    const key = new THREE.DirectionalLight('#fff2d6', 2.6);
    key.position.set(4, 5, 6);
    scene.add(key);

    const rim = new THREE.DirectionalLight('#f4cf84', 2.2);
    rim.position.set(-5, 3, -4);
    scene.add(rim);

    const mats = createMaterials();

    const clipper = variant !== 'halo' ? createCordlessClipper(mats) : null;
    const shears = variant !== 'halo' ? createBarberShears(mats) : null;
    const bottle = variant === 'halo' ? createMatteElixirBottle(mats) : null;

    if (clipper) {
      clipper.scale.setScalar(variant === 'services' ? 0.50 : 0.72);
      scene.add(clipper);
    }
    if (shears) {
      shears.group.scale.setScalar(variant === 'services' ? 0.34 : 0.44);
      shears.setOpenAngle(38);
      scene.add(shears.group);
    }
    if (bottle) {
      bottle.scale.setScalar(0.84);
      scene.add(bottle);
    }

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 500;
      const h = container.clientHeight || 500;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    };
    handleResize();
    const ro = new ResizeObserver(handleResize);
    ro.observe(container);

    let visible = true;
    const io = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? true;
      },
      { rootMargin: '100px' }
    );
    io.observe(container);

    let raf = 0;
    const clock = new THREE.Clock();
    let elapsed = 0;

    const animate = () => {
      raf = requestAnimationFrame(animate);
      if (!visible) return;
      const dt = Math.min(clock.getDelta(), 0.05);
      const { scrollProgress: sp, paused: isPaused, reducedMotion: rm } = stateRef.current;
      if (!isPaused && !rm) {
        elapsed += dt;
      }

      const drift = (sp - 0.5) * 1.4;

      if (variant === 'services' && clipper && shears) {
        clipper.position.set(-1.78 + drift * 0.2, 1.55 + Math.sin(elapsed * 1.1) * 0.12 - drift * 0.32, 0.4);
        clipper.rotation.set(0.2, 0.42 + drift * 0.3, -0.38);

        shears.group.position.set(1.55, 1.65 + Math.cos(elapsed * 1.0) * 0.1 + drift * 0.3, 0.4);
        shears.group.rotation.set(0.16, -0.32, 0.78 + drift * 0.22);
        shears.setOpenAngle(36 + Math.sin(elapsed * 1.4) * 10);
      } else if (variant === 'experience' && clipper && shears) {
        // Matches reference screen_025.png: clipper lower-left of chair, shears hovering upper-left
        clipper.position.set(-1.55, -0.68 + Math.sin(elapsed * 1.15) * 0.14 - drift * 0.5, 0.8);
        clipper.rotation.set(0.14, 0.42 + drift * 0.25, 0.42);

        shears.group.position.set(-0.35, 1.38 + Math.cos(elapsed * 1.05) * 0.12 + drift * 0.42, 0.6);
        shears.group.rotation.set(0.12, -0.22, 1.18 - drift * 0.28);
        shears.setOpenAngle(32 + Math.sin(elapsed * 1.3) * 12);
      } else if (variant === 'halo' && bottle) {
        // Matches reference screen_031.png: sculptural dark bottle orbiting upper-left arc of golden halo
        bottle.position.set(
          -0.95 + Math.sin(elapsed * 0.7) * 0.1,
          1.12 + Math.cos(elapsed * 0.95) * 0.14 - drift * 0.3,
          0.9
        );
        bottle.rotation.set(0.14, 0.5 + elapsed * 0.22, -0.45 + Math.sin(elapsed * 0.8) * 0.05);
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      envMap.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [variant]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-20 h-full w-full"
      aria-hidden="true"
    />
  );
};

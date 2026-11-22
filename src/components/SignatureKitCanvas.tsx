import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import {
  createAmberElixirBottle,
  createCarbonComb,
  createCordlessClipper,
  createDetailTrimmer,
  createMaterials,
  createPomadeJar,
  createStraightRazor,
  createStudioEnvMap,
} from '../three/groomingModels';

interface SignatureKitCanvasProps {
  focusTool: 'all' | 'clipper' | 'elixir' | 'razor';
  scrollProgress: number; // 0..1 as section traverses viewport
  reducedMotion?: boolean;
}

export const SignatureKitCanvas: React.FC<SignatureKitCanvasProps> = ({
  focusTool,
  scrollProgress,
  reducedMotion = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef({
    focusTool,
    scrollProgress,
    reducedMotion,
    mouseX: 0,
    mouseY: 0,
  });

  stateRef.current.focusTool = focusTool;
  stateRef.current.scrollProgress = scrollProgress;
  stateRef.current.reducedMotion = reducedMotion;

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
    renderer.toneMappingExposure = 1.24;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const envMap = createStudioEnvMap(renderer);
    scene.environment = envMap;

    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    camera.position.set(0, 0.1, 10.6);

    // Studio rim & key lighting matching screen_009.png
    const keyLight = new THREE.DirectionalLight('#fff4df', 2.4);
    keyLight.position.set(5, 6, 7);
    scene.add(keyLight);

    const coolRim = new THREE.DirectionalLight('#d7e4f8', 2.0);
    coolRim.position.set(-7, 4, -4);
    scene.add(coolRim);

    const goldRim = new THREE.PointLight('#f3cf85', 14, 18);
    goldRim.position.set(5.5, -2.5, 4);
    scene.add(goldRim);

    const mats = createMaterials();
    const kitRoot = new THREE.Group();
    scene.add(kitRoot);

    // Exact 5-tool zero-gravity editorial composition matching reference screen_009.png
    const clipper = createCordlessClipper(mats);
    clipper.scale.setScalar(1.06);
    kitRoot.add(clipper);

    const trimmer = createDetailTrimmer(mats);
    trimmer.scale.setScalar(0.95);
    kitRoot.add(trimmer);

    const comb = createCarbonComb(mats);
    comb.scale.setScalar(0.98);
    kitRoot.add(comb);

    const elixir = createAmberElixirBottle(mats);
    elixir.scale.setScalar(0.95);
    kitRoot.add(elixir);

    const razor = createStraightRazor(mats);
    razor.scale.setScalar(0.96);
    kitRoot.add(razor);

    const pomade = createPomadeJar(mats);
    pomade.scale.setScalar(0.92);
    kitRoot.add(pomade);

    // Base reference positions (right-stage cluster)
    const layouts = {
      all: {
        clipper: { pos: [-0.25, -0.05, 0.4], rot: [0.16, 0.28, 0.3], scale: 1.08 },
        trimmer: { pos: [-2.25, -1.1, 0.9], rot: [0.22, 0.36, 0.56], scale: 0.96 },
        comb: { pos: [0.85, 0.45, -0.75], rot: [0.1, -0.18, -0.06], scale: 1.0 },
        elixir: { pos: [2.25, 1.15, 0.2], rot: [0.16, -0.24, -0.28], scale: 0.96 },
        razor: { pos: [2.15, -0.58, 0.65], rot: [0.15, -0.22, 0.98], scale: 0.92 },
        pomade: { pos: [2.35, -1.62, 0.45], rot: [0.24, -0.3, 0.04], scale: 0.94 },
      },
      clipper: {
        clipper: { pos: [0.2, 0.0, 1.4], rot: [0.08, -0.22, 0.18], scale: 1.32 },
        trimmer: { pos: [-2.05, -0.45, 1.15], rot: [0.14, 0.42, 0.34], scale: 1.16 },
        comb: { pos: [2.1, 0.55, -1.2], rot: [0.06, -0.25, -0.14], scale: 0.85 },
        elixir: { pos: [3.2, 1.5, -1.4], rot: [0.12, -0.3, -0.2], scale: 0.72 },
        razor: { pos: [2.9, -1.1, -1.2], rot: [0.1, -0.2, 0.85], scale: 0.72 },
        pomade: { pos: [3.1, -1.9, -1.4], rot: [0.2, -0.2, 0.04], scale: 0.72 },
      },
      elixir: {
        clipper: { pos: [-2.3, -0.25, -1.3], rot: [0.2, 0.4, 0.38], scale: 0.78 },
        trimmer: { pos: [-3.1, -1.35, -1.5], rot: [0.24, 0.45, 0.6], scale: 0.7 },
        comb: { pos: [-0.8, 0.75, -1.4], rot: [0.08, -0.1, -0.05], scale: 0.82 },
        elixir: { pos: [0.55, 0.45, 1.55], rot: [0.1, -0.18, -0.16], scale: 1.48 },
        razor: { pos: [2.5, -0.2, -0.8], rot: [0.14, -0.3, 0.92], scale: 0.78 },
        pomade: { pos: [1.55, -1.25, 1.35], rot: [0.22, -0.26, 0.02], scale: 1.32 },
      },
      razor: {
        clipper: { pos: [-2.4, 0.1, -1.3], rot: [0.16, 0.35, 0.32], scale: 0.76 },
        trimmer: { pos: [-3.1, -1.25, -1.5], rot: [0.22, 0.4, 0.55], scale: 0.68 },
        comb: { pos: [-0.45, 0.25, 1.1], rot: [0.08, 0.2, -0.12], scale: 1.24 },
        elixir: { pos: [2.8, 1.45, -1.3], rot: [0.14, -0.3, -0.25], scale: 0.75 },
        razor: { pos: [1.15, -0.1, 1.55], rot: [0.06, -0.12, 0.62], scale: 1.44 },
        pomade: { pos: [2.45, -1.65, -0.7], rot: [0.24, -0.25, 0.04], scale: 0.82 },
      },
    } as const;

    const objects = { clipper, trimmer, comb, elixir, razor, pomade };

    // Initialize positions immediately
    (Object.keys(objects) as Array<keyof typeof objects>).forEach((k) => {
      const cfg = layouts.all[k];
      objects[k].position.set(cfg.pos[0], cfg.pos[1], cfg.pos[2]);
      objects[k].rotation.set(cfg.rot[0], cfg.rot[1], cfg.rot[2]);
      objects[k].scale.setScalar(cfg.scale);
    });

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 640;
      const h = container.clientHeight || 520;
      camera.aspect = w / h;
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
    const clock = new THREE.Clock();

    const phases: Record<keyof typeof objects, number> = {
      clipper: 0.0,
      trimmer: 1.3,
      comb: 2.4,
      elixir: 3.6,
      razor: 4.5,
      pomade: 5.4,
    };

    const animate = () => {
      raf = requestAnimationFrame(animate);
      if (!visible) return;

      const t = clock.getElapsedTime();
      const { focusTool: focus, scrollProgress: sp, reducedMotion: rm, mouseX, mouseY } =
        stateRef.current;
      const targetLayout = layouts[focus];
      const scrollOffset = (sp - 0.5) * 1.15;

      (Object.keys(objects) as Array<keyof typeof objects>).forEach((key, idx) => {
        const obj = objects[key];
        const tgt = targetLayout[key];
        const phase = phases[key];
        const floatY = rm ? 0 : Math.sin(t * 1.15 + phase) * 0.12;
        const floatRot = rm ? 0 : Math.cos(t * 0.85 + phase) * 0.045;
        const parallaxDir = idx % 2 === 0 ? 1 : -0.85;

        const tx = tgt.pos[0] + (rm ? 0 : mouseX * 0.14 * parallaxDir);
        const ty = tgt.pos[1] + floatY + (rm ? 0 : scrollOffset * 0.42 * parallaxDir);
        const tz = tgt.pos[2];

        obj.position.x = THREE.MathUtils.lerp(obj.position.x, tx, 0.075);
        obj.position.y = THREE.MathUtils.lerp(obj.position.y, ty, 0.075);
        obj.position.z = THREE.MathUtils.lerp(obj.position.z, tz, 0.075);

        obj.rotation.x = THREE.MathUtils.lerp(
          obj.rotation.x,
          tgt.rot[0] + floatRot + (rm ? 0 : mouseY * 0.14),
          0.075
        );
        obj.rotation.y = THREE.MathUtils.lerp(
          obj.rotation.y,
          tgt.rot[1] + floatRot * 1.3 + (rm ? 0 : mouseX * 0.24 + scrollOffset * 0.28),
          0.075
        );
        obj.rotation.z = THREE.MathUtils.lerp(
          obj.rotation.z,
          tgt.rot[2] + (rm ? 0 : Math.sin(t * 0.7 + phase) * 0.03),
          0.075
        );

        const nextScale = THREE.MathUtils.lerp(obj.scale.x, tgt.scale, 0.075);
        obj.scale.setScalar(nextScale);
      });

      kitRoot.rotation.y = THREE.MathUtils.lerp(
        kitRoot.rotation.y,
        rm ? 0 : mouseX * 0.14,
        0.05
      );
      kitRoot.rotation.x = THREE.MathUtils.lerp(
        kitRoot.rotation.x,
        rm ? 0 : mouseY * 0.08,
        0.05
      );

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
      className="relative h-full w-full min-h-[340px] sm:min-h-[420px] lg:min-h-[520px]"
      aria-label="Interactive 3D zero-gravity luxury barber grooming kit showcase"
      role="img"
    />
  );
};

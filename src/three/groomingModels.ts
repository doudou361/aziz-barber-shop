import * as THREE from 'three';

/**
 * Generates a high-contrast dark luxury studio HDRI environment map
 * with cool-white softbox ribbons and warm champagne-gold rim lights
 * so brushed chrome and glass objects look photorealistic on #050505.
 */
export function createStudioEnvMap(renderer: THREE.WebGLRenderer): THREE.Texture {
  const pmrem = new THREE.PMREMGenerator(renderer);
  pmrem.compileEquirectangularShader();

  const envScene = new THREE.Scene();
  envScene.background = new THREE.Color('#040404');

  const addPanel = (
    w: number,
    h: number,
    color: string,
    intensity: number,
    pos: [number, number, number],
    lookAt: [number, number, number] = [0, 0, 0]
  ) => {
    const geo = new THREE.PlaneGeometry(w, h);
    const mat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(color).multiplyScalar(intensity),
      side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(...pos);
    mesh.lookAt(...lookAt);
    envScene.add(mesh);
  };

  // Front-studio satin reflection card so flat brushed-chrome blades always shimmer silver-champagne
  addPanel(16, 12, '#eef2f7', 1.65, [0, 1.8, 12]);
  // Overhead primary softbox ribbon (razor-clean chrome reflections)
  addPanel(14, 3.2, '#ffffff', 3.4, [0, 8, 2]);
  // Diagonal key softbox (upper right-front)
  addPanel(8, 10, '#fff5e2', 2.8, [7, 5, 6]);
  // Warm champagne-gold rim accent strip (right)
  addPanel(4.5, 11, '#f3cf85', 3.1, [9, -1, -2]);
  // Crisp cool silver rim strip (left-back edge separation)
  addPanel(5, 11, '#dce6f5', 2.4, [-9, 2, -3]);
  // Warm bronze under-bounce so lower bevels never collapse to flat black
  addPanel(12, 4, '#b88e4b', 1.4, [0, -7, 4]);
  // Bright pinpoint highlight strip for blade edge glint
  addPanel(2.4, 2.4, '#fff8e8', 5.2, [3, 6, 7]);

  const rt = pmrem.fromScene(envScene, 0.03);
  pmrem.dispose();
  return rt.texture;
}

export function createMaterials() {
  const chrome = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#f1f3f6'),
    metalness: 0.96,
    roughness: 0.16,
    clearcoat: 0.85,
    clearcoatRoughness: 0.08,
    reflectivity: 1.0,
    envMapIntensity: 1.65,
  });

  const brushedSteel = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#d3d7dc'),
    metalness: 0.94,
    roughness: 0.24,
    clearcoat: 0.35,
    clearcoatRoughness: 0.22,
    envMapIntensity: 1.35,
  });

  const darkChrome = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#272729'),
    metalness: 0.92,
    roughness: 0.22,
    clearcoat: 0.65,
    clearcoatRoughness: 0.14,
    envMapIntensity: 1.4,
  });

  const matteObsidian = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#131212'),
    metalness: 0.28,
    roughness: 0.56,
    clearcoat: 0.18,
    clearcoatRoughness: 0.48,
    envMapIntensity: 1.0,
  });

  const glossyObsidian = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#0f0e0e'),
    metalness: 0.15,
    roughness: 0.16,
    clearcoat: 1.0,
    clearcoatRoughness: 0.08,
    envMapIntensity: 1.35,
  });

  const champagneGold = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#e4c27f'),
    metalness: 0.95,
    roughness: 0.2,
    clearcoat: 0.5,
    clearcoatRoughness: 0.15,
    envMapIntensity: 1.45,
  });

  const amberGlass = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#6b3b12'),
    emissive: new THREE.Color('#2c1404'),
    emissiveIntensity: 0.45,
    metalness: 0.08,
    roughness: 0.09,
    clearcoat: 1.0,
    clearcoatRoughness: 0.05,
    envMapIntensity: 1.7,
  });

  return {
    chrome,
    brushedSteel,
    darkChrome,
    matteObsidian,
    glossyObsidian,
    champagneGold,
    amberGlass,
  };
}

/**
 * Helper to create a single sculpted forged-steel barber shear blade half.
 * Pivot center is precisely at (0, 0, 0); blade extends left (-X), ring right (+X).
 */
function buildShearHalf(
  mats: ReturnType<typeof createMaterials>,
  isLower: boolean
): THREE.Group {
  const half = new THREE.Group();

  // 1. Sleek tapered hollow-ground razor blade + shank
  const bladeShape = new THREE.Shape();
  if (!isLower) {
    // Upper blade: straight cutting edge along y = -0.02, curved convex spine along +Y
    bladeShape.moveTo(-3.95, -0.015);
    bladeShape.quadraticCurveTo(-2.35, -0.04, -0.25, -0.08);
    bladeShape.quadraticCurveTo(0.2, -0.14, 0.55, -0.16);
    bladeShape.lineTo(1.72, 0.24);
    bladeShape.quadraticCurveTo(1.88, 0.31, 1.84, 0.42);
    bladeShape.quadraticCurveTo(1.74, 0.5, 1.56, 0.44);
    bladeShape.lineTo(0.45, 0.16);
    bladeShape.quadraticCurveTo(0.05, 0.24, -0.35, 0.29);
    bladeShape.quadraticCurveTo(-2.1, 0.34, -3.95, -0.015);
  } else {
    // Lower blade: mirrored cutting edge along y = +0.02, convex spine along -Y
    bladeShape.moveTo(-3.95, 0.015);
    bladeShape.quadraticCurveTo(-2.35, 0.04, -0.25, 0.08);
    bladeShape.quadraticCurveTo(0.2, 0.14, 0.55, 0.16);
    bladeShape.lineTo(1.78, -0.26);
    bladeShape.quadraticCurveTo(1.94, -0.33, 1.9, -0.44);
    bladeShape.quadraticCurveTo(1.8, -0.52, 1.62, -0.46);
    bladeShape.lineTo(0.45, -0.16);
    bladeShape.quadraticCurveTo(0.05, -0.24, -0.35, -0.29);
    bladeShape.quadraticCurveTo(-2.1, -0.34, -3.95, 0.015);
  }

  const bladeGeo = new THREE.ExtrudeGeometry(bladeShape, {
    depth: 0.065,
    bevelEnabled: true,
    bevelThickness: 0.036,
    bevelSize: 0.028,
    bevelSegments: 5,
    curveSegments: 32,
  });
  bladeGeo.translate(0, 0, isLower ? -0.095 : 0.015);
  const bladeMesh = new THREE.Mesh(bladeGeo, mats.chrome);
  half.add(bladeMesh);

  // Sculpted ridge highlight strip along blade spine
  const ridgeGeo = new THREE.BoxGeometry(3.15, 0.035, 0.02);
  const ridge = new THREE.Mesh(ridgeGeo, mats.chrome);
  ridge.position.set(-1.95, isLower ? -0.14 : 0.14, isLower ? -0.11 : 0.11);
  ridge.rotation.z = isLower ? -0.055 : 0.055;
  half.add(ridge);

  // 2. Sculpted ergonomic oval finger ring
  const ringCenterX = isLower ? 2.32 : 2.18;
  const ringCenterY = isLower ? -0.56 : 0.56;
  const rxOut = 0.68;
  const ryOut = 0.54;
  const rxIn = 0.49;
  const ryIn = 0.36;

  const ringShape = new THREE.Shape();
  ringShape.absellipse(0, 0, rxOut, ryOut, 0, Math.PI * 2, false, 0);
  const ringHole = new THREE.Path();
  ringHole.absellipse(0, 0, rxIn, ryIn, 0, Math.PI * 2, true, 0);
  ringShape.holes.push(ringHole);

  const ringGeo = new THREE.ExtrudeGeometry(ringShape, {
    depth: 0.09,
    bevelEnabled: true,
    bevelThickness: 0.055,
    bevelSize: 0.04,
    bevelSegments: 6,
    curveSegments: 40,
  });
  ringGeo.center();
  const ringMesh = new THREE.Mesh(ringGeo, mats.chrome);
  ringMesh.position.set(ringCenterX, ringCenterY, isLower ? -0.06 : 0.05);
  ringMesh.rotation.z = isLower ? -0.24 : 0.26;
  half.add(ringMesh);

  // 3. Classic curved Japanese pinky tang on lower finger ring
  if (isLower) {
    const tangCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(ringCenterX + 0.58, ringCenterY - 0.16, -0.06),
      new THREE.Vector3(ringCenterX + 0.96, ringCenterY - 0.14, -0.06),
      new THREE.Vector3(ringCenterX + 1.24, ringCenterY + 0.05, -0.06),
      new THREE.Vector3(ringCenterX + 1.38, ringCenterY + 0.25, -0.06),
    ]);
    const tangGeo = new THREE.TubeGeometry(tangCurve, 24, 0.068, 12, false);
    const tangMesh = new THREE.Mesh(tangGeo, mats.chrome);
    half.add(tangMesh);

    const finial = new THREE.Mesh(new THREE.SphereGeometry(0.088, 16, 16), mats.chrome);
    finial.position.set(ringCenterX + 1.39, ringCenterY + 0.26, -0.06);
    half.add(finial);
  } else {
    // Minimal dark rubber silencer bumper between finger rings
    const bumper = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.055, 0.16, 12), mats.matteObsidian);
    bumper.position.set(ringCenterX - 0.14, ringCenterY - 0.56, 0.04);
    bumper.rotation.z = 0.22;
    half.add(bumper);
  }

  return half;
}

export interface ArticulatedShears {
  group: THREE.Group;
  upperBlade: THREE.Group;
  lowerBlade: THREE.Group;
  setOpenAngle: (degrees: number) => void;
}

/**
 * Full mechanical forged Japanese stainless-steel barber shears with
 * independent opening/closing blades locked to the central tension screw.
 */
export function createBarberShears(mats: ReturnType<typeof createMaterials>): ArticulatedShears {
  const group = new THREE.Group();

  const upperBlade = buildShearHalf(mats, false);
  const lowerBlade = buildShearHalf(mats, true);
  group.add(lowerBlade);
  group.add(upperBlade);

  // Precision machined central tension screw & brushed gold collar
  const pivotGroup = new THREE.Group();
  const baseWasher = new THREE.Mesh(new THREE.CylinderGeometry(0.21, 0.22, 0.24, 32), mats.brushedSteel);
  baseWasher.rotation.x = Math.PI / 2;
  pivotGroup.add(baseWasher);

  const goldCollar = new THREE.Mesh(new THREE.TorusGeometry(0.155, 0.022, 14, 32), mats.champagneGold);
  goldCollar.position.z = 0.125;
  pivotGroup.add(goldCollar);

  const screwCap = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.145, 0.06, 28), mats.chrome);
  screwCap.rotation.x = Math.PI / 2;
  screwCap.position.z = 0.135;
  pivotGroup.add(screwCap);

  const screwCenter = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.04, 20), mats.darkChrome);
  screwCenter.rotation.x = Math.PI / 2;
  screwCenter.position.z = 0.158;
  pivotGroup.add(screwCenter);

  group.add(pivotGroup);

  const setOpenAngle = (degrees: number) => {
    const rad = THREE.MathUtils.degToRad(Math.max(4, Math.min(72, degrees)));
    upperBlade.rotation.z = -rad * 0.5;
    lowerBlade.rotation.z = rad * 0.5;
  };

  setOpenAngle(46);

  return { group, upperBlade, lowerBlade, setOpenAngle };
}

/**
 * Sculpted luxury cordless chrome & matte-obsidian barber clipper (Section 2 centerpiece).
 */
export function createCordlessClipper(mats: ReturnType<typeof createMaterials>): THREE.Group {
  const clipper = new THREE.Group();

  // Contoured ergonomic body silhouette
  const bodyShape = new THREE.Shape();
  bodyShape.moveTo(-0.62, 1.38);
  bodyShape.quadraticCurveTo(0, 1.48, 0.62, 1.38);
  bodyShape.bezierCurveTo(0.72, 0.55, 0.62, -0.85, 0.44, -1.68);
  bodyShape.quadraticCurveTo(0, -1.9, -0.44, -1.68);
  bodyShape.bezierCurveTo(-0.62, -0.85, -0.72, 0.55, -0.62, 1.38);

  const chromeShellGeo = new THREE.ExtrudeGeometry(bodyShape, {
    depth: 0.34,
    bevelEnabled: true,
    bevelThickness: 0.24,
    bevelSize: 0.18,
    bevelSegments: 8,
    curveSegments: 28,
  });
  chromeShellGeo.center();
  const chromeShell = new THREE.Mesh(chromeShellGeo, mats.chrome);
  chromeShell.position.z = 0.06;
  clipper.add(chromeShell);

  // Dark anodized lower body grip panel
  const gripShape = new THREE.Shape();
  gripShape.moveTo(-0.46, 0.22);
  gripShape.quadraticCurveTo(0, 0.38, 0.46, 0.22);
  gripShape.bezierCurveTo(0.52, -0.45, 0.42, -1.25, 0.28, -1.62);
  gripShape.quadraticCurveTo(0, -1.75, -0.28, -1.62);
  gripShape.bezierCurveTo(-0.42, -1.25, -0.52, -0.45, -0.46, 0.22);

  const gripGeo = new THREE.ExtrudeGeometry(gripShape, {
    depth: 0.12,
    bevelEnabled: true,
    bevelThickness: 0.08,
    bevelSize: 0.07,
    bevelSegments: 5,
  });
  gripGeo.center();
  const gripPanel = new THREE.Mesh(gripGeo, mats.glossyObsidian);
  gripPanel.position.set(0, -0.56, 0.36);
  clipper.add(gripPanel);

  // Ergonomic thumb recess + brushed chrome power button
  const recess = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.28, 0.08, 28), mats.darkChrome);
  recess.rotation.x = Math.PI / 2;
  recess.position.set(0, 0.02, 0.43);
  clipper.add(recess);

  const powerRing = new THREE.Mesh(new THREE.TorusGeometry(0.18, 0.024, 14, 28), mats.champagneGold);
  powerRing.position.set(0, 0.02, 0.475);
  clipper.add(powerRing);

  const powerBtn = new THREE.Mesh(new THREE.CylinderGeometry(0.145, 0.155, 0.06, 24), mats.brushedSteel);
  powerBtn.rotation.x = Math.PI / 2;
  powerBtn.position.set(0, 0.02, 0.47);
  clipper.add(powerBtn);

  // Subtle house crest medallion near lower handle
  const crest = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.03, 6), mats.champagneGold);
  crest.rotation.x = Math.PI / 2;
  crest.position.set(0, -1.16, 0.45);
  clipper.add(crest);

  // Precision steel clipper blade head + 17 machined teeth
  const bladeBase = new THREE.Mesh(new THREE.BoxGeometry(1.42, 0.34, 0.26), mats.darkChrome);
  bladeBase.position.set(0, 1.66, 0.05);
  clipper.add(bladeBase);

  const topPlate = new THREE.Mesh(new THREE.BoxGeometry(1.48, 0.28, 0.09), mats.chrome);
  topPlate.position.set(0, 1.78, 0.18);
  topPlate.rotation.x = -0.18;
  clipper.add(topPlate);

  for (let i = -8; i <= 8; i++) {
    const tooth = new THREE.Mesh(new THREE.BoxGeometry(0.048, 0.22, 0.065), mats.chrome);
    tooth.position.set(i * 0.084, 1.97, 0.14);
    tooth.rotation.x = -0.18;
    clipper.add(tooth);
  }

  // Brushed chrome side taper lever
  const leverArm = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.58, 0.14), mats.chrome);
  leverArm.position.set(-0.84, 1.06, 0.04);
  leverArm.rotation.z = 0.22;
  clipper.add(leverArm);

  const leverKnob = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.16, 18), mats.brushedSteel);
  leverKnob.rotation.z = Math.PI / 2;
  leverKnob.position.set(-0.91, 0.8, 0.04);
  clipper.add(leverKnob);

  // Bottom chrome hanging hook
  const hook = new THREE.Mesh(new THREE.TorusGeometry(0.17, 0.036, 12, 24), mats.chrome);
  hook.position.set(0, -2.06, 0.02);
  clipper.add(hook);

  return clipper;
}

/**
 * Compact matte-obsidian & brushed-steel cordless detail trimmer.
 */
export function createDetailTrimmer(mats: ReturnType<typeof createMaterials>): THREE.Group {
  const trimmer = new THREE.Group();

  const body = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.25, 2.35, 24), mats.glossyObsidian);
  trimmer.add(body);

  // Subtle chrome seam band
  const band = new THREE.Mesh(new THREE.CylinderGeometry(0.33, 0.33, 0.07, 24), mats.champagneGold);
  band.position.y = 0.72;
  trimmer.add(band);

  // Tapered chrome neck + exposed T-blade
  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.31, 0.34, 24), mats.brushedSteel);
  neck.position.y = 1.24;
  trimmer.add(neck);

  const tBladeBack = new THREE.Mesh(new THREE.BoxGeometry(0.96, 0.32, 0.14), mats.chrome);
  tBladeBack.position.set(0, 1.54, 0.04);
  tBladeBack.rotation.x = -0.15;
  trimmer.add(tBladeBack);

  for (let i = -7; i <= 7; i++) {
    const tooth = new THREE.Mesh(new THREE.BoxGeometry(0.036, 0.16, 0.05), mats.chrome);
    tooth.position.set(i * 0.062, 1.72, 0.04);
    tooth.rotation.x = -0.15;
    trimmer.add(tooth);
  }

  return trimmer;
}

/**
 * Sleek matte-carbon professional cutting comb with 34 graduated teeth.
 */
export function createCarbonComb(mats: ReturnType<typeof createMaterials>): THREE.Group {
  const comb = new THREE.Group();

  const spine = new THREE.Mesh(new THREE.BoxGeometry(0.19, 3.6, 0.085), mats.matteObsidian);
  spine.position.x = 0.28;
  comb.add(spine);

  // Crisp edge glint trim along spine
  const spineEdge = new THREE.Mesh(new THREE.BoxGeometry(0.03, 3.55, 0.095), mats.darkChrome);
  spineEdge.position.x = 0.37;
  comb.add(spineEdge);

  const numTeeth = 34;
  for (let i = 0; i < numTeeth; i++) {
    const t = i / (numTeeth - 1);
    const y = -1.68 + t * 3.36;
    const width = i < 16 ? 0.032 : 0.022;
    const length = 0.62 - Math.abs(t - 0.5) * 0.06;
    const tooth = new THREE.Mesh(new THREE.BoxGeometry(length, width, 0.055), mats.darkChrome);
    tooth.position.set(0.28 - length / 2, y, 0);
    comb.add(tooth);
  }

  return comb;
}

/**
 * Smoked-amber apothecary beard oil / cologne bottle with gold crest label.
 */
export function createAmberElixirBottle(mats: ReturnType<typeof createMaterials>): THREE.Group {
  const bottle = new THREE.Group();

  const body = new THREE.Mesh(new THREE.BoxGeometry(0.95, 1.24, 0.62), mats.amberGlass);
  // Soft rounded visual collar
  bottle.add(body);

  // Heavy dark glass base
  const base = new THREE.Mesh(new THREE.BoxGeometry(0.96, 0.18, 0.63), mats.glossyObsidian);
  base.position.y = -0.58;
  bottle.add(base);

  // Shoulder + neck + matte cap
  const shoulder = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.44, 0.24, 24), mats.amberGlass);
  shoulder.position.y = 0.72;
  bottle.add(shoulder);

  const goldCollar = new THREE.Mesh(new THREE.CylinderGeometry(0.23, 0.23, 0.06, 24), mats.champagneGold);
  goldCollar.position.y = 0.86;
  bottle.add(goldCollar);

  const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.42, 24), mats.matteObsidian);
  cap.position.y = 1.09;
  bottle.add(cap);

  // Front obsidian label with champagne-gold hexagonal crest & accent lines
  const label = new THREE.Mesh(new THREE.BoxGeometry(0.76, 0.72, 0.02), mats.matteObsidian);
  label.position.set(0, -0.02, 0.315);
  bottle.add(label);

  const crest = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.02, 6), mats.champagneGold);
  crest.rotation.x = Math.PI / 2;
  crest.position.set(0, 0.12, 0.33);
  bottle.add(crest);

  const line1 = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.032, 0.015), mats.champagneGold);
  line1.position.set(0, -0.1, 0.33);
  bottle.add(line1);

  const line2 = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.022, 0.015), mats.brushedSteel);
  line2.position.set(0, -0.2, 0.33);
  bottle.add(line2);

  return bottle;
}

/**
 * Partially open heritage straight razor with glossy obsidian scales & mirror steel blade.
 */
export function createStraightRazor(mats: ReturnType<typeof createMaterials>): THREE.Group {
  const razor = new THREE.Group();

  // Contoured glossy black handle scales
  const handleShape = new THREE.Shape();
  handleShape.moveTo(0, -0.11);
  handleShape.quadraticCurveTo(0.95, -0.17, 1.95, -0.13);
  handleShape.quadraticCurveTo(2.12, 0, 1.95, 0.14);
  handleShape.quadraticCurveTo(0.95, 0.16, 0, 0.11);
  handleShape.closePath();

  const handleGeo = new THREE.ExtrudeGeometry(handleShape, {
    depth: 0.11,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.025,
    bevelSegments: 4,
  });
  handleGeo.translate(0, 0, -0.055);
  const handle = new THREE.Mesh(handleGeo, mats.glossyObsidian);
  handle.rotation.z = 0.18;
  razor.add(handle);

  // Mirror-steel hollow-ground razor blade emerging opposite side
  const bladeShape = new THREE.Shape();
  bladeShape.moveTo(0, -0.08);
  bladeShape.lineTo(-1.72, -0.14);
  bladeShape.quadraticCurveTo(-1.86, 0.02, -1.72, 0.18);
  bladeShape.lineTo(-0.28, 0.15);
  bladeShape.quadraticCurveTo(-0.1, 0.09, 0, 0.06);
  bladeShape.closePath();

  const bladeGeo = new THREE.ExtrudeGeometry(bladeShape, {
    depth: 0.04,
    bevelEnabled: true,
    bevelThickness: 0.018,
    bevelSize: 0.016,
    bevelSegments: 3,
  });
  bladeGeo.translate(0, 0, -0.02);
  const blade = new THREE.Mesh(bladeGeo, mats.chrome);
  blade.rotation.z = -0.34;
  razor.add(blade);

  // Brass pivot rivet
  const pin = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.065, 0.19, 16), mats.champagneGold);
  pin.rotation.x = Math.PI / 2;
  razor.add(pin);

  return razor;
}

/**
 * Low-profile matte-obsidian styling pomade jar with brushed champagne-gold rim.
 */
export function createPomadeJar(mats: ReturnType<typeof createMaterials>): THREE.Group {
  const jar = new THREE.Group();

  const base = new THREE.Mesh(new THREE.CylinderGeometry(0.68, 0.65, 0.62, 36), mats.glossyObsidian);
  jar.add(base);

  const goldRing = new THREE.Mesh(new THREE.TorusGeometry(0.68, 0.024, 12, 36), mats.champagneGold);
  goldRing.rotation.x = Math.PI / 2;
  goldRing.position.y = 0.28;
  jar.add(goldRing);

  const lid = new THREE.Mesh(new THREE.CylinderGeometry(0.69, 0.69, 0.2, 36), mats.matteObsidian);
  lid.position.y = 0.39;
  jar.add(lid);

  const crest = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.03, 6), mats.champagneGold);
  crest.rotation.x = Math.PI / 2;
  crest.position.set(-0.22, -0.02, 0.665);
  jar.add(crest);

  const bar = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.04, 0.02), mats.brushedSteel);
  bar.position.set(0.14, 0.02, 0.665);
  jar.add(bar);

  return jar;
}

/**
 * Sculptural dark matte grooming mist bottle for Section 6 Halo CTA floating accent.
 */
export function createMatteElixirBottle(mats: ReturnType<typeof createMaterials>): THREE.Group {
  const bottle = new THREE.Group();

  const points: THREE.Vector2[] = [
    new THREE.Vector2(0.0, -1.35),
    new THREE.Vector2(0.46, -1.35),
    new THREE.Vector2(0.52, -1.2),
    new THREE.Vector2(0.54, 0.38),
    new THREE.Vector2(0.42, 0.78),
    new THREE.Vector2(0.24, 0.94),
    new THREE.Vector2(0.24, 1.32),
    new THREE.Vector2(0.0, 1.32),
  ];

  const latheGeo = new THREE.LatheGeometry(points, 36);
  const mesh = new THREE.Mesh(latheGeo, mats.glossyObsidian);
  bottle.add(mesh);

  const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.26, 0.07, 28), mats.champagneGold);
  collar.position.y = 0.96;
  bottle.add(collar);

  const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 0.36, 28), mats.darkChrome);
  cap.position.y = 1.18;
  bottle.add(cap);

  return bottle;
}

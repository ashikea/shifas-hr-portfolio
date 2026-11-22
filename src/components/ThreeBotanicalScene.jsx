import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function ThreeBotanicalScene({ isDark, performanceMode = 'high' }) {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const treeGroupRef = useRef(null);
  const trunkMeshRef = useRef(null);
  const branchMeshesRef = useRef([]);
  const branchLeavesRef = useRef([]);
  const floatingLeavesRef = useRef([]);
  const lightsRef = useRef({});
  const animationFrameIdRef = useRef(null);

  // Pre-allocated THREE.Color objects for zero-allocation 60fps transitions
  const colorsRef = useRef({
    bgLight: new THREE.Color(0xF4F7F5),
    bgDark: new THREE.Color(0x0B110E), // Deep forest charcoal (#0B110E)
    ambLight: new THREE.Color(0x8FA893),
    ambDark: new THREE.Color(0x23362A),
    dir1Light: new THREE.Color(0xFFFFFF),
    dir1Dark: new THREE.Color(0x7D9B82), // Muted sage (#7D9B82)
    dir2Light: new THREE.Color(0xA3B899),
    dir2Dark: new THREE.Color(0x3D6346),
    barkLight: new THREE.Color(0x7E7569),
    barkDark: new THREE.Color(0x18241D),
    leafCoreLight: new THREE.Color(0x6B8E73),
    leafCoreDark: new THREE.Color(0x7D9B82),
    leafAccentLight: new THREE.Color(0x8FA893),
    leafAccentDark: new THREE.Color(0x5A8264),
    emissiveDark: new THREE.Color(0x102014),
    emissiveZero: new THREE.Color(0x000000),
  });

  // State ref for animation loop
  const stateRef = useRef({
    mouseX: 0,
    mouseY: 0,
    targetMouseX: 0,
    targetMouseY: 0,
    time: 0,
    isDark: isDark,
    isReducedMotion: false,
    isLowPower: performanceMode === 'low'
  });

  // 1. Keep stateRef synced when props update
  useEffect(() => {
    stateRef.current.isDark = isDark;
    stateRef.current.isLowPower = performanceMode === 'low';

    // Synchronize 3D materials immediately and smoothly
    const colors = colorsRef.current;
    
    // Update Trunk & Branches
    if (trunkMeshRef.current && trunkMeshRef.current.material) {
      trunkMeshRef.current.material.color.copy(isDark ? colors.barkDark : colors.barkLight);
    }
    branchMeshesRef.current.forEach((mesh) => {
      if (mesh && mesh.material) {
        mesh.material.color.copy(isDark ? colors.barkDark : colors.barkLight);
      }
    });

    // Update Branch Leaves
    branchLeavesRef.current.forEach((leafMesh, idx) => {
      if (leafMesh && leafMesh.material) {
        const isAlternate = idx % 2 === 0;
        const targetColor = isDark
          ? (isAlternate ? colors.leafCoreDark : colors.leafAccentDark)
          : (isAlternate ? colors.leafCoreLight : colors.leafAccentLight);
        leafMesh.material.color.copy(targetColor);
        if (leafMesh.material.emissive) {
          leafMesh.material.emissive.copy(isDark ? colors.emissiveDark : colors.emissiveZero);
          leafMesh.material.emissiveIntensity = isDark ? 0.25 : 0.0;
        }
      }
    });

    // Update Floating Drifting Leaves
    floatingLeavesRef.current.forEach((leafMesh, idx) => {
      if (leafMesh && leafMesh.material) {
        const isAlternate = idx % 2 === 0;
        const targetColor = isDark
          ? (isAlternate ? colors.leafCoreDark : colors.leafAccentDark)
          : (isAlternate ? colors.leafAccentLight : colors.leafCoreLight);
        leafMesh.material.color.copy(targetColor);
        if (leafMesh.material.emissive) {
          leafMesh.material.emissive.copy(isDark ? colors.emissiveDark : colors.emissiveZero);
          leafMesh.material.emissiveIntensity = isDark ? 0.25 : 0.0;
        }
      }
    });
  }, [isDark, performanceMode]);

  // 2. Initialize Three.js Scene
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check system prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const prefersReducedMotion = mediaQuery.matches;
    stateRef.current.isReducedMotion = prefersReducedMotion;

    const colors = colorsRef.current;

    // A. Scene Setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const initialBg = isDark ? colors.bgDark.clone() : colors.bgLight.clone();
    scene.background = initialBg;
    scene.fog = new THREE.FogExp2(initialBg, 0.045);

    // B. Camera Setup (Fixed vantage point, NO scroll-tied movement)
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 5.5);
    camera.lookAt(0, 1.2, 0);
    cameraRef.current = camera;

    // C. WebGL Renderer with pixel ratio capped at 2 for zero lag
    const renderer = new THREE.WebGLRenderer({
      powerPreference: 'high-performance',
      antialias: (window.devicePixelRatio || 1) < 2,
      alpha: false
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = false; // No heavy shadow calculations
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // D. Lighting Setup
    const ambientLight = new THREE.AmbientLight(
      isDark ? colors.ambDark : colors.ambLight,
      isDark ? 0.65 : 0.85
    );
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(
      isDark ? colors.dir1Dark : colors.dir1Light,
      isDark ? 1.0 : 1.25
    );
    dirLight1.position.set(3, 5, 4);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(
      isDark ? colors.dir2Dark : colors.dir2Light,
      isDark ? 0.5 : 0.7
    );
    dirLight2.position.set(-3, -1, -2);
    scene.add(dirLight2);

    lightsRef.current = { ambientLight, dirLight1, dirLight2 };

    // E. Create Procedural Sage Leaf Geometry (Lightweight 3D curved blade)
    const createSageLeafGeometry = () => {
      const shape = new THREE.Shape();
      // Natural lanceolate sage leaf curve
      shape.moveTo(0, 0);
      shape.bezierCurveTo(0.12, 0.1, 0.28, 0.35, 0.24, 0.7);
      shape.bezierCurveTo(0.2, 0.95, 0.08, 1.15, 0, 1.3);
      shape.bezierCurveTo(-0.08, 1.15, -0.2, 0.95, -0.24, 0.7);
      shape.bezierCurveTo(-0.28, 0.35, -0.12, 0.1, 0, 0);

      const geometry = new THREE.ShapeGeometry(shape, 8);
      const pos = geometry.attributes.position;
      // Add subtle central vein crease and organic blade curl
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const y = pos.getY(i);
        const z = -Math.sin((x / 0.28) * Math.PI * 0.5) * 0.05 + Math.sin(y * 1.5) * 0.035;
        pos.setZ(i, z);
      }
      geometry.computeVertexNormals();
      return geometry;
    };

    const leafGeometry = createSageLeafGeometry();

    // F. Reusable Standard Materials
    const barkMaterial = new THREE.MeshStandardMaterial({
      color: isDark ? colors.barkDark : colors.barkLight,
      roughness: 0.85,
      metalness: 0.05
    });

    // G. Construct Organic Branching Tree
    const treeGroup = new THREE.Group();
    treeGroup.position.set(0.65, -1.8, 0);
    treeGroupRef.current = treeGroup;
    scene.add(treeGroup);

    // Main Trunk
    const mainCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0.15, 1.0, 0.1),
      new THREE.Vector3(0.05, 2.0, -0.1),
      new THREE.Vector3(-0.25, 3.0, 0.2),
      new THREE.Vector3(-0.1, 4.0, 0.05)
    ]);
    const trunkGeo = new THREE.TubeGeometry(mainCurve, 20, 0.07, 7, false);
    const trunkMesh = new THREE.Mesh(trunkGeo, barkMaterial);
    trunkMeshRef.current = trunkMesh;
    treeGroup.add(trunkMesh);

    // Secondary Branches
    const branches = [];
    const branchCurves = [
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(0.12, 1.4, 0.08),
        new THREE.Vector3(0.7, 2.1, 0.3),
        new THREE.Vector3(1.3, 2.7, 0.1),
        new THREE.Vector3(1.7, 3.2, -0.15)
      ]),
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(0.0, 2.1, -0.05),
        new THREE.Vector3(-0.65, 2.8, 0.15),
        new THREE.Vector3(-1.25, 3.3, -0.1),
        new THREE.Vector3(-1.6, 3.7, 0.1)
      ]),
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(-0.18, 2.7, 0.15),
        new THREE.Vector3(0.25, 3.4, 0.25),
        new THREE.Vector3(0.65, 3.9, 0.1)
      ])
    ];

    const branchGeos = [];
    branchCurves.forEach((curve, idx) => {
      const bGeo = new THREE.TubeGeometry(curve, 14, 0.04 - idx * 0.005, 6, false);
      branchGeos.push(bGeo);
      const bMesh = new THREE.Mesh(bGeo, barkMaterial);
      branches.push(bMesh);
      treeGroup.add(bMesh);
    });
    branchMeshesRef.current = branches;

    // H. Attach Branch Sage Leaves
    const branchLeaves = [];
    const leafNodes = [
      { pos: new THREE.Vector3(0.18, 1.2, 0.15), rot: [0.3, 0.5, 0.4], scale: 0.55 },
      { pos: new THREE.Vector3(-0.1, 1.6, -0.1), rot: [-0.2, -0.8, -0.3], scale: 0.6 },
      { pos: new THREE.Vector3(-0.15, 2.5, 0.2), rot: [0.4, -0.6, 0.2], scale: 0.5 },
      { pos: new THREE.Vector3(-0.08, 3.6, 0.1), rot: [0.1, 0.3, 0.5], scale: 0.45 },
      { pos: new THREE.Vector3(-0.1, 4.0, 0.05), rot: [0.0, 0.0, 0.2], scale: 0.4 },
      // Right branch
      { pos: new THREE.Vector3(0.4, 1.8, 0.2), rot: [0.4, 0.8, -0.3], scale: 0.6 },
      { pos: new THREE.Vector3(0.9, 2.3, 0.25), rot: [0.2, 1.2, -0.2], scale: 0.55 },
      { pos: new THREE.Vector3(1.2, 2.6, 0.15), rot: [-0.3, 0.9, -0.5], scale: 0.5 },
      { pos: new THREE.Vector3(1.5, 3.0, 0.0), rot: [0.3, 1.4, -0.4], scale: 0.48 },
      { pos: new THREE.Vector3(1.7, 3.2, -0.15), rot: [0.1, 1.1, -0.1], scale: 0.42 },
      // Left branch
      { pos: new THREE.Vector3(-0.35, 2.4, 0.1), rot: [0.3, -1.0, 0.4], scale: 0.58 },
      { pos: new THREE.Vector3(-0.85, 3.0, 0.12), rot: [0.1, -1.3, 0.6], scale: 0.52 },
      { pos: new THREE.Vector3(-1.15, 3.2, -0.05), rot: [-0.2, -0.9, 0.3], scale: 0.5 },
      { pos: new THREE.Vector3(-1.45, 3.5, 0.05), rot: [0.4, -1.4, 0.5], scale: 0.45 },
      { pos: new THREE.Vector3(-1.6, 3.7, 0.1), rot: [0.2, -1.2, 0.2], scale: 0.38 },
      // Top branch
      { pos: new THREE.Vector3(0.1, 3.1, 0.2), rot: [0.5, 0.3, -0.2], scale: 0.48 },
      { pos: new THREE.Vector3(0.4, 3.6, 0.2), rot: [0.2, 0.6, -0.4], scale: 0.44 },
      { pos: new THREE.Vector3(0.65, 3.9, 0.1), rot: [0.1, 0.4, -0.1], scale: 0.38 }
    ];

    leafNodes.forEach((node, idx) => {
      const isAlt = idx % 2 === 0;
      const initialColor = isDark
        ? (isAlt ? colors.leafCoreDark : colors.leafAccentDark)
        : (isAlt ? colors.leafCoreLight : colors.leafAccentLight);

      const leafMat = new THREE.MeshStandardMaterial({
        color: initialColor,
        roughness: 0.45,
        metalness: 0.1,
        emissive: isDark ? colors.emissiveDark : colors.emissiveZero,
        emissiveIntensity: isDark ? 0.25 : 0.0,
        side: THREE.DoubleSide
      });

      const leafMesh = new THREE.Mesh(leafGeometry, leafMat);
      leafMesh.position.copy(node.pos);
      leafMesh.rotation.set(node.rot[0], node.rot[1], node.rot[2]);
      leafMesh.scale.setScalar(node.scale);

      leafMesh.userData = {
        baseRot: { ...leafMesh.rotation },
        phase: idx * 0.45,
        speed: 0.9 + (idx % 3) * 0.18,
        amplitude: 0.08 + (idx % 4) * 0.02
      };

      treeGroup.add(leafMesh);
      branchLeaves.push(leafMesh);
    });
    branchLeavesRef.current = branchLeaves;

    // I. Gently Drifting Ambient Sage Leaves in 3D Space
    // (Ambient gentle motion only - strictly NO scroll response)
    const floatingLeaves = [];
    const floatCount = window.innerWidth < 768 ? 8 : 12;

    for (let i = 0; i < floatCount; i++) {
      const isAlt = i % 2 === 0;
      const initialColor = isDark
        ? (isAlt ? colors.leafCoreDark : colors.leafAccentDark)
        : (isAlt ? colors.leafAccentLight : colors.leafCoreLight);

      const leafMat = new THREE.MeshStandardMaterial({
        color: initialColor,
        roughness: 0.5,
        metalness: 0.08,
        emissive: isDark ? colors.emissiveDark : colors.emissiveZero,
        emissiveIntensity: isDark ? 0.25 : 0.0,
        side: THREE.DoubleSide
      });

      const leafMesh = new THREE.Mesh(leafGeometry, leafMat);
      const angle = (i / floatCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
      const radius = 1.9 + Math.random() * 2.0;
      const x = Math.cos(angle) * radius;
      const y = (Math.random() - 0.5) * 4.0 + 0.8;
      const z = Math.sin(angle) * 1.4 - 0.2;

      leafMesh.position.set(x, y, z);
      leafMesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      leafMesh.scale.setScalar(0.28 + Math.random() * 0.28);

      leafMesh.userData = {
        initialY: y,
        rotSpeedX: (Math.random() - 0.5) * 0.008,
        rotSpeedY: (Math.random() - 0.5) * 0.012,
        rotSpeedZ: (Math.random() - 0.5) * 0.006,
        floatSpeed: 0.6 + Math.random() * 0.4,
        floatOffset: Math.random() * Math.PI * 2,
        driftX: (Math.random() - 0.5) * 0.002
      };

      scene.add(leafMesh);
      floatingLeaves.push(leafMesh);
    }
    floatingLeavesRef.current = floatingLeaves;

    // J. Subtle Pointer Parallax (Zero window scroll listeners!)
    const handlePointerMove = (e) => {
      // Disregard if reduced motion is requested
      if (stateRef.current.isReducedMotion) return;
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      stateRef.current.targetMouseX = x * 0.18;
      stateRef.current.targetMouseY = y * 0.12;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    // K. Debounced Resize Handler
    let resizeTimer = null;
    const handleResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
        const newW = containerRef.current.clientWidth || window.innerWidth;
        const newH = containerRef.current.clientHeight || window.innerHeight;
        cameraRef.current.aspect = newW / newH;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(newW, newH);
      }, 150);
    };
    window.addEventListener('resize', handleResize);

    // L. Page Visibility API: Stop 3D loop entirely when tab is hidden
    let isTabVisible = !document.hidden;
    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
      if (isTabVisible) {
        lastTime = performance.now();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // M. 60 FPS Render Loop (Purely ambient gentle motion - ZERO scroll response)
    let lastTime = performance.now();

    const animate = (currentTime) => {
      animationFrameIdRef.current = requestAnimationFrame(animate);

      if (!isTabVisible) return;

      const delta = Math.min((currentTime - lastTime) * 0.001, 0.05);
      lastTime = currentTime;

      const colors = colorsRef.current;
      const targetDark = stateRef.current.isDark;

      // Smooth background & fog color transition without desync
      const targetBgColor = targetDark ? colors.bgDark : colors.bgLight;
      scene.background.lerp(targetBgColor, 0.08);
      if (scene.fog) {
        scene.fog.color.lerp(targetBgColor, 0.08);
      }

      // Smooth lighting transitions
      if (lightsRef.current.ambientLight) {
        const amb = lightsRef.current.ambientLight;
        const targetAmb = targetDark ? colors.ambDark : colors.ambLight;
        amb.color.lerp(targetAmb, 0.08);
        amb.intensity = THREE.MathUtils.lerp(amb.intensity, targetDark ? 0.65 : 0.85, 0.08);
      }
      if (lightsRef.current.dirLight1) {
        const dir1 = lightsRef.current.dirLight1;
        const targetDir1 = targetDark ? colors.dir1Dark : colors.dir1Light;
        dir1.color.lerp(targetDir1, 0.08);
        dir1.intensity = THREE.MathUtils.lerp(dir1.intensity, targetDark ? 1.0 : 1.25, 0.08);
      }

      // Ambient Animation (Only if not reduced motion)
      if (!stateRef.current.isReducedMotion && !stateRef.current.isLowPower) {
        stateRef.current.time += delta;
        const t = stateRef.current.time;

        // Smoothly lerp pointer parallax (subtle, serene)
        stateRef.current.mouseX += (stateRef.current.targetMouseX - stateRef.current.mouseX) * 0.04;
        stateRef.current.mouseY += (stateRef.current.targetMouseY - stateRef.current.mouseY) * 0.04;

        camera.position.x = stateRef.current.mouseX * 0.4;
        camera.position.y = 1.2 + stateRef.current.mouseY * 0.25;
        camera.lookAt(0, 1.2, 0);

        // Gentle ambient sway on tree
        if (treeGroupRef.current) {
          treeGroupRef.current.rotation.z = Math.sin(t * 0.5) * 0.015;
          treeGroupRef.current.rotation.y = Math.cos(t * 0.35) * 0.02 + stateRef.current.mouseX * 0.1;
        }

        // Gentle ambient leaf flutter
        branchLeavesRef.current.forEach((leaf) => {
          const ud = leaf.userData;
          const leafWind = Math.sin(t * ud.speed + ud.phase) * ud.amplitude;
          leaf.rotation.x = ud.baseRot._x + leafWind;
          leaf.rotation.z = ud.baseRot._z + Math.cos(t * ud.speed * 1.5 + ud.phase) * (ud.amplitude * 0.5);
        });

        // Gentle ambient floating leaves drift
        floatingLeavesRef.current.forEach((leaf) => {
          const ud = leaf.userData;
          leaf.rotation.x += ud.rotSpeedX;
          leaf.rotation.y += ud.rotSpeedY;
          leaf.rotation.z += ud.rotSpeedZ;

          const yOscillation = Math.sin(t * ud.floatSpeed + ud.floatOffset) * 0.2;
          leaf.position.y = ud.initialY + yOscillation;

          leaf.position.x += ud.driftX;
          if (leaf.position.x > 3.2) leaf.position.x = -3.2;
          if (leaf.position.x < -3.2) leaf.position.x = 3.2;
        });
      }

      renderer.render(scene, camera);
    };

    animationFrameIdRef.current = requestAnimationFrame(animate);

    // N. Cleanup
    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);

      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      // Dispose Three.js objects
      leafGeometry.dispose();
      barkMaterial.dispose();
      trunkGeo.dispose();
      branchGeos.forEach((g) => g.dispose());
      branchLeaves.forEach((l) => l.material && l.material.dispose());
      floatingLeaves.forEach((l) => l.material && l.material.dispose());
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden" 
      aria-hidden="true"
    >
      {/* 3D WebGL Canvas */}
      <div ref={containerRef} className="absolute inset-0 w-full h-full" />

      {/* Subtle Synchronized Botanical Vignette */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-700 opacity-40 dark:opacity-60" 
        style={{
          background: isDark
            ? 'radial-gradient(circle at 75% 30%, rgba(125, 155, 130, 0.08) 0%, transparent 70%)'
            : 'radial-gradient(circle at 75% 30%, rgba(143, 168, 147, 0.12) 0%, transparent 70%)'
        }}
      />
    </div>
  );
}

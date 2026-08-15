import { useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

export const AI_MODES = [
  { id: "neural", nameEn: "Deep Learning Neural Network", nameFr: "Réseau de Neurones Deep Learning" },
  { id: "ml_tree", nameEn: "Machine Learning Decision Clusters", nameFr: "Grappes & Arbres de Décision ML" },
  { id: "loss", nameEn: "Gradient Descent Loss Landscape", nameFr: "Surface d'optimisation (Gradient Descent)" },
];

function FullPageAIMesh({ modeIndex, scrollY }) {
  const pointsRef = useRef();
  const linesRef = useRef();

  const NODE_COUNT = 1500;

  // Generate 3D geometry states for Deep Learning & Machine Learning
  const { positions0, positions1, positions2, colors0, colors1, colors2, linePositions } = useMemo(() => {
    const p0 = new Float32Array(NODE_COUNT * 3); // State 0: Deep Learning Neural Net (4 layers)
    const p1 = new Float32Array(NODE_COUNT * 3); // State 1: Machine Learning Decision Tree & Clusters
    const p2 = new Float32Array(NODE_COUNT * 3); // State 2: Loss Landscape Surface

    const c0 = new Float32Array(NODE_COUNT * 3);
    const c1 = new Float32Array(NODE_COUNT * 3);
    const c2 = new Float32Array(NODE_COUNT * 3);

    const teal = new THREE.Color("#5eead4");
    const gold = new THREE.Color("#c9a15c");
    const blue = new THREE.Color("#38bdf8");
    const purple = new THREE.Color("#a855f7");
    const emerald = new THREE.Color("#34d399");

    const side = Math.floor(Math.sqrt(NODE_COUNT));

    // Mode 0: Deep Learning Neural Network (Input, Hidden1, Hidden2, Output layers)
    for (let i = 0; i < NODE_COUNT; i++) {
      const layer = Math.floor((i / NODE_COUNT) * 4); // 0..3
      const inLayerIdx = i % (NODE_COUNT / 4);
      const layerX = (layer - 1.5) * 2.2;

      const angle = (inLayerIdx / (NODE_COUNT / 4)) * Math.PI * 2;
      const radius = 0.5 + (inLayerIdx % 6) * 0.32;

      p0[i * 3] = layerX;
      p0[i * 3 + 1] = Math.cos(angle) * radius;
      p0[i * 3 + 2] = Math.sin(angle) * radius;

      const col = layer === 0 ? blue : layer === 3 ? gold : teal.clone().lerp(purple, (inLayerIdx % 5) / 5);
      c0[i * 3] = col.r;
      c0[i * 3 + 1] = col.g;
      c0[i * 3 + 2] = col.b;
    }

    // Mode 1: Machine Learning Decision Tree & Data Clusters
    for (let i = 0; i < NODE_COUNT; i++) {
      // 3 Clusters representing Classification Groups + Trunk
      const cluster = i % 3;
      let cx = 0, cy = 0, cz = 0;

      if (cluster === 0) { cx = -1.8; cy = 1.2; cz = 0.5; }
      else if (cluster === 1) { cx = 1.8; cy = 1.0; cz = -0.5; }
      else { cx = 0; cy = -1.2; cz = 0.8; }

      const spread = 0.9;
      const u = Math.random() - 0.5;
      const v = Math.random() - 0.5;
      const w = Math.random() - 0.5;

      p1[i * 3] = cx + u * spread * 2;
      p1[i * 3 + 1] = cy + v * spread * 2;
      p1[i * 3 + 2] = cz + w * spread * 2;

      const col = cluster === 0 ? teal : cluster === 1 ? emerald : gold;
      c1[i * 3] = col.r;
      c1[i * 3 + 1] = col.g;
      c1[i * 3 + 2] = col.b;
    }

    // Mode 2: Loss Landscape Surface (Bivariate Optimization Manifold)
    const SPAN = 6.4;
    for (let ix = 0; ix < side; ix++) {
      for (let iz = 0; iz < side; iz++) {
        const i = ix * side + iz;
        if (i >= NODE_COUNT) break;

        const x = (ix / (side - 1) - 0.5) * SPAN;
        const z = (iz / (side - 1) - 0.5) * SPAN;
        const r2 = x * x + z * z;
        const y = Math.exp(-r2 / 2.0) * 2.0 + Math.sin(x * 2.5) * Math.cos(z * 2.5) * 0.3 - 0.6;

        p2[i * 3] = x;
        p2[i * 3 + 1] = y;
        p2[i * 3 + 2] = z;

        const col = teal.clone().lerp(gold, Math.min(1, (y + 0.8) / 2.2));
        c2[i * 3] = col.r;
        c2[i * 3 + 1] = col.g;
        c2[i * 3 + 2] = col.b;
      }
    }

    // Synaptic Neural Lines connecting layers
    const lineCoords = new Float32Array(300 * 6);
    let lIdx = 0;
    for (let l = 0; l < 3; l++) {
      for (let k = 0; k < 100; k++) {
        const x1 = (l - 1.5) * 2.2;
        const x2 = (l + 1 - 1.5) * 2.2;
        const a1 = (k / 100) * Math.PI * 2;
        const a2 = ((k * 3) / 100) * Math.PI * 2;

        lineCoords[lIdx * 6] = x1;
        lineCoords[lIdx * 6 + 1] = Math.cos(a1) * 0.9;
        lineCoords[lIdx * 6 + 2] = Math.sin(a1) * 0.9;

        lineCoords[lIdx * 6 + 3] = x2;
        lineCoords[lIdx * 6 + 4] = Math.cos(a2) * 0.9;
        lineCoords[lIdx * 6 + 5] = Math.sin(a2) * 0.9;
        lIdx++;
      }
    }

    return {
      positions0: p0, positions1: p1, positions2: p2,
      colors0: c0, colors1: c1, colors2: c2,
      linePositions: lineCoords,
    };
  }, []);

  const currentPos = useMemo(() => new Float32Array(NODE_COUNT * 3), []);
  const currentCol = useMemo(() => new Float32Array(NODE_COUNT * 3), []);
  const transitionRef = useRef(1);

  useEffect(() => {
    transitionRef.current = 0;
  }, [modeIndex]);

  useFrame(({ clock }, delta) => {
    const t = clock.getElapsedTime();
    if (!pointsRef.current) return;

    if (transitionRef.current < 1) {
      transitionRef.current = Math.min(1, transitionRef.current + delta * 2.2);
    }
    const factor = transitionRef.current;
    const ease = factor * factor * (3 - 2 * factor);

    const m = modeIndex;
    const prevM = (m - 1 + AI_MODES.length) % AI_MODES.length;

    let targetP, sourceP, targetC, sourceC;
    if (m === 0) { targetP = positions0; targetC = colors0; }
    else if (m === 1) { targetP = positions1; targetC = colors1; }
    else { targetP = positions2; targetC = colors2; }

    if (prevM === 0) { sourceP = positions0; sourceC = colors0; }
    else if (prevM === 1) { sourceP = positions1; sourceC = colors1; }
    else { sourceP = positions2; sourceC = colors2; }

    const posAttr = pointsRef.current.geometry.attributes.position;
    const colAttr = pointsRef.current.geometry.attributes.color;

    // Reacting to page scrolling down
    const scrollOffset = (scrollY / 1000) * 0.8;

    for (let i = 0; i < NODE_COUNT * 3; i += 3) {
      const sx = sourceP[i], sy = sourceP[i + 1], sz = sourceP[i + 2];
      const tx = targetP[i], ty = targetP[i + 1], tz = targetP[i + 2];

      const cx = sx + (tx - sx) * ease;
      const cy = sy + (ty - sy) * ease;
      const cz = sz + (tz - sz) * ease;

      // Dynamic oscillation wave depending on AI model
      let wave = 0;
      if (m === 0) wave = Math.sin(t * 2 + cx * 3) * 0.05;
      if (m === 1) wave = Math.cos(t * 1.6 + cy * 2) * 0.07;
      if (m === 2) wave = Math.sin(t * 1.5 + cx * 2 + cz * 2) * 0.08 * (cy + 1);

      posAttr.array[i] = cx;
      posAttr.array[i + 1] = cy + wave - scrollOffset * 0.4;
      posAttr.array[i + 2] = cz;

      colAttr.array[i] = sourceC[i] + (targetC[i] - sourceC[i]) * ease;
      colAttr.array[i + 1] = sourceC[i + 1] + (targetC[i + 1] - sourceC[i + 1]) * ease;
      colAttr.array[i + 2] = sourceC[i + 2] + (targetC[i + 2] - sourceC[i + 2]) * ease;
    }

    posAttr.needsUpdate = true;
    colAttr.needsUpdate = true;

    // Continuous 3D rotation + scroll response down the page
    pointsRef.current.rotation.y = t * 0.08 + scrollOffset * 0.5;
    pointsRef.current.rotation.x = Math.sin(t * 0.2) * 0.15 + scrollOffset * 0.2;

    if (linesRef.current) {
      linesRef.current.rotation.y = t * 0.08 + scrollOffset * 0.5;
      linesRef.current.rotation.x = Math.sin(t * 0.2) * 0.15 + scrollOffset * 0.2;
    }
  });

  return (
    <group>
      {/* Dynamic Synaptic Connection Lines for Neural Network (Mode 0) */}
      {modeIndex === 0 && (
        <lineSegments ref={linesRef} position={[0, -0.2, 0]}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
          </bufferGeometry>
          <lineBasicMaterial color="#5eead4" transparent opacity={0.25} />
        </lineSegments>
      )}

      <points ref={pointsRef} position={[0, -0.2, 0]}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[currentPos, 3]} />
          <bufferAttribute attach="attributes-color" args={[currentCol, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.034} vertexColors sizeAttenuation transparent opacity={0.88} />
      </points>
    </group>
  );
}

export default function HeroVisual({ activeMode, onToggleMode }) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      onClick={onToggleMode}
      className="fixed inset-0 z-0 cursor-pointer select-none"
      title="Normal click anywhere to morph 3D Deep Learning & Machine Learning visual"
    >
      <Canvas camera={{ position: [3.2, 2.0, 4.2], fov: 44 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.8} />
        <FullPageAIMesh modeIndex={activeMode} scrollY={scrollY} />
      </Canvas>
    </div>
  );
}

import { useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

export const AI_MODES = [
  { id: "neural", nameEn: "Deep Learning Neural Network", nameFr: "Réseau de Neurones", nameAr: "شبكة عصبية عميقة", icon: "🧠" },
  { id: "ml_tree", nameEn: "Machine Learning Clusters", nameFr: "Arbres & Grappes ML", nameAr: "عناقيد التعلم الآلي", icon: "🌲" },
  { id: "loss", nameEn: "Optimization Landscape", nameFr: "Surface de Perte (Gradient)", nameAr: "سطح دالة الخسارة", icon: "📉" },
];

function FullPageAIMesh({ modeIndex }) {
  const pointsRef = useRef();
  const linesRef = useRef();

  const NODE_COUNT = 1400;

  // Generate 3D geometry states for Deep Learning & Machine Learning
  const { positions0, positions1, positions2, colors0, colors1, colors2, linePositions } = useMemo(() => {
    const p0 = new Float32Array(NODE_COUNT * 3); // State 0: Deep Learning Neural Net
    const p1 = new Float32Array(NODE_COUNT * 3); // State 1: ML Clusters
    const p2 = new Float32Array(NODE_COUNT * 3); // State 2: Loss Landscape Surface

    const c0 = new Float32Array(NODE_COUNT * 3);
    const c1 = new Float32Array(NODE_COUNT * 3);
    const c2 = new Float32Array(NODE_COUNT * 3);

    const teal = new THREE.Color("#5eead4");
    const gold = new THREE.Color("#c9a15c");
    const blue = new THREE.Color("#38bdf8");
    const purple = new THREE.Color("#a855f7");

    const side = Math.floor(Math.sqrt(NODE_COUNT));

    // Mode 0: Deep Learning Neural Network
    for (let i = 0; i < NODE_COUNT; i++) {
      const layer = Math.floor((i / NODE_COUNT) * 4);
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

    // Mode 1: Machine Learning Clusters
    for (let i = 0; i < NODE_COUNT; i++) {
      const cluster = i % 3;
      let cx = 0, cy = 0, cz = 0;

      if (cluster === 0) { cx = -1.8; cy = 1.0; cz = 0.5; }
      else if (cluster === 1) { cx = 1.8; cy = 0.8; cz = -0.5; }
      else { cx = 0.0; cy = -1.4; cz = 0.2; }

      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = Math.cbrt(Math.random()) * 0.95;

      p1[i * 3] = cx + r * Math.sin(phi) * Math.cos(theta);
      p1[i * 3 + 1] = cy + r * Math.sin(phi) * Math.sin(theta);
      p1[i * 3 + 2] = cz + r * Math.cos(phi);

      const col = cluster === 0 ? teal : cluster === 1 ? gold : blue;
      c1[i * 3] = col.r;
      c1[i * 3 + 1] = col.g;
      c1[i * 3 + 2] = col.b;
    }

    // Mode 2: Loss Landscape Surface
    for (let i = 0; i < NODE_COUNT; i++) {
      const xi = (i % side) / side;
      const zi = Math.floor(i / side) / side;

      const x = (xi - 0.5) * 4.4;
      const z = (zi - 0.5) * 4.4;
      const r = Math.sqrt(x * x + z * z);
      const y = Math.sin(r * 2.8) / (r + 0.6) * 1.1;

      p2[i * 3] = x;
      p2[i * 3 + 1] = y - 0.5;
      p2[i * 3 + 2] = z;

      const normY = (y + 0.5) / 1.5;
      const col = teal.clone().lerp(gold, Math.max(0, Math.min(1, normY)));
      c2[i * 3] = col.r;
      c2[i * 3 + 1] = col.g;
      c2[i * 3 + 2] = col.b;
    }

    // Synaptic connections for Neural Net
    const linePts = [];
    for (let l = 0; l < 3; l++) {
      for (let s = 0; s < 25; s++) {
        const fromIdx = l * (NODE_COUNT / 4) + ((s * 7) % (NODE_COUNT / 4));
        const toIdx = (l + 1) * (NODE_COUNT / 4) + ((s * 11) % (NODE_COUNT / 4));

        linePts.push(
          p0[fromIdx * 3], p0[fromIdx * 3 + 1], p0[fromIdx * 3 + 2],
          p0[toIdx * 3], p0[toIdx * 3 + 1], p0[toIdx * 3 + 2]
        );
      }
    }

    return {
      positions0: p0,
      positions1: p1,
      positions2: p2,
      colors0: c0,
      colors1: c1,
      colors2: c2,
      linePositions: new Float32Array(linePts),
    };
  }, []);

  const currentPos = useMemo(() => new Float32Array(NODE_COUNT * 3), []);
  const currentCol = useMemo(() => new Float32Array(NODE_COUNT * 3), []);

  useFrame((state, delta) => {
    let targetPos = positions0;
    let targetCol = colors0;
    if (modeIndex === 1) {
      targetPos = positions1;
      targetCol = colors1;
    } else if (modeIndex === 2) {
      targetPos = positions2;
      targetCol = colors2;
    }

    const t = Math.min(1, delta * 3.8);

    for (let i = 0; i < NODE_COUNT * 3; i++) {
      currentPos[i] += (targetPos[i] - currentPos[i]) * t;
      currentCol[i] += (targetCol[i] - currentCol[i]) * t;
    }

    if (pointsRef.current) {
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
      pointsRef.current.geometry.attributes.color.needsUpdate = true;
      pointsRef.current.rotation.y += delta * 0.12;
    }

    if (linesRef.current) {
      linesRef.current.rotation.y += delta * 0.12;
    }
  });

  return (
    <group>
      {modeIndex === 0 && (
        <lineSegments ref={linesRef} position={[0, -0.1, 0]}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
          </bufferGeometry>
          <lineBasicMaterial color="#5eead4" transparent opacity={0.22} />
        </lineSegments>
      )}

      <points ref={pointsRef} position={[0, -0.1, 0]}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[currentPos, 3]} />
          <bufferAttribute attach="attributes-color" args={[currentCol, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.038} vertexColors sizeAttenuation transparent opacity={0.88} />
      </points>
    </group>
  );
}

export default function HeroVisual({ activeMode }) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Softly fades out the 3D visual as the user scrolls past the Hero section
  const visualOpacity = Math.max(0.1, Math.min(1, 1 - scrollY / 700));

  return (
    <div
      className="fixed inset-0 z-0 pointer-events-auto transition-opacity duration-300"
      style={{ opacity: visualOpacity }}
    >
      <Canvas
        camera={{ position: [2.8, 1.8, 3.8], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.9} />
        <FullPageAIMesh modeIndex={activeMode} />
        <OrbitControls
          enableZoom={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 1.6}
          minPolarAngle={Math.PI / 3.2}
        />
      </Canvas>
    </div>
  );
}

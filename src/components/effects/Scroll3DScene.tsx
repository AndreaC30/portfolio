"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Line } from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";

/* ───────────────────────────────────────────
   Data: project stations with 3D positions
   ─────────────────────────────────────────── */

interface Station {
  id: string;
  title: string;
  subtitle: string;
  progressRange: [number, number]; // 0-1 range where this station is active
}

const stations: Station[] = [
  {
    id: "intro",
    title: "Andrea Cruz",
    subtitle: "Full Stack Developer",
    progressRange: [0, 0.15],
  },
  {
    id: "workshift",
    title: "WorkShift",
    subtitle: "App de fichaje laboral · FastAPI + React + PostgreSQL + Docker",
    progressRange: [0.2, 0.4],
  },
  {
    id: "gastodehoy",
    title: "GastoDeHoy",
    subtitle: "Presupuesto personal · FastAPI + React + n8n analytics",
    progressRange: [0.45, 0.65],
  },
  {
    id: "hermes",
    title: "Hermes Agent",
    subtitle: "Asistente IA autónomo · Discord, Telegram, n8n",
    progressRange: [0.7, 0.85],
  },
  {
    id: "infra",
    title: "Infraestructura Self-Hosted",
    subtitle: "VPS, Nginx, Docker, SSL, dominios",
    progressRange: [0.9, 1.0],
  },
];

// Path positions the camera travels through
const rawPathPoints = [
  new THREE.Vector3(0, 6, 18),
  new THREE.Vector3(1, 3, 9),
  new THREE.Vector3(-3, 0, 6),
  new THREE.Vector3(4, -2, 5),
  new THREE.Vector3(0, -4, 4),
];

// Station marker positions (near the path)
const stationPositions = [
  new THREE.Vector3(0, 5, 16),
  new THREE.Vector3(1.5, 3, 8),
  new THREE.Vector3(-3.5, 0, 5.5),
  new THREE.Vector3(4.5, -2, 4.5),
  new THREE.Vector3(0, -4.5, 3.5),
];

/* ───────────────────────────────────────────
   Helper: lerp & curve sampling
   ─────────────────────────────────────────── */

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function lerpV3(a: THREE.Vector3, b: THREE.Vector3, t: number) {
  return new THREE.Vector3(lerp(a.x, b.x, t), lerp(a.y, b.y, t), lerp(a.z, b.z, t));
}

/* ───────────────────────────────────────────
   ParticlesField
   ─────────────────────────────────────────── */

function ParticlesField() {
  const count = 200;
  const meshRef = useRef<THREE.Points>(null!);

  const { positions, colors, sizes } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const siz = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      // Scattered in a wide volume around the path
      pos[i * 3] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12 + 8;
      // Blue-ish color with variation
      col[i * 3] = 0.1 + Math.random() * 0.2;     // R
      col[i * 3 + 1] = 0.3 + Math.random() * 0.3;  // G
      col[i * 3 + 2] = 0.7 + Math.random() * 0.3;  // B
      siz[i] = Math.random() * 0.08 + 0.02;
    }
    return { positions: pos, colors: col, sizes: siz };
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    // Gentle rotation
    meshRef.current.rotation.y += 0.0003;
    meshRef.current.rotation.x += 0.0001;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/* ───────────────────────────────────────────
   Station Markers
   ─────────────────────────────────────────── */

function StationMarker({
  position,
  index,
}: {
  position: THREE.Vector3;
  index: number;
}) {
  const ringRef = useRef<THREE.Mesh>(null!);
  const coreRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ringRef.current) {
      ringRef.current.rotation.z += 0.01;
      ringRef.current.rotation.x += 0.005;
      ringRef.current.scale.setScalar(1 + Math.sin(t * 2 + index) * 0.1);
    }
    if (coreRef.current) {
      coreRef.current.scale.setScalar(1 + Math.sin(t * 3 + index * 1.5) * 0.15);
    }
  });

  return (
    <group position={position}>
      {/* Outer ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[0.35, 0.03, 16, 32]} />
        <meshBasicMaterial color="#2563EB" transparent opacity={0.6} />
      </mesh>
      {/* Inner core */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshBasicMaterial color="#2563EB" transparent opacity={0.9} />
      </mesh>
      {/* Glow sphere */}
      <mesh>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshBasicMaterial
          color="#2563EB"
          transparent
          opacity={0.15}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

/* ───────────────────────────────────────────
   Path Line
   ─────────────────────────────────────────── */

function PathLine({ points: pathPoints }: { points: THREE.Vector3[] }) {
  const curve = useMemo(
    () => new THREE.CatmullRomCurve3(pathPoints, false, "catmullrom", 0.5),
    [pathPoints]
  );

  const linePoints = useMemo(() => curve.getPoints(120), [curve]);

  return (
    <Line
      points={linePoints}
      color="#2563EB"
      transparent
      opacity={0.2}
      depthWrite={false}
      lineWidth={1}
    />
  );
}

/* ───────────────────────────────────────────
   Floating Geometries
   ─────────────────────────────────────────── */

function FloatingGeometries() {
  const geometries = useMemo(() => {
    const items: { position: THREE.Vector3; type: "box" | "torus" | "cone"; speed: number }[] = [];
    for (let i = 0; i < 8; i++) {
      items.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 6 + 8
        ),
        type: (["box", "torus", "cone"] as const)[i % 3],
        speed: 0.5 + Math.random() * 1.5,
      });
    }
    return items;
  }, []);

  return (
    <>
      {geometries.map((item, i) => (
        <Float
          key={i}
          speed={item.speed}
          rotationIntensity={0.6}
          floatIntensity={0.8}
        >
          <mesh position={item.position}>
            {item.type === "box" && <boxGeometry args={[0.3, 0.3, 0.3]} />}
            {item.type === "torus" && <torusGeometry args={[0.2, 0.06, 8, 16]} />}
            {item.type === "cone" && <coneGeometry args={[0.18, 0.35, 8]} />}
            <meshBasicMaterial
              color="#2563EB"
              transparent
              opacity={0.12}
              wireframe
              depthWrite={false}
            />
          </mesh>
        </Float>
      ))}
    </>
  );
}

/* ───────────────────────────────────────────
   Camera Rig — moves camera along path
   ─────────────────────────────────────────── */

function CameraRig({
  progress,
}: {
  progress: number;
}) {
  const { camera } = useThree();
  const targetProgress = useRef(progress);
  const smoothProgress = useRef(progress);

  const curve = useMemo(
    () => new THREE.CatmullRomCurve3(rawPathPoints, false, "catmullrom", 0.5),
    []
  );

  // Update target when scroll changes
  useEffect(() => {
    targetProgress.current = Math.max(0, Math.min(1, progress));
  }, [progress]);

  useFrame(() => {
    // Smooth interpolation toward target
    smoothProgress.current = lerp(smoothProgress.current, targetProgress.current, 0.05);

    const t = smoothProgress.current;
    const point = curve.getPointAt(t);

    // Camera looks slightly ahead on the path
    const lookAhead = curve.getPointAt(Math.min(t + 0.02, 1));
    const lookTarget = lerpV3(point, lookAhead, 0.5);

    camera.position.copy(point);
    camera.lookAt(lookTarget.x, lookTarget.y + 0.5, lookTarget.z);
  });

  return null;
}

/* ───────────────────────────────────────────
   Scene Content
   ─────────────────────────────────────────── */

function SceneContent({ progress }: { progress: number }) {
  return (
    <>
      <color attach="background" args={["#070B1E"]} />
      <fog attach="fog" args={["#070B1E", 8, 30]} />

      {/* Lights */}
      <ambientLight intensity={0.3} color="#2563EB" />
      <pointLight position={[5, 5, 10]} intensity={2} color="#2563EB" distance={20} />
      <pointLight position={[-3, -2, 6]} intensity={1} color="#7C3AED" distance={15} />
      <pointLight position={[0, 0, 3]} intensity={0.5} color="#00E5FF" distance={10} />

      {/* Scene elements */}
      <ParticlesField />
      <PathLine points={rawPathPoints} />
      {stationPositions.map((pos, i) => (
        <StationMarker key={i} position={pos} index={i} />
      ))}
      <FloatingGeometries />

      {/* Camera rig */}
      <CameraRig progress={progress} />
    </>
  );
}

/* ───────────────────────────────────────────
   Overlay — HTML text overlay
   ─────────────────────────────────────────── */

function Overlay({ progress }: { progress: number }) {
  // Find the active station based on progress
  const activeStation = stations.find(
    (s) => progress >= s.progressRange[0] && progress <= s.progressRange[1]
  );

  return (
    <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center">
      <div className="max-w-lg mx-auto px-6 text-center">
        <AnimatePresence mode="wait">
          {activeStation && (
            <motion.div
              key={activeStation.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                {activeStation.title}
              </h2>
              <p className="text-base sm:text-lg text-white/60 leading-relaxed">
                {activeStation.subtitle}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ───────────────────────────────────────────
   Scroll Progress Indicator
   ─────────────────────────────────────────── */

function ScrollIndicator({ progress }: { progress: number }) {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 pointer-events-none">
      <div className="h-1 w-32 rounded-full bg-white/10 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-[#2563EB]"
          style={{ width: `${progress * 100}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>
      <span className="text-xs text-white/40 font-mono">
        {Math.round(progress * 100)}%
      </span>
    </div>
  );
}

/* ───────────────────────────────────────────
   Main Component
   ─────────────────────────────────────────── */

export default function Scroll3DScene() {
  const sectionRef = useRef<HTMLDivElement>(null!);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      // How far the section top has scrolled past the viewport top (negative = not yet, positive = scrolled past)
      const scrolledPastTop = -rect.top;
      // Total scrollable distance: section height minus viewport height
      const scrollableHeight = rect.height - viewportHeight;
      if (scrollableHeight <= 0) {
        setProgress(0);
        return;
      }
      const rawProgress = scrolledPastTop / scrollableHeight;
      setProgress(Math.max(0, Math.min(1, rawProgress)));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // initial
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[400vh]"
      aria-label="Explora mis proyectos en 3D"
    >
      {/* Section label */}
      <div className="absolute top-0 left-0 right-0 z-20 pointer-events-none">
        <div className="max-w-6xl mx-auto px-6 pt-20">
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#2563EB]/40 to-transparent" />
            <h2 className="text-sm font-medium uppercase tracking-[0.15em] text-white/50 whitespace-nowrap">
              Explora mis proyectos
            </h2>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#2563EB]/40 to-transparent" />
          </div>
          <p className="text-center text-xs text-white/30 mt-2">
            Haz scroll para navegar
          </p>
        </div>
      </div>

      {/* Sticky 3D Canvas */}
      <div className="sticky top-0 h-screen w-full">
        <Canvas
          gl={{ antialias: true, alpha: false }}
          dpr={[1, 1.5]}
          camera={{ position: [0, 6, 18], fov: 60, near: 0.5, far: 50 }}
        >
          <SceneContent progress={progress} />
        </Canvas>

        {/* HTML Overlay */}
        <Overlay progress={progress} />
        <ScrollIndicator progress={progress} />
      </div>
    </section>
  );
}

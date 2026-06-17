"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Line } from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  personalInfo,
  aboutText,
  skillCategories,
  projects,
} from "@/lib/data";
import { AuroraText } from "@/components/effects/AuroraText";
import { SparklesText } from "@/components/effects/SparklesText";
import { CaretRight } from "@phosphor-icons/react/dist/ssr";

/* ───────────────────────────────────────────
   Data: 8 stations for the full journey
   ─────────────────────────────────────────── */

interface Station {
  id: string;
  type: "hero" | "about" | "skills" | "project" | "contact";
  title?: string;
  subtitle?: string;
  description?: string;
  tags?: string[];
  projectIndex?: number; // index into projects array
  progressRange: [number, number];
}

const aboutPreview = aboutText.split("\n\n")[0];
const allSkills = skillCategories.flatMap((cat) => cat.skills);

const stations: Station[] = [
  {
    id: "hero",
    type: "hero",
    progressRange: [0, 0.12],
  },
  {
    id: "about",
    type: "about",
    title: "Sobre mí",
    description: aboutPreview,
    progressRange: [0.14, 0.26],
  },
  {
    id: "skills",
    type: "skills",
    title: "Con qué trabajo",
    tags: allSkills,
    progressRange: [0.28, 0.42],
  },
  {
    id: "workshift",
    type: "project",
    projectIndex: 0,
    title: "WorkShift",
    subtitle: "App de fichaje laboral",
    description:
      "FastAPI + React + PostgreSQL + Docker. Registro de jornadas, cálculo automático de salario, gestión de clientes y conducción.",
    tags: ["FastAPI", "React", "PostgreSQL", "Docker"],
    progressRange: [0.44, 0.55],
  },
  {
    id: "gastodehoy",
    type: "project",
    projectIndex: 1,
    title: "GastoDeHoy",
    subtitle: "Presupuesto personal inteligente",
    description:
      "FastAPI + React + n8n. Control de gastos con analytics semanal automatizado y notificaciones por email.",
    tags: ["FastAPI", "React", "n8n", "PostgreSQL"],
    progressRange: [0.57, 0.68],
  },
  {
    id: "hermes",
    type: "project",
    projectIndex: 2,
    title: "Hermes Agent",
    subtitle: "Asistente IA autónomo",
    description:
      "Agentes de IA que ejecutan tareas multi-paso. Integración con Discord, Telegram, n8n, GitHub y más.",
    tags: ["Python", "Docker", "n8n", "MCP"],
    progressRange: [0.7, 0.81],
  },
  {
    id: "infra",
    type: "project",
    projectIndex: 3,
    title: "Infraestructura Self-Hosted",
    subtitle: "VPS, Nginx, Docker, SSL",
    description:
      "Múltiples aplicaciones en una sola VPS. Reverse proxy, SSL automático, monitorización y CI/CD.",
    tags: ["Linux", "Nginx", "Docker", "SSL"],
    progressRange: [0.83, 0.94],
  },
  {
    id: "contact",
    type: "contact",
    title: "¿Hablamos?",
    subtitle: "Disponible para proyectos y colaboraciones",
    progressRange: [0.96, 1.0],
  },
];

/* ───────────────────────────────────────────
   3D Path: 8 points for 8 stations
   ─────────────────────────────────────────── */

const rawPathPoints = [
  new THREE.Vector3(0, 7, 20),
  new THREE.Vector3(0.5, 5, 14),
  new THREE.Vector3(1, 2.5, 9),
  new THREE.Vector3(-2, 0.5, 6),
  new THREE.Vector3(-3.5, -1.5, 5),
  new THREE.Vector3(3, -3, 4.5),
  new THREE.Vector3(5, -5, 4),
  new THREE.Vector3(0, -7, 3.5),
];

const stationPositions = rawPathPoints.map((p) =>
  new THREE.Vector3(p.x, p.y + 1, p.z)
);

/* ───────────────────────────────────────────
   Helpers
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
  const count = 250;
  const meshRef = useRef<THREE.Points>(null!);

  const { positions, colors, sizes } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const siz = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 18;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 16 + 10;
      col[i * 3] = 0.08 + Math.random() * 0.18;
      col[i * 3 + 1] = 0.25 + Math.random() * 0.3;
      col[i * 3 + 2] = 0.6 + Math.random() * 0.4;
      siz[i] = Math.random() * 0.07 + 0.02;
    }
    return { positions: pos, colors: col, sizes: siz };
  }, []);

  useFrame(() => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += 0.0002;
    meshRef.current.rotation.x += 0.00008;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.55}
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
      ringRef.current.rotation.z += 0.008;
      ringRef.current.rotation.x += 0.004;
      ringRef.current.scale.setScalar(1 + Math.sin(t * 2 + index) * 0.08);
    }
    if (coreRef.current) {
      coreRef.current.scale.setScalar(1 + Math.sin(t * 3 + index * 1.5) * 0.12);
    }
  });

  return (
    <group position={position}>
      <mesh ref={ringRef}>
        <torusGeometry args={[0.3, 0.025, 16, 32]} />
        <meshBasicMaterial color="#2563EB" transparent opacity={0.5} />
      </mesh>
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshBasicMaterial color="#2563EB" transparent opacity={0.85} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.22, 16, 16]} />
        <meshBasicMaterial color="#2563EB" transparent opacity={0.12} depthWrite={false} />
      </mesh>
    </group>
  );
}

/* ───────────────────────────────────────────
   Path Line
   ─────────────────────────────────────────── */

function PathLine({ points }: { points: THREE.Vector3[] }) {
  const curve = useMemo(
    () => new THREE.CatmullRomCurve3(points, false, "catmullrom", 0.5),
    [points]
  );
  const linePoints = useMemo(() => curve.getPoints(150), [curve]);

  return (
    <Line
      points={linePoints}
      color="#2563EB"
      transparent
      opacity={0.18}
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
    const items: {
      position: THREE.Vector3;
      type: "box" | "torus" | "cone";
      speed: number;
    }[] = [];
    for (let i = 0; i < 12; i++) {
      items.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 14,
          (Math.random() - 0.5) * 12,
          (Math.random() - 0.5) * 10 + 10
        ),
        type: (["box", "torus", "cone"] as const)[i % 3],
        speed: 0.4 + Math.random() * 1.6,
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
          rotationIntensity={0.5}
          floatIntensity={0.7}
        >
          <mesh position={item.position}>
            {item.type === "box" && <boxGeometry args={[0.25, 0.25, 0.25]} />}
            {item.type === "torus" && (
              <torusGeometry args={[0.18, 0.05, 8, 16]} />
            )}
            {item.type === "cone" && (
              <coneGeometry args={[0.15, 0.3, 8]} />
            )}
            <meshBasicMaterial
              color="#2563EB"
              transparent
              opacity={0.1}
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
   Camera Rig
   ─────────────────────────────────────────── */

function CameraRig({ progress }: { progress: number }) {
  const { camera } = useThree();
  const targetProgress = useRef(progress);
  const smoothProgress = useRef(progress);

  const curve = useMemo(
    () => new THREE.CatmullRomCurve3(rawPathPoints, false, "catmullrom", 0.5),
    []
  );

  useEffect(() => {
    targetProgress.current = Math.max(0, Math.min(1, progress));
  }, [progress]);

  useFrame(() => {
    smoothProgress.current = lerp(
      smoothProgress.current,
      targetProgress.current,
      0.04
    );
    const t = smoothProgress.current;
    const point = curve.getPointAt(t);
    const lookAhead = curve.getPointAt(Math.min(t + 0.015, 1));
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
      <fog attach="fog" args={["#070B1E", 6, 35]} />

      <ambientLight intensity={0.25} color="#2563EB" />
      <pointLight position={[5, 5, 12]} intensity={2.5} color="#2563EB" distance={22} />
      <pointLight position={[-4, -2, 7]} intensity={1.2} color="#7C3AED" distance={16} />
      <pointLight position={[0, 0, 4]} intensity={0.6} color="#00E5FF" distance={12} />

      <ParticlesField />
      <PathLine points={rawPathPoints} />
      {stationPositions.map((pos, i) => (
        <StationMarker key={i} position={pos} index={i} />
      ))}
      <FloatingGeometries />

      <CameraRig progress={progress} />
    </>
  );
}

/* ───────────────────────────────────────────
   Overlay — rich content per station
   ─────────────────────────────────────────── */

function Overlay({ progress }: { progress: number }) {
  const active = stations.find(
    (s) => progress >= s.progressRange[0] && progress <= s.progressRange[1]
  );

  const renderStation = (station: Station) => {
    switch (station.type) {
      case "hero":
        return (
          <div className="text-center max-w-2xl mx-auto px-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 text-white/50 text-xs sm:text-sm mb-8 bg-white/[0.03] backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-subtle-pulse" />
              <span>disponible para proyectos</span>
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-none mb-4">
              <AuroraText speed="slow">Andrea Cruz</AuroraText>
            </h1>
            <div className="text-2xl sm:text-3xl md:text-4xl text-white/90 font-light mb-6">
              <SparklesText
                className="text-inherit font-light"
                sparklesCount={10}
                colors={{ first: "#2563EB", second: "#00E5FF" }}
              >
                {personalInfo.title}
              </SparklesText>
            </div>
            <p className="text-base sm:text-lg text-white/50 max-w-xl mx-auto">
              {personalInfo.subtitle}
            </p>
          </div>
        );

      case "about":
        return (
          <div className="text-center max-w-xl mx-auto px-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-5 tracking-tight">
              {station.title}
            </h2>
            <p className="text-base sm:text-lg text-white/60 leading-relaxed">
              {station.description}
            </p>
          </div>
        );

      case "skills":
        return (
          <div className="text-center max-w-2xl mx-auto px-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              {station.title}
            </h2>
            <div className="flex flex-wrap justify-center gap-2.5">
              {(station.tags || []).map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center px-4 py-2 rounded-xl bg-white/[0.05] border border-white/[0.06] text-sm text-white/70 backdrop-blur-sm hover:border-[#2563EB]/30 hover:text-white/90 transition-colors duration-300"
                >
                  {skill}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-2 mt-5">
              {skillCategories.map((cat) => (
                <span
                  key={cat.name}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/[0.02] text-xs text-white/35 border border-white/[0.04]"
                >
                  {cat.name}
                </span>
              ))}
            </div>
          </div>
        );

      case "project":
        return (
          <div className="text-center max-w-lg mx-auto px-4">
            <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-[#2563EB] mb-3 font-medium">
              Proyecto destacado
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">
              {station.title}
            </h2>
            <p className="text-lg sm:text-xl text-white/40 mb-3">
              {station.subtitle}
            </p>
            <p className="text-sm sm:text-base text-white/55 leading-relaxed mb-5 max-w-md mx-auto">
              {station.description}
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {(station.tags || []).map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-3 py-1 rounded-lg bg-[#2563EB]/10 border border-[#2563EB]/20 text-xs text-[#2563EB]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        );

      case "contact":
        return (
          <div className="text-center max-w-md mx-auto px-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              {station.title}
            </h2>
            <p className="text-base sm:text-lg text-white/50 mb-8">
              {station.subtitle}
            </p>
            <div className="flex flex-wrap justify-center gap-3 pointer-events-auto">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 rounded-xl px-7 h-12 text-sm font-semibold bg-[#2563EB] text-white hover:bg-[#2563EB]/90 active:scale-[0.97] transition-all"
              >
                <CaretRight className="w-4 h-4" />
                Ver Proyectos
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl px-7 h-12 text-sm font-medium border border-[#2563EB]/30 text-[#2563EB] hover:border-[#2563EB]/50 active:scale-[0.97] transition-all"
              >
                Contactar
              </Link>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center">
      <AnimatePresence mode="wait">
        {active && (
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {renderStation(active)}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ───────────────────────────────────────────
   Scroll Progress Bar
   ─────────────────────────────────────────── */

function ScrollBar({ progress }: { progress: number }) {
  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 pointer-events-none">
      <div className="h-0.5 w-28 rounded-full bg-white/[0.08] overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-[#2563EB]"
          style={{ width: `${progress * 100}%` }}
          transition={{ duration: 0.08 }}
        />
      </div>
      <span className="text-[11px] text-white/25 font-mono tabular-nums">
        {Math.round(progress * 100)}
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
      const scrolledPastTop = -rect.top;
      const scrollableHeight = rect.height - viewportHeight;
      if (scrollableHeight <= 0) {
        setProgress(0);
        return;
      }
      const rawProgress = scrolledPastTop / scrollableHeight;
      setProgress(Math.max(0, Math.min(1, rawProgress)));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[600vh]"
      aria-label="Portfolio interactivo 3D"
    >
      {/* Top hint */}
      <div className="absolute top-0 left-0 right-0 z-20 pointer-events-none">
        <div className="max-w-6xl mx-auto px-6 pt-16 sm:pt-20">
          <p className="text-center text-xs text-white/25 tracking-wider uppercase">
            Haz scroll para explorar
          </p>
        </div>
      </div>

      {/* Sticky 3D Canvas */}
      <div className="sticky top-0 h-screen w-full">
        <Canvas
          gl={{ antialias: true, alpha: false }}
          dpr={[1, 1.5]}
          camera={{ position: [0, 7, 20], fov: 60, near: 0.5, far: 50 }}
        >
          <SceneContent progress={progress} />
        </Canvas>

        <Overlay progress={progress} />
        <ScrollBar progress={progress} />
      </div>
    </section>
  );
}

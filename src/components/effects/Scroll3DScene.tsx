"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Line, Html } from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { personalInfo, aboutText, skillCategories, projects } from "@/lib/data";
import { AuroraText } from "@/components/effects/AuroraText";
import { SparklesText } from "@/components/effects/SparklesText";
import { CaretRight } from "@phosphor-icons/react/dist/ssr";

/* ═══════════════════════════════════════════
   TECH CONSTELLATION — Data
   ═══════════════════════════════════════════ */

interface TechDef {
  name: string;
  color: string;
  shape: "sphere" | "cube" | "octahedron" | "torus" | "cone" | "icosahedron";
  orbitColor: string;
}

interface TechClusterDef {
  id: string;
  label: string;
  type: "hero" | "about" | "skills" | "project" | "contact";
  center: THREE.Vector3;
  techs: TechDef[];
  subtitle?: string;
  projectIndex?: number;
}

const clusters: TechClusterDef[] = [
  {
    id: "hero",
    label: "Andrea Cruz",
    type: "hero",
    center: new THREE.Vector3(0, 6, 16),
    techs: [],
  },
  {
    id: "frontend",
    label: "Frontend",
    type: "skills",
    center: new THREE.Vector3(-5, 2, 8),
    techs: [
      { name: "React", color: "#61DAFB", shape: "sphere", orbitColor: "#61DAFB" },
      { name: "Next.js", color: "#E0E0E0", shape: "icosahedron", orbitColor: "#E0E0E0" },
      { name: "TypeScript", color: "#3178C6", shape: "octahedron", orbitColor: "#3178C6" },
      { name: "Tailwind", color: "#06B6D4", shape: "cone", orbitColor: "#06B6D4" },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    type: "skills",
    center: new THREE.Vector3(5, 2, 8),
    techs: [
      { name: "Python", color: "#FFD43B", shape: "sphere", orbitColor: "#FFD43B" },
      { name: "FastAPI", color: "#009688", shape: "octahedron", orbitColor: "#009688" },
      { name: "PostgreSQL", color: "#336791", shape: "cube", orbitColor: "#336791" },
      { name: "PHP", color: "#777BB4", shape: "icosahedron", orbitColor: "#777BB4" },
    ],
  },
  {
    id: "infra",
    label: "Infraestructura",
    type: "skills",
    center: new THREE.Vector3(-5, -2.5, 8),
    techs: [
      { name: "Docker", color: "#2496ED", shape: "cube", orbitColor: "#2496ED" },
      { name: "Nginx", color: "#009639", shape: "cube", orbitColor: "#009639" },
      { name: "Linux", color: "#FCC624", shape: "sphere", orbitColor: "#FCC624" },
      { name: "SSL", color: "#F59E0B", shape: "icosahedron", orbitColor: "#F59E0B" },
      { name: "Git", color: "#F05032", shape: "cone", orbitColor: "#F05032" },
    ],
  },
  {
    id: "automation",
    label: "Automatizacion",
    type: "skills",
    center: new THREE.Vector3(5, -2.5, 8),
    techs: [
      { name: "n8n", color: "#EA4B71", shape: "torus", orbitColor: "#EA4B71" },
      { name: "Odoo", color: "#714B67", shape: "icosahedron", orbitColor: "#714B67" },
      { name: "APIs", color: "#8B5CF6", shape: "torus", orbitColor: "#8B5CF6" },
      { name: "Webhooks", color: "#EC4899", shape: "cone", orbitColor: "#EC4899" },
    ],
  },
  {
    id: "workshift",
    label: "WorkShift",
    type: "project",
    center: new THREE.Vector3(-6, -6, 8),
    subtitle: "App de fichaje laboral",
    projectIndex: 0,
    techs: [],
  },
  {
    id: "gastodehoy",
    label: "GastoDeHoy",
    type: "project",
    center: new THREE.Vector3(0, -6.5, 10),
    subtitle: "Presupuesto personal",
    projectIndex: 1,
    techs: [],
  },
  {
    id: "hermes",
    label: "Hermes Agent",
    type: "project",
    center: new THREE.Vector3(6, -6, 8),
    subtitle: "Asistente IA autonomo",
    projectIndex: 2,
    techs: [],
  },
  {
    id: "contact",
    label: "Hablemos",
    type: "contact",
    center: new THREE.Vector3(0, -10, 10),
    subtitle: "Disponible para proyectos",
    techs: [],
  },
];

/* ═══════════════════════════════════════════
   Helpers
   ═══════════════════════════════════════════ */

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function lerpV3(a: THREE.Vector3, b: THREE.Vector3, t: number) {
  return new THREE.Vector3(lerp(a.x, b.x, t), lerp(a.y, b.y, t), lerp(a.z, b.z, t));
}

function orbitPosition(center: THREE.Vector3, index: number, total: number, radius: number, time: number) {
  const angle = (index / total) * Math.PI * 2 + time * 0.15;
  return new THREE.Vector3(
    center.x + Math.cos(angle) * radius,
    center.y + Math.sin(angle) * radius * 0.6,
    center.z + Math.sin(time * 0.3 + index) * 0.3
  );
}

/* ═══════════════════════════════════════════
   TechNode — a single technology
   ═══════════════════════════════════════════ */

function TechNode({
  tech,
  position,
  index,
}: {
  tech: TechDef;
  position: THREE.Vector3;
  index: number;
}) {
  const groupRef = useRef<THREE.Group>(null!);
  const meshRef = useRef<THREE.Mesh>(null!);
  const ringRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (!groupRef.current) return;
    // Gentle float
    groupRef.current.position.y = position.y + Math.sin(t * 0.8 + index) * 0.2;
    groupRef.current.position.x = position.x + Math.cos(t * 0.6 + index) * 0.15;
    // Pulse
    if (meshRef.current) {
      const s = 1 + Math.sin(t * 2 + index) * 0.06;
      meshRef.current.scale.setScalar(s);
    }
    // Orbit ring rotation
    if (ringRef.current) {
      ringRef.current.rotation.z += 0.005;
      ringRef.current.rotation.x += 0.003;
    }
  });

  const shapeGeometry = useMemo(() => {
    switch (tech.shape) {
      case "cube":
        return <boxGeometry args={[0.35, 0.35, 0.35]} />;
      case "octahedron":
        return <octahedronGeometry args={[0.3, 0]} />;
      case "torus":
        return <torusGeometry args={[0.22, 0.07, 8, 16]} />;
      case "cone":
        return <coneGeometry args={[0.22, 0.4, 8]} />;
      case "icosahedron":
        return <icosahedronGeometry args={[0.28, 0]} />;
      case "sphere":
      default:
        return <sphereGeometry args={[0.28, 16, 16]} />;
    }
  }, [tech.shape]);

  return (
    <group ref={groupRef} position={position}>
      {/* Orbiting ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[0.45, 0.012, 8, 32]} />
        <meshBasicMaterial color={tech.orbitColor} transparent opacity={0.2} depthWrite={false} />
      </mesh>

      {/* Glow halo */}
      <mesh>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshBasicMaterial color={tech.color} transparent opacity={0.06} depthWrite={false} />
      </mesh>

      {/* Main shape */}
      <mesh ref={meshRef} castShadow>
        {shapeGeometry}
        <meshStandardMaterial
          color={tech.color}
          roughness={0.3}
          metalness={0.4}
          emissive={tech.color}
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Label */}
      <Html
        position={[0, 0.55, 0]}
        center
        distanceFactor={8}
        className="pointer-events-none"
      >
        <span className="text-[10px] font-medium text-white/60 whitespace-nowrap bg-[#070B1E]/60 px-1.5 py-0.5 rounded backdrop-blur-sm">
          {tech.name}
        </span>
      </Html>
    </group>
  );
}

/* ═══════════════════════════════════════════
   ConnectionLine — between two nodes
   ═══════════════════════════════════════════ */

function ConnectionLine({
  start,
  end,
  color,
}: {
  start: THREE.Vector3;
  end: THREE.Vector3;
  color: string;
}) {
  const points = useMemo(() => {
    const mid = new THREE.Vector3(
      (start.x + end.x) / 2,
      (start.y + end.y) / 2 + 0.3,
      (start.z + end.z) / 2
    );
    const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
    return curve.getPoints(20);
  }, [start, end]);

  return (
    <Line
      points={points}
      color={color}
      transparent
      opacity={0.12}
      depthWrite={false}
      lineWidth={1}
    />
  );
}

/* ═══════════════════════════════════════════
   DataParticles — flowing dots along connections
   ═══════════════════════════════════════════ */

function DataParticles({ clusterCenter }: { clusterCenter: THREE.Vector3 }) {
  const count = 40;
  const meshRef = useRef<THREE.Points>(null!);

  const { positions, colors, sizes } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const siz = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = clusterCenter.x + (Math.random() - 0.5) * 5;
      pos[i * 3 + 1] = clusterCenter.y + (Math.random() - 0.5) * 4;
      pos[i * 3 + 2] = clusterCenter.z + (Math.random() - 0.5) * 3 + 3;
      col[i * 3] = 0.08 + Math.random() * 0.12;
      col[i * 3 + 1] = 0.3 + Math.random() * 0.2;
      col[i * 3 + 2] = 0.7 + Math.random() * 0.3;
      siz[i] = Math.random() * 0.04 + 0.01;
    }
    return { positions: pos, colors: col, sizes: siz };
  }, [clusterCenter]);

  useFrame(() => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += 0.0003;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.5}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/* ═══════════════════════════════════════════
   TechCluster — group of TechNodes + connections
   ═══════════════════════════════════════════ */

function TechCluster({ cluster }: { cluster: TechClusterDef }) {
  const radius = 1.4;
  const total = cluster.techs.length;

  const techPositions = useMemo(() => {
    if (total === 0) return [];
    return cluster.techs.map((_, i) => {
      const angle = (i / total) * Math.PI * 2;
      return new THREE.Vector3(
        cluster.center.x + Math.cos(angle) * radius,
        cluster.center.y + Math.sin(angle) * radius * 0.5,
        cluster.center.z
      );
    });
  }, [cluster.center, radius, total]);

  const connectionLines = useMemo(() => {
    if (techPositions.length < 2) return [];
    const lines: { start: THREE.Vector3; end: THREE.Vector3; color: string }[] = [];
    for (let i = 0; i < techPositions.length; i++) {
      const next = (i + 1) % techPositions.length;
      lines.push({
        start: techPositions[i],
        end: techPositions[next],
        color: "#2563EB",
      });
    }
    return lines;
  }, [techPositions]);

  return (
    <group>
      {/* Connections */}
      {connectionLines.map((line, i) => (
        <ConnectionLine
          key={i}
          start={line.start}
          end={line.end}
          color={line.color}
        />
      ))}

      {/* Data particles around cluster */}
      <DataParticles clusterCenter={cluster.center} />

      {/* Tech nodes */}
      {cluster.techs.map((tech, i) => (
        <TechNode
          key={tech.name}
          tech={tech}
          position={techPositions[i]}
          index={i}
        />
      ))}

      {/* Cluster label (only for skill clusters) */}
      {cluster.type === "skills" && (
        <Html
          position={[
            cluster.center.x,
            cluster.center.y + radius + 0.7,
            cluster.center.z,
          ]}
          center
          distanceFactor={10}
          className="pointer-events-none"
        >
          <span className="text-xs font-semibold text-white/35 uppercase tracking-[0.2em] whitespace-nowrap bg-[#070B1E]/50 px-2 py-1 rounded backdrop-blur-sm">
            {cluster.label}
          </span>
        </Html>
      )}
    </group>
  );
}

/* ═══════════════════════════════════════════
   Ambient Particles
   ═══════════════════════════════════════════ */

function AmbientParticles() {
  const count = 180;
  const meshRef = useRef<THREE.Points>(null!);

  const { positions, colors, sizes } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const siz = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 25;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20 + 10;
      col[i * 3] = 0.02 + Math.random() * 0.08;
      col[i * 3 + 1] = 0.1 + Math.random() * 0.15;
      col[i * 3 + 2] = 0.3 + Math.random() * 0.25;
      siz[i] = Math.random() * 0.05 + 0.01;
    }
    return { positions: pos, colors: col, sizes: siz };
  }, []);

  useFrame(() => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += 0.00015;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.45}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/* ═══════════════════════════════════════════
   District Rings — subtle ring around each cluster center
   ═══════════════════════════════════════════ */

function DistrictRing({ position }: { position: THREE.Vector3 }) {
  return (
    <mesh position={position} rotation={[Math.PI / 2.5, 0, 0]}>
      <torusGeometry args={[2, 0.015, 8, 64]} />
      <meshBasicMaterial color="#2563EB" transparent opacity={0.08} depthWrite={false} />
    </mesh>
  );
}

/* ═══════════════════════════════════════════
   Camera Rig — CatmullRom path visiting all clusters
   ═══════════════════════════════════════════ */

// Build a path that visits each cluster center + offset for camera distance
const cameraPathPoints = (() => {
  const pts: THREE.Vector3[] = [];
  // Start far out
  pts.push(new THREE.Vector3(0, 8, 22));
  // Visit hero
  pts.push(new THREE.Vector3(0, 7, 16));
  // Between frontend and backend
  pts.push(new THREE.Vector3(0, 3.5, 10));
  // Frontend close
  pts.push(new THREE.Vector3(-3.5, 2.5, 7));
  // Backend close
  pts.push(new THREE.Vector3(3.5, 2, 7));
  // Between infra and automation
  pts.push(new THREE.Vector3(0, -1, 7));
  // Infra close
  pts.push(new THREE.Vector3(-3.5, -1.5, 7));
  // Automation close
  pts.push(new THREE.Vector3(3.5, -2, 7));
  // Projects area
  pts.push(new THREE.Vector3(0, -5, 7));
  // Contact finale
  pts.push(new THREE.Vector3(0, -8, 7));
  return pts;
})();

function CameraRig({ progress }: { progress: number }) {
  const { camera } = useThree();
  const targetProgress = useRef(progress);
  const smoothProgress = useRef(progress);

  const curve = useMemo(
    () => new THREE.CatmullRomCurve3(cameraPathPoints, false, "catmullrom", 0.5),
    []
  );

  useEffect(() => {
    targetProgress.current = Math.max(0, Math.min(1, progress));
  }, [progress]);

  useFrame(() => {
    smoothProgress.current = lerp(smoothProgress.current, targetProgress.current, 0.04);
    const t = smoothProgress.current;
    const point = curve.getPointAt(t);
    const lookAhead = curve.getPointAt(Math.min(t + 0.012, 1));
    const lookTarget = lerpV3(point, lookAhead, 0.6);

    camera.position.copy(point);
    camera.lookAt(lookTarget.x, lookTarget.y, lookTarget.z);
  });

  return null;
}

/* ═══════════════════════════════════════════
   Scene Content
   ═══════════════════════════════════════════ */

function SceneContent({ progress }: { progress: number }) {
  return (
    <>
      <color attach="background" args={["#070B1E"]} />
      <fog attach="fog" args={["#070B1E", 8, 40]} />

      <ambientLight intensity={0.3} color="#1E3A8A" />
      <pointLight position={[8, 5, 14]} intensity={3} color="#2563EB" distance={30} />
      <pointLight position={[-8, -3, 10]} intensity={1.5} color="#7C3AED" distance={25} />
      <pointLight position={[0, 0, 6]} intensity={0.8} color="#00E5FF" distance={18} />

      <AmbientParticles />

      {/* District rings */}
      {clusters.filter(c => c.type === "skills").map((c) => (
        <DistrictRing key={c.id} position={c.center} />
      ))}

      {/* Tech clusters — all non-empty */}
      {clusters.map((c) => {
        if (c.techs.length > 0) {
          return <TechCluster key={c.id} cluster={c} />;
        }
        // Empty clusters (hero, projects, contact) — subtle floating indicator
        return (
          <Float key={c.id} speed={2.5} rotationIntensity={0} floatIntensity={0.3}>
            <mesh position={c.center}>
              {c.type === "hero" && <octahedronGeometry args={[0.6, 0]} />}
              {c.type === "project" && <boxGeometry args={[0.5, 0.5, 0.5]} />}
              {c.type === "contact" && <torusGeometry args={[0.5, 0.06, 16, 32]} />}
              {(c.type === "skills" || c.type === "about") && null}
              <meshStandardMaterial
                color="#2563EB"
                roughness={0.3}
                metalness={0.5}
                emissive="#2563EB"
                emissiveIntensity={0.35}
              />
            </mesh>
          </Float>
        );
      })}

      <CameraRig progress={progress} />
    </>
  );
}

/* ═══════════════════════════════════════════
   Station ranges for overlays
   ═══════════════════════════════════════════ */

interface StationRange {
  id: string;
  type: "hero" | "about" | "skills" | "project" | "contact";
  label: string;
  progressRange: [number, number];
  subtitle?: string;
  projectIndex?: number;
  tags?: string[];
}

const stationRanges: StationRange[] = [
  { id: "hero", type: "hero", label: "Andrea Cruz", progressRange: [0, 0.11] },
  {
    id: "about",
    type: "about",
    label: "Sobre mi",
    progressRange: [0.12, 0.22],
  },
  {
    id: "skills-frontend",
    type: "skills",
    label: "Frontend",
    progressRange: [0.23, 0.34],
    tags: ["React", "Next.js", "TypeScript", "TailwindCSS"],
  },
  {
    id: "skills-backend",
    type: "skills",
    label: "Backend",
    progressRange: [0.35, 0.46],
    tags: ["Python", "FastAPI", "PostgreSQL", "PHP"],
  },
  {
    id: "skills-infra",
    type: "skills",
    label: "Infraestructura",
    progressRange: [0.47, 0.58],
    tags: ["Docker", "Nginx", "Linux VPS", "SSL", "Git"],
  },
  {
    id: "skills-automation",
    type: "skills",
    label: "Automatizacion",
    progressRange: [0.59, 0.70],
    tags: ["n8n", "Odoo 19", "APIs REST", "Webhooks"],
  },
  {
    id: "project-1",
    type: "project",
    label: "WorkShift",
    subtitle: "App de fichaje laboral",
    projectIndex: 0,
    progressRange: [0.71, 0.77],
    tags: ["FastAPI", "React", "PostgreSQL", "Docker"],
  },
  {
    id: "project-2",
    type: "project",
    label: "GastoDeHoy",
    subtitle: "Presupuesto personal",
    projectIndex: 1,
    progressRange: [0.78, 0.84],
    tags: ["FastAPI", "React", "n8n", "PostgreSQL"],
  },
  {
    id: "project-3",
    type: "project",
    label: "Hermes Agent",
    subtitle: "Asistente IA autonomo",
    projectIndex: 2,
    progressRange: [0.85, 0.91],
    tags: ["Python", "Docker", "n8n", "MCP"],
  },
  {
    id: "contact",
    type: "contact",
    label: "Hablemos",
    subtitle: "Disponible para proyectos y colaboraciones",
    progressRange: [0.92, 1.0],
  },
];

/* ═══════════════════════════════════════════
   Overlay
   ═══════════════════════════════════════════ */

const aboutPreview = aboutText.split("\n\n")[0];

function Overlay({ progress }: { progress: number }) {
  const active = stationRanges.find(
    (s) => progress >= s.progressRange[0] && progress <= s.progressRange[1]
  );

  const renderStation = (station: StationRange) => {
    switch (station.type) {
      case "hero":
        return (
          <div className="text-center max-w-2xl mx-auto px-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 text-white/50 text-xs sm:text-sm mb-8 bg-white/[0.03] backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-subtle-pulse" />
              <span>disponible para proyectos</span>
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-none mb-4">
              <AuroraText speed="slow">{personalInfo.name}</AuroraText>
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
              Sobre mi
            </h2>
            <p className="text-base sm:text-lg text-white/60 leading-relaxed">
              {aboutPreview}
            </p>
          </div>
        );

      case "skills":
        return (
          <div className="text-center max-w-2xl mx-auto px-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              {station.label}
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
          </div>
        );

      case "project": {
        const proj = station.projectIndex !== undefined ? projects[station.projectIndex] : null;
        return (
          <div className="text-center max-w-lg mx-auto px-4">
            <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-[#2563EB] mb-3 font-medium">
              Proyecto destacado
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">
              {station.label}
            </h2>
            {station.subtitle && (
              <p className="text-lg sm:text-xl text-white/40 mb-3">
                {station.subtitle}
              </p>
            )}
            {proj && (
              <>
                <p className="text-sm sm:text-base text-white/55 leading-relaxed mb-5 max-w-md mx-auto">
                  {proj.description}
                </p>
                {proj.github && (
                  <a
                    href={proj.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-[#2563EB]/70 hover:text-[#2563EB] transition-colors pointer-events-auto"
                  >
                    <CaretRight className="w-3 h-3" />
                    Ver codigo en GitHub
                  </a>
                )}
              </>
            )}
            <div className="flex flex-wrap justify-center gap-2 mt-4">
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
      }

      case "contact":
        return (
          <div className="text-center max-w-md mx-auto px-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              {station.label}
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

/* ═══════════════════════════════════════════
   Scroll Progress Bar
   ═══════════════════════════════════════════ */

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

/* ═══════════════════════════════════════════
   Main Component
   ═══════════════════════════════════════════ */

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
          camera={{ position: [0, 8, 22], fov: 60, near: 0.5, far: 60 }}
        >
          <SceneContent progress={progress} />
        </Canvas>

        <Overlay progress={progress} />
        <ScrollBar progress={progress} />
      </div>
    </section>
  );
}

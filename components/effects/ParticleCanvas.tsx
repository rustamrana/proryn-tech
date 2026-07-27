'use client';

import { useRef, useMemo, useCallback, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface ParticleCanvasProps {
  /** Number of particles to render (default: 800, adjusts based on device) */
  particleCount?: number;
  /** Primary particle color (default: '#2563EB' — brand-secondary) */
  colorPrimary?: string;
  /** Secondary particle color (default: '#06B6D4' — brand-accent) */
  colorSecondary?: string;
  /** Enable cursor reactivity (default: true) */
  interactive?: boolean;
  /** Additional class names for the canvas wrapper */
  className?: string;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const DESKTOP_PARTICLES = 800;
const MOBILE_PARTICLES = 400;
const PARTICLE_SPREAD = 8;
const PARTICLE_SIZE = 0.025;
const CURSOR_INFLUENCE_RADIUS = 2.5;
const CURSOR_STRENGTH = 0.4;

// ─── Shader Material ─────────────────────────────────────────────────────────

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform vec3 uMouse;
  uniform float uInteractive;
  uniform float uPixelRatio;

  attribute float aScale;
  attribute vec3 aRandomness;
  attribute float aColorMix;

  varying float vColorMix;
  varying float vAlpha;

  void main() {
    vec3 pos = position;

    // Organic floating motion using sin/cos with randomized offsets
    float timeOffset = aRandomness.x * 6.2831;
    pos.x += sin(uTime * 0.3 + timeOffset) * aRandomness.y * 0.5;
    pos.y += cos(uTime * 0.25 + timeOffset) * aRandomness.z * 0.5;
    pos.z += sin(uTime * 0.2 + aRandomness.z * 6.2831) * aRandomness.x * 0.3;

    // Cursor reactivity — push particles away from cursor
    if (uInteractive > 0.5) {
      vec3 toCursor = pos - uMouse;
      float dist = length(toCursor);
      float influence = smoothstep(${CURSOR_INFLUENCE_RADIUS.toFixed(1)}, 0.0, dist);
      pos += normalize(toCursor) * influence * ${CURSOR_STRENGTH.toFixed(1)};
    }

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    // Size attenuation — particles shrink with distance
    gl_PointSize = aScale * uPixelRatio * ${PARTICLE_SIZE.toFixed(3)} * (300.0 / -mvPosition.z);
    gl_PointSize = max(gl_PointSize, 1.0);

    // Pass varyings
    vColorMix = aColorMix;
    vAlpha = smoothstep(0.0, 0.3, aScale);
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uColorPrimary;
  uniform vec3 uColorSecondary;

  varying float vColorMix;
  varying float vAlpha;

  void main() {
    // Circular particle shape with soft edge
    float dist = length(gl_PointCoord - vec2(0.5));
    if (dist > 0.5) discard;

    float alpha = smoothstep(0.5, 0.2, dist) * vAlpha * 0.7;
    vec3 color = mix(uColorPrimary, uColorSecondary, vColorMix);

    gl_FragColor = vec4(color, alpha);
  }
`;

// ─── Utility: Detect optimal particle count ──────────────────────────────────

function getOptimalParticleCount(override?: number): number {
  if (override !== undefined) return override;

  if (typeof window === 'undefined') return DESKTOP_PARTICLES;

  // Use hardware concurrency or screen width to determine capability
  const cores = navigator.hardwareConcurrency || 4;
  const isMobile = window.innerWidth < 768 || cores <= 4;

  return isMobile ? MOBILE_PARTICLES : DESKTOP_PARTICLES;
}

// ─── Utility: Hex color to normalized RGB vector ─────────────────────────────

function hexToVec3(hex: string): THREE.Vector3 {
  const color = new THREE.Color(hex);
  return new THREE.Vector3(color.r, color.g, color.b);
}

// ─── Particles Component (runs inside Canvas) ────────────────────────────────

interface ParticlesProps {
  count: number;
  colorPrimary: string;
  colorSecondary: string;
  interactive: boolean;
}

function Particles({
  count,
  colorPrimary,
  colorSecondary,
  interactive,
}: ParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const { viewport, pointer } = useThree();

  // Build particle geometry attributes once
  const { positions, scales, randomness, colorMix } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const randomness = new Float32Array(count * 3);
    const colorMix = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Distribute particles in a sphere with some flattening on Y
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = Math.cbrt(Math.random()) * PARTICLE_SPREAD;

      positions[i3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6; // Flatten Y
      positions[i3 + 2] = r * Math.cos(phi) * 0.5;

      scales[i] = Math.random() * 0.8 + 0.2;
      randomness[i3] = Math.random();
      randomness[i3 + 1] = Math.random();
      randomness[i3 + 2] = Math.random();
      colorMix[i] = Math.random();
    }

    return { positions, scales, randomness, colorMix };
  }, [count]);

  // Shader uniforms
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector3(0, 0, 0) },
      uInteractive: { value: interactive ? 1.0 : 0.0 },
      uPixelRatio: {
        value: typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) : 1,
      },
      uColorPrimary: { value: hexToVec3(colorPrimary) },
      uColorSecondary: { value: hexToVec3(colorSecondary) },
    }),
    // Only recreate uniforms object when colors change
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [colorPrimary, colorSecondary]
  );

  // Update interactive uniform when prop changes
  useEffect(() => {
    uniforms.uInteractive.value = interactive ? 1.0 : 0.0;
  }, [interactive, uniforms]);

  // Animation loop — delta-based for frame-rate independence
  useFrame((_, delta) => {
    if (!pointsRef.current) return;

    const material = pointsRef.current.material as THREE.ShaderMaterial;

    // Advance time using delta for frame-rate independence
    material.uniforms.uTime.value += delta;

    // Update mouse position in world space
    if (interactive) {
      const x = pointer.x * (viewport.width / 2);
      const y = pointer.y * (viewport.height / 2);
      material.uniforms.uMouse.value.set(x, y, 0);
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-aScale"
          args={[scales, 1]}
        />
        <bufferAttribute
          attach="attributes-aRandomness"
          args={[randomness, 3]}
        />
        <bufferAttribute
          attach="attributes-aColorMix"
          args={[colorMix, 1]}
        />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

/**
 * ParticleCanvas renders an animated 3D particle field using WebGL via
 * @react-three/fiber. Designed for use as an immersive hero background.
 *
 * Features:
 * - Custom shader material for performant particle rendering
 * - Cursor reactivity pushing particles away from the pointer
 * - Device-adaptive particle count (800 desktop / 400 mobile)
 * - Delta-based animation for frame-rate independence
 * - Designed to be loaded with `next/dynamic` and `ssr: false`
 *
 * @example
 * ```tsx
 * import dynamic from 'next/dynamic';
 * const ParticleCanvas = dynamic(
 *   () => import('@/components/effects/ParticleCanvas'),
 *   { ssr: false }
 * );
 *
 * <ParticleCanvas
 *   colorPrimary="#2563EB"
 *   colorSecondary="#06B6D4"
 *   interactive
 * />
 * ```
 */
export default function ParticleCanvas({
  particleCount,
  colorPrimary = '#2563EB',
  colorSecondary = '#06B6D4',
  interactive = true,
  className,
}: ParticleCanvasProps) {
  const [count, setCount] = useState<number>(DESKTOP_PARTICLES);

  // Determine optimal particle count on mount (client-side only)
  useEffect(() => {
    setCount(getOptimalParticleCount(particleCount));
  }, [particleCount]);

  // Memoize camera config to prevent unnecessary re-renders
  const cameraConfig = useMemo(
    () => ({ position: [0, 0, 5] as [number, number, number], fov: 75 }),
    []
  );

  const handleCreated = useCallback(
    (state: { gl: THREE.WebGLRenderer }) => {
      // Limit pixel ratio for performance
      state.gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    },
    []
  );

  return (
    <div
      className={className}
      aria-hidden="true"
      style={{ width: '100%', height: '100%' }}
    >
      <Canvas
        camera={cameraConfig}
        dpr={[1, 2]}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        onCreated={handleCreated}
        style={{ background: 'transparent' }}
      >
        <Particles
          count={count}
          colorPrimary={colorPrimary}
          colorSecondary={colorSecondary}
          interactive={interactive}
        />
      </Canvas>
    </div>
  );
}

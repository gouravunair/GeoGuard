'use client';
/* eslint-disable react-hooks/purity */

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useScroll } from 'framer-motion';

interface TerrainBackgroundProps {
    riskLevel: 'SAFE' | 'WARNING' | 'DANGER';
}

function Terrain({ riskLevel }: { riskLevel: 'SAFE' | 'WARNING' | 'DANGER' }) {
    const meshRef = useRef<THREE.Mesh>(null);

    // Generate geometry
    const geometry = useMemo(() => {
        const geo = new THREE.PlaneGeometry(15, 15, 32, 32);
        const posAttribute = geo.attributes.position;
        const count = posAttribute.count;

        // Simple noise-like elevation
        for (let i = 0; i < count; i++) {
            const x = posAttribute.getX(i);
            const y = posAttribute.getY(i);
            // Create rolling hills
            const z =
                Math.sin(x * 0.5) * 0.5 +
                Math.cos(y * 0.5) * 0.5 +
                Math.sin(x * 1.5 + y * 1.5) * 0.2;
            posAttribute.setZ(i, z);
        }

        geo.computeVertexNormals();
        return geo;
    }, []);

    // Determine color based on risk
    const color = useMemo(() => {
        if (riskLevel === 'DANGER') return new THREE.Color('#ef4444'); // Red
        if (riskLevel === 'WARNING') return new THREE.Color('#eab308'); // Yellow
        return new THREE.Color('#10b981'); // Green
    }, [riskLevel]);

    useFrame((state: any) => {
        if (!meshRef.current) return;
        // Animate rotation slightly for "flight" effect
        meshRef.current.rotation.x = -Math.PI / 3;
        // meshRef.current.rotation.z += 0.001; 

        // Subtly undulate? Or just move texture? We'll keep it static geo with flow for now
        // A wireframe look is often cleaner for "tech" vibes
    });

    return (
        <mesh ref={meshRef} geometry={geometry} position={[0, -2, -5]}>
            <meshStandardMaterial
                color={color}
                wireframe
                emissive={color}
                emissiveIntensity={0.5}
                transparent
                opacity={0.3}
            />
        </mesh>
    );
}


// Type for particle data
type ParticleData = {
    t: number;
    factor: number;
    speed: number;
    xFactor: number;
    yFactor: number;
    zFactor: number;
    mx: number;
    my: number;
};

function Particles() {
    const count = 500;
    const mesh = useRef<THREE.InstancedMesh>(null);
    const dummy = useMemo(() => new THREE.Object3D(), []);
    const particles = useMemo(() => {
        const temp: ParticleData[] = [];
        for (let i = 0; i < count; i++) {
            const t = Math.random() * 100;
            const factor = 20 + Math.random() * 100;
            const speed = 0.01 + Math.random() / 200;
            const xFactor = -50 + Math.random() * 100;
            const yFactor = -50 + Math.random() * 100;
            const zFactor = -50 + Math.random() * 100;
            temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
        }
        return temp;
    }, []);

    useFrame((state: any) => { // Using any to bypass RootState type complexity for now
        if (!mesh.current) return;
        particles.forEach((particle, i) => {
            // Update particle time
            particle.t += particle.speed / 2;
            const t = particle.t;

            const a = Math.cos(t) + Math.sin(t * 1) / 10;
            const b = Math.sin(t) + Math.cos(t * 2) / 10;
            const s = Math.cos(t);

            particle.mx += (state.pointer.x * 1000 - particle.mx) * 0.01;
            particle.my += (state.pointer.y * 1000 - 1 - particle.my) * 0.01;

            const { factor, xFactor, yFactor, zFactor } = particle;

            dummy.position.set(
                (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
                (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
                (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
            );
            dummy.scale.set(s, s, s);
            dummy.rotation.set(s * 5, s * 5, s * 5);
            dummy.updateMatrix();
            mesh.current!.setMatrixAt(i, dummy.matrix);
        })
        mesh.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
            <dodecahedronGeometry args={[0.2, 0]} />
            <meshPhongMaterial color="#059669" />
        </instancedMesh>
    )
}


export function TerrainBackground({ riskLevel }: { riskLevel: 'SAFE' | 'WARNING' | 'DANGER' }) {
    return (
        <div className="fixed inset-0 -z-10 bg-black">
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/80 z-[1]" />
            <Canvas camera={{ position: [0, 5, 10], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <Terrain riskLevel={riskLevel} />
                <Particles />
                <fog attach="fog" args={['#000', 5, 20]} />
            </Canvas>
        </div>
    );
}

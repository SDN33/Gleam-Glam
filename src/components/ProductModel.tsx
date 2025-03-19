import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import type { Mesh } from 'three';

export default function ProductModel() {
  const meshRef = useRef<Mesh>(null);
  const texture = useTexture('https://res.cloudinary.com/daroyxenr/image/upload/v1742318961/S1bfe2-removebg-preview_z7sxyl.png');
  
  // Make the texture transparent where the background was removed
  texture.transparent = true;
  texture.alphaTest = 0.5;

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.3; // Slower rotation
    }
  });

  return (
    <mesh ref={meshRef} scale={[2.5, 2.5, 2.5]} position={[0, 0, 0]}>
      <planeGeometry args={[1, 1]} />
      <meshStandardMaterial 
        map={texture}
        transparent
        side={THREE.DoubleSide}
        metalness={0.2}
        roughness={0.3}
        emissive="#ffffff"
        emissiveIntensity={0.1}
      />
    </mesh>
  );
}
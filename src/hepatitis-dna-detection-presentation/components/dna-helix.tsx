'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function DNAHelix() {
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.15
    }
  })

  const helixPoints = []
  const numPoints = 100
  const radius = 1.5
  const height = 12

  for (let i = 0; i < numPoints; i++) {
    const t = (i / numPoints) * Math.PI * 4
    const y = (i / numPoints) * height - height / 2
    
    helixPoints.push({
      x1: Math.cos(t) * radius,
      y: y,
      z1: Math.sin(t) * radius,
      x2: Math.cos(t + Math.PI) * radius,
      z2: Math.sin(t + Math.PI) * radius,
    })
  }

  return (
    <group ref={groupRef}>
      {helixPoints.map((point, i) => (
        <group key={i}>
          {/* Backbone spheres */}
          <mesh position={[point.x1, point.y, point.z1]}>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshStandardMaterial color="#4a7c9e" />
          </mesh>
          <mesh position={[point.x2, point.y, point.z2]}>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshStandardMaterial color="#4a7c9e" />
          </mesh>
          
          {/* Base pair connections (every 5th point) */}
          {i % 5 === 0 && (
            <>
              <mesh position={[(point.x1 + point.x2) / 2, point.y, (point.z1 + point.z2) / 2]}>
                <cylinderGeometry args={[0.05, 0.05, Math.sqrt(Math.pow(point.x2 - point.x1, 2) + Math.pow(point.z2 - point.z1, 2)), 8]} />
                <meshStandardMaterial color="#6ba3c7" />
              </mesh>
            </>
          )}
        </group>
      ))}
      
      {/* Ambient light effect */}
      <pointLight position={[0, 0, 0]} intensity={0.5} color="#ffffff" />
    </group>
  )
}

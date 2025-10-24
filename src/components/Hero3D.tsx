import { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Environment, useGLTF } from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";

function Car() {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const { scene } = useGLTF("/models/sedan.glb");

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle idle animation
      groupRef.current.rotation.y += 0.002;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
  });

  return (
    <group
      ref={groupRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={hovered ? 1.8 : 1.6}
      position={[0, -0.5, 0]}
    >
      <primitive object={scene.clone()} />
      
      {/* Headlight spotlights */}
      <spotLight
        position={[1.8, 0.4, 0.5]}
        angle={0.5}
        penumbra={0.5}
        intensity={0.8}
        color="#f97316"
        target-position={[5, 0, 0]}
        castShadow
      />
      <spotLight
        position={[1.8, 0.4, -0.5]}
        angle={0.5}
        penumbra={0.5}
        intensity={0.8}
        color="#f97316"
        target-position={[5, 0, 0]}
        castShadow
      />
    </group>
  );
}

function Scene() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[5, 2.5, 5]} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2}
        autoRotate
        autoRotateSpeed={0.5}
      />
      
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <pointLight position={[-10, -5, -10]} intensity={0.3} />
      
      <Environment preset="city" />
      
      <Car />
      
      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.8, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial
          color="#0a0f1a"
          metalness={0.8}
          roughness={0.2}
          opacity={0.5}
          transparent
        />
      </mesh>
    </>
  );
}

export function Hero3D() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="glass-card relative h-[400px] overflow-hidden rounded-2xl"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20" />
      
      <Canvas shadows dpr={[1, 2]}>
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>

      {/* Overlay info */}
      <div className="absolute bottom-6 left-6 right-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="glass-card rounded-xl p-4"
        >
          <h3 className="mb-1 text-lg font-bold">2024 Luxury Sedan</h3>
          <p className="text-sm text-muted-foreground">Latest model in inventory</p>
        </motion.div>
      </div>
    </motion.div>
  );
}

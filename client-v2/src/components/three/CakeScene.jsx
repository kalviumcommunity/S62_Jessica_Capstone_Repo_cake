import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Environment } from '@react-three/drei';
import CakeModel from './CakeModel';

export default function CakeScene({
  layers = [],
  frostingColor,
  sideFrosting = false,
  toppings = [],
  setToppings,
  selectedTopping,
}) {
  return (
    <div className="w-full h-full rounded-2xl overflow-hidden bg-gradient-to-b from-cream-100 to-cream-200">
      <Canvas
        shadows
        camera={{ position: [0, 6, 14], fov: 45 }}
        gl={{ antialias: true, toneMapping: 3, toneMappingExposure: 1.1 }}
      >
        {/* Environment */}
        <Environment preset="studio" />
        <fog attach="fog" args={['#fdf8f0', 20, 45]} />

        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[8, 12, 8]}
          intensity={1.5}
          castShadow
          shadow-mapSize={[1024, 1024]}
          shadow-camera-left={-5}
          shadow-camera-right={5}
          shadow-camera-top={5}
          shadow-camera-bottom={-5}
        />
        <directionalLight position={[-6, 8, -6]} intensity={0.4} color="#ffd4e5" />

        {/* Cake */}
        <CakeModel
          layers={layers}
          frostingColor={frostingColor}
          sideFrosting={sideFrosting}
          toppings={toppings}
          setToppings={setToppings}
          selectedTopping={selectedTopping}
        />

        {/* Ground shadow */}
        <ContactShadows
          position={[0, -0.2, 0]}
          opacity={0.3}
          scale={15}
          blur={2.5}
          far={6}
        />

        {/* Ground plane */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.25, 0]} receiveShadow>
          <planeGeometry args={[40, 40]} />
          <meshStandardMaterial color="#f5f0eb" roughness={0.9} />
        </mesh>

        {/* Controls */}
        <OrbitControls
          enablePan={false}
          minDistance={6}
          maxDistance={25}
          minPolarAngle={Math.PI * 0.15}
          maxPolarAngle={Math.PI / 2.1}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}

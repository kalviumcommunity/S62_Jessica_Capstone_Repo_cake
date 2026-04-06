import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import CakeModel from "./CakeModel";

export default function CakeScene({
  layers = [],
  frostingColor,
  sideFrosting = false,
  toppings = [],
  setToppings,
  selectedTopping,
  setSelectedTopping
}) {

  return (
    <div style={{ width: "100%", height: "100%" }}>

      <Canvas
        shadows
        camera={{ position: [0, 8, 18], fov: 50 }}

        // 🔥 FINAL FIX (safe click handling)
        onPointerDown={(event) => {
          if (!selectedTopping) return;

          // ✅ prevent crash when clicking empty space
          if (!event.point) return;

          const { x, y, z } = event.point;

          setToppings((prev) => [
            ...prev,
            {
              id: Date.now(),
              type: selectedTopping,
              position: [x, y + 0.2, z]
            }
          ]);

          if (setSelectedTopping) {
            setSelectedTopping(null);
          }
        }}
      >

        {/* Lighting */}
        <ambientLight intensity={0.7} />

        <directionalLight
          position={[10, 15, 10]}
          intensity={1.2}
          castShadow
        />

        <directionalLight
          position={[-10, 10, -10]}
          intensity={0.4}
        />

        {/* Cake */}
        <CakeModel
          layers={layers}
          frostingColor={frostingColor}
          sideFrosting={sideFrosting}
          toppings={toppings}
        />

        {/* Platform */}
        <mesh position={[0, -0.4, 0]} receiveShadow>
          <cylinderGeometry args={[12, 12, 0.8, 64]} />
          <meshStandardMaterial color="#d9d9d9" />
        </mesh>

        {/* Controls */}
        <OrbitControls
          enablePan={false}
          enableRotate={!selectedTopping}
          enableZoom={true}
          minDistance={4}
          maxDistance={30}
          maxPolarAngle={Math.PI / 2.2}
        />

      </Canvas>

    </div>
  );
}
import { useRef, useEffect, useMemo } from 'react';
import * as THREE from 'three';

/* ─────────────── Topping Sub-Components ─────────────── */

function Strawberry({ position }) {
  return (
    <group position={position}>
      <mesh castShadow>
        <coneGeometry args={[0.2, 0.35, 8]} />
        <meshPhysicalMaterial color="#d62828" roughness={0.4} clearcoat={0.6} />
      </mesh>
      {/* Leaf */}
      <mesh position={[0, 0.2, 0]} rotation={[0, 0, Math.PI * 0.15]}>
        <boxGeometry args={[0.18, 0.04, 0.08]} />
        <meshStandardMaterial color="#2d6a4f" />
      </mesh>
    </group>
  );
}

function ChocolateChunk({ position }) {
  return (
    <mesh position={position} castShadow rotation={[0.3, 0.5, 0.1]}>
      <boxGeometry args={[0.3, 0.15, 0.25]} />
      <meshPhysicalMaterial color="#3b1f16" roughness={0.6} clearcoat={0.3} />
    </mesh>
  );
}

function Candle({ position }) {
  return (
    <group position={position}>
      {/* Stick */}
      <mesh position={[0, 0.3, 0]} castShadow>
        <cylinderGeometry args={[0.06, 0.06, 0.6, 12]} />
        <meshPhysicalMaterial
          color="#fff5ee"
          roughness={0.3}
          clearcoat={0.8}
        />
      </mesh>
      {/* Stripe */}
      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.065, 0.065, 0.6, 12, 1, true]} />
        <meshStandardMaterial
          color="#f43f5e"
          transparent
          opacity={0.4}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Flame */}
      <mesh position={[0, 0.65, 0]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial
          color="#ff9500"
          emissive="#ff6b00"
          emissiveIntensity={2}
        />
      </mesh>
      {/* Flame glow */}
      <pointLight position={[0, 0.7, 0]} color="#ff9500" intensity={0.5} distance={2} />
    </group>
  );
}

function Candy({ position }) {
  return (
    <mesh position={position} castShadow>
      <sphereGeometry args={[0.15, 24, 24]} />
      <meshPhysicalMaterial
        color="#ff66c4"
        roughness={0.2}
        clearcoat={0.9}
        clearcoatRoughness={0.1}
        metalness={0.1}
      />
    </mesh>
  );
}

/* ─────────────── Topping Registry ─────────────── */

const TOPPING_COMPONENTS = {
  strawberry: Strawberry,
  chocolate: ChocolateChunk,
  candle: Candle,
  candy: Candy,
};

/* ─────────────── Main Cake Model ─────────────── */

const FLAVOR_COLORS = {
  chocolate: '#5c3d26',
  vanilla: '#f5e6c8',
  strawberry: '#f8a4b8',
  'red velvet': '#8b2232',
};

export default function CakeModel({
  layers = [],
  frostingColor = '#ffb6c1',
  sideFrosting = false,
  toppings = [],
  setToppings,
  selectedTopping,
}) {
  const LAYER_HEIGHT = 1.2;
  const CAKE_RADIUS = 2.8;
  const FROSTING_THICKNESS = 0.25;
  const cakeHeight = layers.length * LAYER_HEIGHT;

  const handleCakeClick = (event) => {
    if (!selectedTopping || !setToppings) return;
    event.stopPropagation();

    const { x, z } = event.point;
    // Constrain toppings to cake radius
    const dist = Math.sqrt(x * x + z * z);
    const maxR = CAKE_RADIUS - 0.3;
    const scale = dist > maxR ? maxR / dist : 1;

    const y = cakeHeight + FROSTING_THICKNESS + 0.15;

    setToppings((prev) => [
      ...prev,
      { type: selectedTopping, position: [x * scale, y, z * scale] },
    ]);
  };

  return (
    <group>

      {/* ── Cake Board ── */}
      <mesh position={[0, -0.1, 0]} receiveShadow>
        <cylinderGeometry args={[3.6, 3.6, 0.2, 64]} />
        <meshPhysicalMaterial
          color="#f5f0eb"
          roughness={0.4}
          clearcoat={0.3}
          metalness={0.05}
        />
      </mesh>
      {/* Board edge */}
      <mesh position={[0, -0.05, 0]}>
        <torusGeometry args={[3.6, 0.06, 8, 64]} />
        <meshStandardMaterial color="#e8ddd5" metalness={0.3} roughness={0.5} />
      </mesh>

      {/* ── Cake Layers ── */}
      {layers.map((layer, index) => {
        const y = index * LAYER_HEIGHT + LAYER_HEIGHT / 2;
        const radius = CAKE_RADIUS - index * 0.05; // slight taper per layer
        const color = FLAVOR_COLORS[layer.flavor] || FLAVOR_COLORS.chocolate;

        return (
          <group key={index}>
            {/* Main layer */}
            <mesh
              position={[0, y, 0]}
              castShadow
              receiveShadow
              onClick={handleCakeClick}
            >
              <cylinderGeometry args={[radius, radius, LAYER_HEIGHT, 64]} />
              <meshPhysicalMaterial
                color={color}
                roughness={0.75}
                clearcoat={0.1}
              />
            </mesh>

            {/* Thin filling line between layers */}
            {index > 0 && (
              <mesh position={[0, index * LAYER_HEIGHT + 0.02, 0]}>
                <cylinderGeometry args={[radius + 0.01, radius + 0.01, 0.04, 64]} />
                <meshPhysicalMaterial
                  color={frostingColor}
                  roughness={0.3}
                  clearcoat={0.5}
                />
              </mesh>
            )}
          </group>
        );
      })}

      {/* ── Side Frosting ── */}
      {sideFrosting && (
        <mesh
          position={[0, cakeHeight / 2, 0]}
          castShadow
          onClick={handleCakeClick}
        >
          <cylinderGeometry
            args={[CAKE_RADIUS + 0.06, CAKE_RADIUS + 0.06, cakeHeight, 64, 1, true]}
          />
          <meshPhysicalMaterial
            color={frostingColor}
            side={THREE.DoubleSide}
            roughness={0.25}
            clearcoat={0.7}
            clearcoatRoughness={0.3}
          />
        </mesh>
      )}

      {/* ── Top Frosting ── */}
      <mesh
        position={[0, cakeHeight + FROSTING_THICKNESS / 2, 0]}
        castShadow
        onClick={handleCakeClick}
      >
        <cylinderGeometry args={[CAKE_RADIUS + 0.06, CAKE_RADIUS + 0.06, FROSTING_THICKNESS, 64]} />
        <meshPhysicalMaterial
          color={frostingColor}
          roughness={0.2}
          clearcoat={0.8}
          clearcoatRoughness={0.2}
        />
      </mesh>

      {/* ── Toppings ── */}
      {toppings.map((topping, index) => {
        const Component = TOPPING_COMPONENTS[topping.type];
        if (!Component) return null;
        return <Component key={index} position={topping.position || [0, 0, 0]} />;
      })}

    </group>
  );
}

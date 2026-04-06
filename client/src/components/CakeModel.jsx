export default function CakeModel({
  layers = [],
  frostingColor,
  sideFrosting = false,
  toppings = []
}) {

  const getColor = (flavor) => {
    if (flavor === "chocolate") return "#4b2e1f";
    if (flavor === "vanilla") return "#f3e5ab";
    if (flavor === "strawberry") return "#ffb6c1";
    return "#4b2e1f";
  };

  const layerHeight = 1.5;
  const frostingHeight = 0.4;
  const cakeHeight = layers.length * layerHeight;

  // 🔥 Better radius control
  const baseRadius = 1.2;

  return (
    <group>

      {/* Cake board */}
      <mesh position={[0, -0.15, 0]} receiveShadow>
        <cylinderGeometry args={[3.4, 3.4, 0.3, 64]} />
        <meshStandardMaterial color="#e0e0e0" />
      </mesh>

      {/* Cake layers */}
      {layers.map((layer, index) => {
        const y = index * layerHeight + layerHeight / 2;

        return (
          <mesh key={index} position={[0, y, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[3, 3, layerHeight, 64]} />
            <meshStandardMaterial
              color={getColor(layer.flavor)}
              roughness={0.8}
            />
          </mesh>
        );
      })}

      {/* Side frosting */}
      {sideFrosting && (
        <mesh position={[0, cakeHeight / 2, 0]} castShadow>
          <cylinderGeometry args={[3.05, 3.05, cakeHeight, 64, 1, true]} />
          <meshStandardMaterial
            color={frostingColor}
            side={2}
            roughness={0.4}
          />
        </mesh>
      )}

      {/* Top frosting */}
      <mesh
        position={[0, cakeHeight + frostingHeight / 2, 0]}
        castShadow
      >
        <cylinderGeometry args={[3.05, 3.05, frostingHeight, 64]} />
        <meshStandardMaterial
          color={frostingColor}
          roughness={0.4}
        />
      </mesh>

      {/* 🎂 TOPPINGS */}
      {toppings.map((topping, index) => {

        // 🔥 Smart placement
        let x = 0;
        let z = 0;

        if (toppings.length === 1) {
          x = 0;
          z = 0;
        } else {
          const angle = (index / toppings.length) * Math.PI * 2;
          x = baseRadius * Math.cos(angle);
          z = baseRadius * Math.sin(angle);
        }

        // 🔥 ALWAYS ABOVE CAKE (visible)
        const y = cakeHeight + frostingHeight + 0.35;

        if (topping.type === "strawberry") {
          return (
            <mesh key={topping.id} position={[x, y, z]}>
              <sphereGeometry args={[0.3, 32, 32]} />
              <meshStandardMaterial color="#d62828" />
            </mesh>
          );
        }

        if (topping.type === "chocolate") {
          return (
            <mesh key={topping.id} position={[x, y, z]}>
              <boxGeometry args={[0.4, 0.2, 0.4]} />
              <meshStandardMaterial color="#3b1f16" />
            </mesh>
          );
        }

        if (topping.type === "candle") {
          return (
            <group key={topping.id} position={[x, y, z]}>
              <mesh position={[0, 0.3, 0]}>
                <cylinderGeometry args={[0.08, 0.08, 0.7, 16]} />
                <meshStandardMaterial color="white" />
              </mesh>

              <mesh position={[0, 0.75, 0]}>
                <sphereGeometry args={[0.08, 16, 16]} />
                <meshStandardMaterial color="orange" />
              </mesh>
            </group>
          );
        }

        if (topping.type === "candy") {
          return (
            <mesh key={topping.id} position={[x, y, z]}>
              <sphereGeometry args={[0.25, 32, 32]} />
              <meshStandardMaterial color="#ff66c4" />
            </mesh>
          );
        }

        return null;
      })}

    </group>
  );
}
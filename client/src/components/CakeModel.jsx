export default function CakeModel({
  layers = [],
  frostingColor,
  sideFrosting = false,
  toppings = [],
  setToppings,
  selectedTopping
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

  // 🟢 Handle clicking on cake
  const handleCakeClick = (event) => {

    if (!selectedTopping || !setToppings) return;

    event.stopPropagation();

    const { x, z } = event.point;

    const y = cakeHeight + frostingHeight + 0.2;

    setToppings(prev => [
      ...prev,
      {
        type: selectedTopping,
        position: [x, y, z]
      }
    ]);
  };

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
          <mesh
            key={index}
            position={[0, y, 0]}
            castShadow
            receiveShadow
            onClick={handleCakeClick}
          >
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
        <mesh
          position={[0, cakeHeight / 2, 0]}
          castShadow
          onClick={handleCakeClick}
        >
          <cylinderGeometry
            args={[3.05, 3.05, cakeHeight, 64, 1, true]}
          />
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
        onClick={handleCakeClick}
      >
        <cylinderGeometry args={[3.05, 3.05, frostingHeight, 64]} />
        <meshStandardMaterial
          color={frostingColor}
          roughness={0.4}
        />
      </mesh>

      {/* Render toppings */}
      {toppings.map((topping, index) => {

        const [x, y, z] = topping.position || [0,0,0];

        if (topping.type === "strawberry") {
          return (
            <mesh key={index} position={[x, y, z]}>
              <sphereGeometry args={[0.28, 32, 32]} />
              <meshStandardMaterial color="#d62828" />
            </mesh>
          );
        }

        if (topping.type === "chocolate") {
          return (
            <mesh key={index} position={[x, y, z]}>
              <boxGeometry args={[0.35, 0.15, 0.35]} />
              <meshStandardMaterial color="#3b1f16" />
            </mesh>
          );
        }

        if (topping.type === "candle") {
          return (
            <group key={index} position={[x, y, z]}>

              <mesh position={[0,0.2,0]}>
                <cylinderGeometry args={[0.08,0.08,0.6,16]} />
                <meshStandardMaterial color="white"/>
              </mesh>

              <mesh position={[0,0.55,0]}>
                <sphereGeometry args={[0.07,16,16]} />
                <meshStandardMaterial color="orange"/>
              </mesh>

            </group>
          );
        }

        if (topping.type === "candy") {
          return (
            <mesh key={index} position={[x, y, z]}>
              <sphereGeometry args={[0.2, 32, 32]} />
              <meshStandardMaterial color="#ff66c4" />
            </mesh>
          );
        }

        return null;

      })}

    </group>
  );
}
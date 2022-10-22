import { useBox } from "@react-three/cannon";
import * as textures from "../images/textures";
import { useStore } from "../hooks/useStore";
import { useState } from "react";

export const Cube = ({ position, texture }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [ref] = useBox(() => ({
    type: "Static",
    position,
  }));

  const state = useStore();

  const [addCube, removeCube] = [state.addCube, state.removeCube];

  const activeTexture = textures[texture + "Texture"];

  const detColour = (isHovered, texture) => {
    if (isHovered) return "black";

    switch (texture) {
      case "copper":
        return "#bc7255";
      case "iron":
        return "gray";
      default:
        return "white";
    }
  };

  return (
    <mesh
      onPointerMove={(e) => {
        e.stopPropagation();
        setIsHovered(true);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setIsHovered(false);
      }}
      onClick={(e) => {
        e.stopPropagation();
        const clickedFace = Math.floor(e.faceIndex / 2);
        const { x, y, z } = ref.current.position;

        if (e.altKey) {
          removeCube(x, y, z);
          return;
        }

        switch (clickedFace) {
          case 0:
            addCube(x + 1, y, z);
            return;
          case 1:
            addCube(x - 1, y, z);
            return;
          case 2:
            addCube(x, y + 1, z);
            return;
          case 3:
            addCube(x, y - 1, z);
            return;
          case 4:
            addCube(x, y, z + 1);
            return;
          case 5:
            addCube(x, y, z - 1);
            return;
        }
      }}
      ref={ref}
    >
      <boxBufferGeometry attach="geometry" />

      {"dirt" === texture && (
        <meshStandardMaterial
          attach="material"
          color={isHovered ? "grey" : "white"}
          map={activeTexture}
        />
      )}
      {"glass" === texture && (
        <meshStandardMaterial
          attach="material"
          color={isHovered ? "grey" : "white"}
          transparent
          opacity={0.7}
        />
      )}
      {"wood" === texture && (
        <meshPhongMaterial
          attach="material"
          shininess={5}
          emissive="000000"
          color={detColour(isHovered, texture)}
          reflectivity={1}
          refractionRatio={0.98}
          map={activeTexture}
        />
      )}
      {["iron", "copper"].includes(texture) && (
        <meshPhongMaterial
          attach="material"
          shininess={30}
          emissive="000000"
          color={detColour(isHovered, texture)}
          reflectivity={1}
          refractionRatio={0.98}
        />
      )}
    </mesh>
  );
};

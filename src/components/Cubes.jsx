import { useStore } from "../hooks/useStore";
import { Cube } from "./Cube";

export const Cubes = () => {
  const cubes = useStore().cubes;

  return cubes.map(({ key, position, texture }) => {
    return <Cube key={key} position={position} texture={texture} />;
  });
};

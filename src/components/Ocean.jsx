import { useThree } from "@react-three/fiber";
import { Fog } from "three";

export const Ocean = () => {
  const { scene } = useThree();

  scene.fog = new Fog("black");
};

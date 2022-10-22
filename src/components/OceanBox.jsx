import { useThree } from "@react-three/fiber";
import { CubeTextureLoader } from "three";
import topImage from "../images/top.png";
import bottomImage from "../images/bottom.png";
import xImage from "../images/x.png";
import { useEffect } from "react";

export function OceanBox() {
  const { scene } = useThree();
  const loader = new CubeTextureLoader();

  useEffect(() => {
    const texture = loader.load([
      xImage,
      xImage,
      topImage,
      bottomImage,
      xImage,
      xImage,
    ]);
    scene.background = texture;
  }, []);
}

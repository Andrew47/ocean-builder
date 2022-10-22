import { useThree } from "@react-three/fiber";
import { useKeyboard } from "../hooks/useKeyboard";
import { Vector3 } from "three";
import { useEffect } from "react";

export const FPV = () => {
  const actions = useKeyboard();
  const { camera, gl, scene } = useThree();

  const degToRad = (deg) => deg * (Math.PI / 180);

  console.log(camera);

  camera.rotation.order = "YXZ";

  useEffect(() => {
    camera.rotateOnAxis(new Vector3(0, 1, 0).normalize(), degToRad(180));
  }, []);

  const TURN_AMOUNT = 1;

  if (actions.turnLeft) {
    camera.rotateOnAxis(
      new Vector3(0, 1, 0).normalize(),
      degToRad(TURN_AMOUNT)
    );
  }

  if (actions.rollLeft) {
    camera.rotateOnAxis(
      new Vector3(0, 1, 1).normalize(),
      degToRad(TURN_AMOUNT)
    );
  }

  if (actions.rollRight) {
    camera.rotateOnAxis(
      new Vector3(0, -1, -1).normalize(),
      degToRad(TURN_AMOUNT)
    );
  }

  if (actions.turnRight) {
    camera.rotateOnAxis(
      new Vector3(0, 1, 0).normalize(),
      degToRad(-TURN_AMOUNT)
    );
  }

  if (actions.turnUp) {
    camera.rotateOnAxis(
      new Vector3(1, 0, 0).normalize(),
      degToRad(TURN_AMOUNT)
    );
  }
  if (actions.turnDown) {
    camera.rotateOnAxis(
      new Vector3(1, 0, 0).normalize(),
      degToRad(-TURN_AMOUNT)
    );
  }
};

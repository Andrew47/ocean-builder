import { useFrame, useThree } from "@react-three/fiber";
import { useSphere } from "@react-three/cannon";
import { Vector3 } from "three";
import { useEffect, useRef } from "react";
import { useKeyboard } from "../hooks/useKeyboard";

const SPEED = 5;

export const Player = () => {
  const actions = useKeyboard();

  const { camera } = useThree();

  const [ref, api] = useSphere(() => ({
    mass: 1,
    type: "Kinematic",
    position: [1, 0, -2],
  }));

  const vel = useRef([0, 0, 0]);
  useEffect(() => {
    api.velocity.subscribe((v) => (vel.current = v));
  }, [api.velocity]);

  const pos = useRef([0, 0, 0]);

  useEffect(() => {
    api.position.subscribe((p) => (pos.current = p));
  }, [api.position]);

  useFrame(() => {
    camera.position.copy(
      new Vector3(pos.current[0], pos.current[1], pos.current[2])
    );

    const direction = new Vector3(
      (actions.moveRight ? 1 : 0) - (actions.moveLeft ? 1 : 0),
      (actions.rise ? 1 : 0) - (actions.fall ? 1 : 0),
      (actions.moveBackward ? 1 : 0) - (actions.moveForward ? 1 : 0)
    );

    direction.normalize().multiplyScalar(SPEED).applyEuler(camera.rotation);

    api.velocity.set(direction.x, direction.y, direction.z);
  });

  return <mesh ref={ref}></mesh>;
};

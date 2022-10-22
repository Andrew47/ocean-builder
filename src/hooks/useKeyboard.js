import { useCallback, useEffect, useState } from "react";
import { useStore } from "./useStore";

function actionByKey(key) {
  const keyActionMap = {
    KeyW: "moveForward",
    KeyS: "moveBackward",
    KeyA: "moveLeft",
    KeyD: "moveRight",
    KeyX: "rise",
    KeyZ: "fall",
    KeyJ: "turnLeft",
    KeyL: "turnRight",
    KeyI: "turnUp",
    KeyK: "turnDown",
    KeyU: "rollLeft",
    KeyO: "rollRight",
    KeyV: "openCloseControls",
    Digit0: "notexture",
    Digit1: "dirt",
    Digit2: "iron",
    Digit3: "copper",
    Digit4: "wood",
    Digit5: "glass",
  };

  return keyActionMap[key];
}

export const useKeyboard = () => {
  const state = useStore();
  const [saveWorld, resetWorld] = [state.saveWorld, state.resetWorld];

  const [actions, setActions] = useState({
    moveForward: false,
    moveBackward: false,
    moveLeft: false,
    moveRight: false,
    rise: false,
    fall: false,
    notexture: false,
    dirt: false,
    iron: false,
    copper: false,
    wood: false,
    glass: false,
  });

  const handleKeyDown = useCallback((e) => {
    const action = actionByKey(e.code);

    if (action) {
      setActions((prev) => {
        return {
          ...prev,
          [action]: true,
        };
      });
    }
  }, []);

  const handleKeyUp = useCallback((e) => {
    if (e.code === "KeyT") {
      saveWorld();
    }

    if (e.code === "KeyR") {
      resetWorld();
    }

    const action = actionByKey(e.code);

    if (action) {
      setActions((prev) => {
        return {
          ...prev,
          [action]: false,
        };
      });
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  return actions;
};

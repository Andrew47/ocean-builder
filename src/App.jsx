import React, { useState, useCallback } from "react";
import { ReactComponent as Logo } from "./assets/fullLogo.svg";

import { Physics } from "@react-three/cannon";
import { Canvas } from "@react-three/fiber";
import { Player } from "./components/Player";
import { FPV } from "./components/FPV";
import { Cubes } from "./components/Cubes";
import { Menu } from "./components/Menu";
import { OceanBox } from "./components/OceanBox";
import { ContextProvider } from "./hooks/useStore";

function App() {
  const [isLanding, setIsLanding] = useState(true);

  const beginWorld = useCallback(() => setIsLanding(false));

  if (isLanding) {
    return (
      <div className="landingPage">
        <Logo />
        <button onClick={beginWorld}>Begin</button>
      </div>
    );
  }

  return (
    <ContextProvider>
      <Canvas id="canvas">
        <ambientLight intensity={0.75} color="#d4fcf9" />
        <pointLight position={[1, 0.25, 1]} />
        <FPV />
        <Physics>
          <Player />
          <Cubes />
        </Physics>
        <OceanBox />
      </Canvas>
      <Menu />
    </ContextProvider>
  );
}

export default App;

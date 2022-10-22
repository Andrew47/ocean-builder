import { useState, useEffect } from "react";
import { useStore } from "../hooks/useStore";
import { useKeyboard } from "../hooks/useKeyboard";

export const Menu = () => {
  const [visible, setVisible] = useState(false);
  const state = useStore();
  const [activeTexture, setTexture] = [state.texture, state.setTexture];
  const { dirt, iron, copper, wood, glass, notexture } = useKeyboard();
  const actions = useKeyboard();
  const textures = { notexture, dirt, iron, copper, wood, glass };

  useEffect(() => {
    const pressedTexture = Object.entries(textures).find(([k, v]) => v);

    if (pressedTexture) {
      setTexture(pressedTexture[0]);
    }
  }, [setTexture, dirt, iron, copper, wood, glass, notexture]);

  useEffect(() => {
    setVisible((prev) => (actions.openCloseControls ? !prev : prev));
  }, [actions.openCloseControls]);

  const actionText = () => {
    switch (true) {
      case actions.rise:
        return "ascend";
      case actions.fall:
        return "descend";
      case actions.moveForward:
        return "forwards";
      case actions.moveBackward:
        return "reverse";
      case actions.moveLeft:
        return "move left";
      case actions.moveRight:
        return "move right";
      case actions.turnUp:
        return "pitch up";
      case actions.turnDown:
        return "pitch down";
      case actions.turnLeft:
        return "yaw left";
      case actions.turnRight:
        return "yaw right";
      case actions.rollLeft:
        return "roll left";
      case actions.rollRight:
        return "roll right";
      default:
        return "";
    }
  };

  return visible ? (
    <div className="absolute bottom-left guide">
      <div className="controls text-normal">
        <div className="move-guide">
          <div className="label">Movement</div>
          <br />
          <div className="d-pad">
            <div />
            <div className="knob">w</div>
            <div />
            <div className="knob">a</div>
            <div />
            <div className="knob">d</div>
            <div />
            <div className="knob">s</div>
            <div />
          </div>
        </div>
        <div>
          <div>
            <div className="label">Height</div>
            <br />
            <div className="height-controls">
              <div className="knob">x</div>
              <div className="knob">z</div>
              <div className="action-text">{actionText()}</div>
            </div>
          </div>
        </div>
        <div className="rotate-guide">
          <div className="label">Rotation</div>
          <br />
          <div className="d-pad">
            <div className="knob">u</div>
            <div className="knob">i</div>
            <div className="knob">o</div>
            <div className="knob">j</div>
            <div />
            <div className="knob">l</div>
            <div />
            <div className="knob">k</div>
            <div />
          </div>
        </div>
      </div>
      <div className="system-controls text-normal">
        <div className="label">System</div>
        <div>Save (t)</div>
        <div>Reset (r)</div>
        <div>Delete Block (Alt Click)</div>
      </div>
      <div className="texture-selector">
        <div className="text-normal label">Selected Texture</div>
        {Object.keys(textures).map((k, i) => (
          <div
            className={
              activeTexture === k
                ? "active texture-icon relative"
                : "texture-icon relative"
            }
            key={k}
          >
            <div className="absolute centered text-texture">
              <div>{i}</div> <div>{k === "notexture" ? "none" : k}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-normal"> Close instructions by pressing v</div>
    </div>
  ) : (
    <div className="absolute bottom-left guide text-normal">
      Open instructions by pressing v
    </div>
  );
};

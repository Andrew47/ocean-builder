import { nanoid } from "nanoid";
import { createContext, useReducer, useContext } from "react";

const Context = createContext();

const LOCAL_STORAGE_KEY = "TEST_CUBES";

const FIRST_CUBE = {
  key: nanoid(),
  position: [1, -0.5, 1],
  texture: "dirt",
  cannotDelete: true,
};

const initialState = {
  texture: "dirt",
  cubes: JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEY)) || [
    FIRST_CUBE,
  ],
};

const reducer = (state, action) => {
  let x, y, z;
  switch (action.type) {
    case "ADD_CUBE":
      if (state.texture === "notexture") return state;
      [x, y, z] = action.inputs;
      return {
        ...state,
        cubes: [
          ...state.cubes,
          {
            key: nanoid(),
            position: [x, y, z],
            texture: state.texture,
          },
        ],
      };
    case "REMOVE_CUBE":
      [x, y, z] = action.inputs;
      return {
        ...state,
        cubes: state.cubes.filter((cube) => {
          const [X, Y, Z] = cube.position;
          return X !== x || Y !== y || Z !== z || cube.cannotDelete;
        }),
      };
    case "SET_TEXTURE":
      const texture = action.inputs;
      return {
        ...state,
        texture,
      };
    case "RESET_WORLD":
      return {
        ...state,
        cubes: [FIRST_CUBE],
      };
    case "SAVE_WORLD":
      window.localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify(state.cubes)
      );
      return state;
    default:
      return state;
  }
};

const ContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <Context.Provider value={{ state, dispatch }} {...props} />;
};

function useStore() {
  let { state, dispatch } = useContext(Context);

  return {
    texture: state.texture,
    cubes: state.cubes,
    addCube: (x, y, z) => dispatch({ type: "ADD_CUBE", inputs: [x, y, z] }),
    removeCube: (x, y, z) =>
      dispatch({ type: "REMOVE_CUBE", inputs: [x, y, z] }),
    setTexture: (texture) => dispatch({ type: "SET_TEXTURE", inputs: texture }),
    saveWorld: () => dispatch({ type: "SAVE_WORLD" }),
    resetWorld: () => dispatch({ type: "RESET_WORLD" }),
  };
}

export { ContextProvider, useStore };

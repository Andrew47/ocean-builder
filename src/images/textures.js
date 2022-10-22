import { TextureLoader, NearestFilter } from "three";

import { dirtImg, woodImg } from "./images";

const dirtTexture = new TextureLoader().load(dirtImg);
const woodTexture = new TextureLoader().load(woodImg);

// Magnification filter specifies how the textured pixels are smaller than the area of one texture element
// Minification filter when textured pixel greater than one texture element
dirtTexture.magFilter = NearestFilter;
woodTexture.magFilter = NearestFilter;

export { dirtTexture, woodTexture };

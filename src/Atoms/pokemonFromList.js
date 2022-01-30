import { atom } from "recoil";

const pokemonFromList = atom({
  key: "pokemonFromList",
  default: {
    name: "pokemon",
    height: "",
    id: Number,
    svg: "",
    sprites: {
      other: {
        dream_world: {
          front_default: "",
        },
      },
    },
    types: [
      {
        type: {
          name: "",
          url: true,
        },
      },
    ],
  },
});

export default pokemonFromList;

import { atom } from "recoil";

const listApiUrlAtom = atom({
  key: "listApiUrlAtom",
  default: {
    url: "https://pokeapi.co/api/v2/pokemon?limit=21",
    type: false,
  },
});

export default listApiUrlAtom;

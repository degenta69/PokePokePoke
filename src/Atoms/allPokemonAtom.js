import { atom } from "recoil";

const allPokemonAtom = atom({
  key: "allPokemonAtom",
  default: [{url:''}]
});

export default allPokemonAtom;

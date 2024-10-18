import Image from "next/image";
import PokemonViewer from "./components/pkmn-api";
import Clima from "./components/clima";
import Consejos from "./components/consejos";

export default function Home() {
  return (
    <div className="flex m-4">
      <PokemonViewer />
      <div className="border-r border-gray-300 mx-4"></div>
      <Clima />
      <div className="border-r border-gray-300 mx-4"></div>
      <Consejos />
    </div>
  );
}

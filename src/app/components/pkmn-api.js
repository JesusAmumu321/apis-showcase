"use client"; // le decimos que es del lado del cliente

import React, { useState, useEffect } from "react"; // los hooks necesarios

export default function PokemonViewer() {
  const [pokemon, setPokemon] = useState(null); // almacena el pokemon
  const [loading, setLoading] = useState(true); // carga
  const [error, setError] = useState(""); // manejo de errores

  const fetchPokemon = async () => {
    setLoading(true); // cargando
    setError(""); // resetea el estado del error (si hay )
    try {
      const randomId = Math.floor(Math.random() * 1008) + 1; // pokemon aleatorio
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${randomId}`
      );
      const data = await response.json(); // lit una propuesta
      setPokemon(data); // coloca los datos del pkmn
    } catch (err) {
      setError("Error al cargar el pokemaniaco");
    } finally {
      setLoading(false); // para que se quite la "animación" de cargando pokemon
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []); // se ejecuta una vez al cargar el componente

  if (loading) return <div>Cargando pokemon aleatorio</div>; // lit la "animacion " de carga
  if (error) return <div>{error}</div>; // si hay un error, lo muestra

  return (
    <div className="w-[300px] border-2 border-amber-400 rounded-lg p-4 m-4">
      <div className="mb-4">
        <h2 className="text-2xl capitalize">{pokemon.name}</h2> {/* nombre pokemon */}
      </div>
      <div className="p-2">
        <div className="flex"> {/* los sprites son las fotos de enfrente y atras */}
          <img
            src={pokemon.sprites.back_default}
            alt={pokemon.name}
            className="w-32 h-32 mx-auto my-auto"
          />
          <div className="border-r border-gray-300 mx-4"></div>
          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            className="w-32 h-32 mx-auto my-auto"
          />
        </div>

        <div className="flex gap-2 mt-4">
          {pokemon.types.map((type) => ( // funcion para el tpo de puchamon
            <span
              key={type.type.name} // fondo y color del tipo
              className="px-3 py-1 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-800 cursor-default"
            >
              {type.type.name} {/* tipo xd */}
            </span>
          ))}
        </div>
        <button
          type="button"
          className="border-2 border-gray-800 rounded-lg px-3 py-2 text-gray-400 cursor-pointer hover:bg-gray-800 hover:text-gray-200 mt-3"
          onClick={fetchPokemon}
        >
          Otro pkmn
        </button>
      </div>
    </div>
  );
}

"use client";
// https://api.adviceslip.com/
import React, { useState, useEffect } from "react";

export default function Consejos() {
  const [consejo, setConsejo] = useState(null); // almacena el consejo el use state null es porque daba problemas
  const [loading, setLoading] = useState(true); // carga
  const obtenerConsejo = async () => {
    setLoading(true);
    try {
      const respuesta = await fetch("https://api.adviceslip.com/advice");
      const datos = await respuesta.json();
      setConsejo(datos.slip.advice); // coloca el consejo en el estado
    } catch (error) {
      console.error("Error: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerConsejo();
  }, []); // obtiene el consejo cuando se carga

  if (loading) return <div>&nbsp;&nbsp;&nbsp;Cargando consejo...</div>; // cargando

  return (
    <div className="w-[300px] border-2 border-amber-400 rounded-lg p-4 m-4">
      <h2 className="text-2xl mb-4 capitalize">Consejo</h2>
      <p className="text-lg mb-4">{consejo}</p>
      <button
        onClick={obtenerConsejo}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        Obtener nuevo consejo
      </button>
    </div>
  );
}

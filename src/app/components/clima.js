"use client";
import React, { useState, useEffect } from "react";

export default function Clima() {
  const [clima, setWeather] = useState(null); // almacena el clima el use state null es porque daba problemas
  const [loading, setLoading] = useState(true); // carga
  const [error, setError] = useState(""); // posibles erroes

  const fetchWeather = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        // propuesta
        `https://api.openweathermap.org/data/2.5/weather?q=Mexico&appid=fe9c854bc2f864a1f62db4d8b7bfea5c&units=metric`
      );
      const data = await response.json(); // el json de la respuesta se guarda aqui para mostrar la info
      if (response.ok) {
        setWeather(data);
      } else {
        setError("Se acabaron las response del dia XD");
      }
    } catch (err) {
      setError("Error de red");
    } finally {
      setLoading(false); // quitar carga
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []); // se ejecuta una vez al cargar el componente

  if (loading) return <div>&nbsp;&nbsp;&nbsp;Cargando clima...</div>; // cargando
  if (error) return <div>{error}</div>; // error, si hay

  return (
    <div className="w-[300px] border-2 border-amber-400 rounded-lg p-4 m-4">
      <div>
        <h2 className="text-2xl capitalize">Clima en {clima.name}</h2>
        <p className="m-2 px-3 py-1 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-800 cursor-default">
          Temperatura: {clima.main.temp}°C
        </p>
        <p className="m-2 px-3 py-1 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-800 cursor-default">
          Humedad: {clima.main.humidity}%
        </p>
        <p className="m-2 px-3 py-1 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-800 cursor-default">
          Descripción: {clima.weather[0].description}
        </p>
      </div>
    </div>
  );
}

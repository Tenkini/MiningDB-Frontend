import React, { useState } from "react";
import axios from "axios";
import { getCookie } from "cookies-next";
const CambiarTipoPopup = ({ usuario, onClose, onChangeTipo }) => {
  const [nuevoTipo, setNuevoTipo] = useState("");
  const [error, setError] = useState("");

  const tiposUsuario = ["Administrador", "Visita"];

  const handleTipoChange = (event) => {
    setNuevoTipo(event.target.value);
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(nuevoTipo);
    console.log(usuario.tipo);
    if (nuevoTipo === usuario.tipo) {
      setError("El tipo seleccionado es el mismo que el actual.");
    } else if (nuevoTipo.trim() === "") {
      setError("Por favor, selecciona un tipo de usuario válido.");
    } else {
      
      try {
        const url = `${process.env.NEXT_PUBLIC_API_URL}root/changeUserType`;
        const response = await axios.post(
          url,
          {
            email: usuario.correo,
            type: nuevoTipo,
          },
          {
            headers: {
              "Access-Control-Allow-Origin": "*", // Permitir cualquier origen
              "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE", // Métodos HTTP permitidos
              "Access-Control-Allow-Headers": "Content-Type, Authorization", // Encabezados permitidos
              Authorization: `${getCookie("token")}`,
            },
          }
        );
        onChangeTipo(nuevoTipo);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-gray-500 bg-opacity-75">
      <div className="bg-MainLight dark:bg-MainDark p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">Cambiar tipo de usuario</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Nuevo tipo:
            </label>
            <select
              value={nuevoTipo}
              onChange={handleTipoChange}
              className="border border-gray-400 rounded px-2 py-1 w-full"
            >
              <option value="">Selecciona un tipo de usuario</option>
              {tiposUsuario.map((tipo) => (
                <option value={tipo} key={tipo}>
                  {tipo}
                </option>
              ))}
            </select>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="text-sm font-medium text-gray-500 mr-4"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CambiarTipoPopup;

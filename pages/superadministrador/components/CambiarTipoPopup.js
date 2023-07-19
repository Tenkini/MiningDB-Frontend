import React, { useState } from "react";
import axios from "axios";
import { getCookie } from "cookies-next";
import PopupConfirmacion from "../../components/PopupConfirmacion";
const CambiarTipoPopup = ({ usuario, onClose, onChangeTipo }) => {
  const [nuevoTipo, setNuevoTipo] = useState({});
  const [nuevoTipo2, setNuevoTipo2] = useState("");
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const tiposUsuario = [{label: "Administrador", id: "admin"}, {label: "Visita", id: "guest"}];

  const handleTipoChange = (event) => {
    setNuevoTipo2(event.target.value === "guest" ? "Visita" : event.target.value === "admin" ? "Administrador" : event.target.value);
    setNuevoTipo(event.target.value);
    setError("");
  };

  const handleSubmit = async () => {
    console.log(nuevoTipo);
    console.log(nuevoTipo2);
    if (nuevoTipo2 === usuario.tipo) {
      setError("El tipo seleccionado es el mismo que el actual.");
    } else if (nuevoTipo2.trim() === "") {
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
        setShowPopup(true);
        if(nuevoTipo == "admin"){
          onChangeTipo("Administrador");
        }
        else if(nuevoTipo == "guest"){
          onChangeTipo("Visita");
        }
        
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-gray-500 bg-opacity-75">
      <div className="bg-MainLight dark:bg-MainDark p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">Cambiar tipo de usuario</h2>
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
                <option value={tipo.id} key={tipo.id}>
                  {tipo.label}
                </option>
              ))}
            </select>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
          <div className="flex justify-end">
          <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            onClick={handleSubmit}
            >
              Guardar
            </button> 
            <button
              type="button"
              className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={onClose}
            >
              Cancelar
            </button>
            
          </div>
      </div>
      {showPopup && (
        <PopupConfirmacion
          message="¡El tipo de usuario se ha cambiado correctamente!"
          onClose={() => setShowPopup(false)}
        />
      )}
    </div>
  );
};

export default CambiarTipoPopup;

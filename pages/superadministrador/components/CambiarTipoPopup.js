import React, { useState } from 'react';

const CambiarTipoPopup = ({ usuario, onClose, onChangeTipo }) => {
  const [nuevoTipo, setNuevoTipo] = useState('');
  const [error, setError] = useState('');

  const tiposUsuario = ['admin', 'visita'];

  const handleTipoChange = (event) => {
    setNuevoTipo(event.target.value);
    setError('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (nuevoTipo === usuario.tipo) {
      setError('El tipo seleccionado es el mismo que el actual.');
    } else if (nuevoTipo.trim() === '') {
      setError('Por favor, selecciona un tipo de usuario válido.');
    } else {
      onChangeTipo(nuevoTipo);
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-gray-500 bg-opacity-75">
      <div className="bg-MainLight dark:bg-MainDark p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">Cambiar tipo de usuario</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Nuevo tipo:</label>
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

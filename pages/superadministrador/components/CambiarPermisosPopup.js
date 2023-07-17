import React, { useState, useEffect } from 'react';

const CambiarPermisosPopup = ({ usuario, onClose, onChangePermisos }) => {
  const [permisosSeleccionados, setPermisosSeleccionados] = useState([]);

  useEffect(() => {
    if (usuario) {
      setPermisosSeleccionados(usuario.permisos);
    }
  }, [usuario]);

  const handlePermisoChange = (event) => {
    const permiso = event.target.value;
    if (event.target.checked) {
      setPermisosSeleccionados((prevPermisos) => [...prevPermisos, permiso]);
    } else {
      setPermisosSeleccionados((prevPermisos) =>
        prevPermisos.filter((p) => p !== permiso)
      );
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onChangePermisos(permisosSeleccionados);
  };

  if (!usuario) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-gray-500  bg-opacity-75">
      <div className="bg-MainLight dark:bg-MainDark p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-4 text-TextLight dark:text-TextDark">Cambiar permisos del usuario</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Permisos:</label>
            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value="rajo 1"
                  checked={permisosSeleccionados.includes('rajo 1')}
                  onChange={handlePermisoChange}
                  className="form-checkbox"
                />
                <span>Rajo 1</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value="rajo 2"
                  checked={permisosSeleccionados.includes('rajo 2')}
                  onChange={handlePermisoChange}
                  className="form-checkbox"
                />
                <span>Rajo 2</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value="rajo 3"
                  checked={permisosSeleccionados.includes('rajo 3')}
                  onChange={handlePermisoChange}
                  className="form-checkbox"
                />
                <span>Rajo 3</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value="rajo 4"
                  checked={permisosSeleccionados.includes('rajo 4')}
                  onChange={handlePermisoChange}
                  className="form-checkbox"
                />
                <span>Rajo 4</span>
              </label>
            </div>
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

export default CambiarPermisosPopup;

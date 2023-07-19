import React, { useState, useEffect } from "react";
import axios from "axios";
import { getCookie } from "cookies-next";
const CambiarPermisosPopup = ({
  usuario,
  onClose,
  onChangePermisos,
  closeAndRefresh,
}) => {
  const [permisosSeleccionados, setPermisosSeleccionados] = useState({});
  const [rajoxPermisos, setRajoxPermisos] = useState([]);
  useEffect(() => {
    if (usuario) {
      const initialPermisosSeleccionados = usuario.permisos.reduce(
        (acc, rajo) => {
          acc[rajo.Rajo] = rajo.Permiso === "True";
          return acc;
        },
        {}
      );
      setPermisosSeleccionados(initialPermisosSeleccionados);
      // Crear una lista de rajos únicos a partir de los permisos del usuario
      const uniqueRajos = Array.from(
        new Set(usuario.permisos.map((item) => item.Rajo))
      );
      setRajoxPermisos(uniqueRajos);
    }
  }, [usuario]);

  const handlePermisoChange = (event) => {
    const permiso = event.target.value;
    const isChecked = event.target.checked;
    console.log(permiso);
    setPermisosSeleccionados((prevPermisos) => ({
      ...prevPermisos,
      [permiso]: isChecked,
    }));
  };

  const handleSubmit = async (event) => {
    const rajosSeleccionados = rajoxPermisos.filter(
      (rajo) => permisosSeleccionados[rajo]
    );
    console.log(rajosSeleccionados);
    try {
      // Agregar los nuevos permisos llamando a la función addPermission de la API
      await Promise.all(
        rajoxPermisos.map(async (rajo) => {
          console.log(permisosSeleccionados[rajo]);
          if (permisosSeleccionados[rajo]) {
            console.log(usuario.correo);
            await addPermission(usuario.correo, rajo);
          }
        })
      );

      // Después de agregar los permisos, actualizamos los permisos en el estado local
      const updatedPermisos = usuario.permisos.map((rajo) => ({
        Rajo: rajo.Rajo,
        Permiso: permisosSeleccionados[rajo.Rajo] ? "True" : "False",
      }));
      // Asegurarnos de que usuario.permisos sea un array antes de usar some()
      const hasPermisos =
        Array.isArray(usuario.permisos) &&
        usuario.permisos.some((rajo) => rajo.Permiso === "True");
      const newPermisosText = hasPermisos
        ? usuario.permisos
            .filter((rajo) => rajo.Permiso === "True")
            .map((rajo) => rajo.Rajo)
            .join(", ")
        : "Sin permisos";
      console.log(updatedPermisos);
      onChangePermisos(permisosSeleccionados)
        .then(() => {
          closeAndRefresh(); // Llama a la función closeAndRefresh después de guardar los cambios
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error("Error al agregar permisos:", error);
      // Manejar el error según tus necesidades.
    }
  };

  // Llamada a la función addPermission de la API para agregar un permiso
  const addPermission = async (correo, rajo) => {
    console.log("correo:", correo);
    console.log(rajo);
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}root/addPermission`;
      const response = await axios.post(
        url,
        {
          email: correo,
          rajo: rajo,
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*", // Permitir cualquier origen (esto es innecesario en el cliente)
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE", // Métodos HTTP permitidos (esto es innecesario en el cliente)
            "Access-Control-Allow-Headers": "Content-Type, Authorization", // Encabezados permitidos (esto es innecesario en el cliente)
            Authorization: `${getCookie("token")}`,
          },
        }
      );
      console.log(response.data);
      console.log("traspasa await");
    } catch (error) {
      console.log("error");
      console.log(error);
      throw error;
    }
  };

  if (!usuario) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-gray-500  bg-opacity-75">
      <div className="bg-MainLight dark:bg-MainDark p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-4 text-TextLight dark:text-TextDark">
          Cambiar permisos del usuario
        </h2>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Permisos:</label>
            <div>
              {rajoxPermisos.map((rajo) => (
                <label key={rajo} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={rajo}
                    checked={permisosSeleccionados[rajo]}
                    onChange={handlePermisoChange}
                    className="form-checkbox"
                  />
                  <span>{rajo}</span>
                </label>
              ))}
              {/*<label className="flex items-center space-x-2">
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
              </label>*/}
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
              onClick={handleSubmit}
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

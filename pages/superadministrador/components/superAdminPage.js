import React, { useState, useContext, useEffect } from "react";
import { IconContext } from "react-icons";
import { AiOutlineDelete, AiOutlineLock, AiOutlineUser } from "react-icons/ai";
import CambiarTipoPopup from "./CambiarTipoPopup";
import CambiarPermisosPopup from "./CambiarPermisosPopup";
import PopupContext from "./PopupContext";
import { getCookie } from "cookies-next";
import axios from "axios";
import PopupConfirmacion2 from "./PopupConfirmacion";
import PopupConfirmacion from "../../components/PopupConfirmacion";
import PopupError from "../../components/PopupError";

const TablaUsuarios = ({ filasEjemplo, setFilasEjemplo, fetchData }) => {
  //const [filasEjemplo, setFilasEjemplo] = useState([]);

  const [mostrarTipoPopup, setMostrarTipoPopup] = useState(false);
  const [mostrarPermisosPopup, setMostrarPermisosPopup] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const { isPopupOpen, setPopupOpen } = useContext(PopupContext);
  const [popupOpen, setPopupOpen2] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showError, setShowError] = useState(false);

  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  /*const handleEliminar = (id) => {
    const confirmacion = window.confirm(
      "¿Estás seguro de que quieres eliminar este usuario?"
    );
    if (confirmacion) {
      setFilasEjemplo((prevFilas) =>
        prevFilas.filter((usuario) => usuario.id !== id)
      );
    }
  };*/

  const handleEliminar = (id) => {
    setUsuarioSeleccionado(id);
    setPopupOpen(true);
    setPopupOpen2(true);
  };

  const handleConfirmEliminar = async () => {
    console.log(usuarioSeleccionado);
    setFilasEjemplo((prevFilas) =>
      prevFilas.filter((usuario) => usuario.id !== usuarioSeleccionado)
    );
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}root/deleteUser`;
      const response = await axios.post(
        url,
        {
          email: usuarioSeleccionado,
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
      setUsuarioSeleccionado(null);
      setPopupOpen2(false);
      setPopupOpen(false);
      setShowPopup(true);
    } catch (error) {
      setShowError(true);
      setPopupOpen(false);
      setPopupOpen2(false);
      console.log(error);
    }
  };

  const handleCancelEliminar = () => {
    setUsuarioSeleccionado(null);
    setPopupOpen2(false);
    setPopupOpen(false);
  };

  const handleCambiarPermisos = (id) => {
    const usuario = filasEjemplo.find((usuario) => usuario.id === id);
    setUsuarioSeleccionado(usuario);
    setMostrarPermisosPopup(true);
    setMostrarTipoPopup(false);
    openPopup();
  };

  const handleCambiarTipo = (id) => {
    const usuario = filasEjemplo.find((usuario) => usuario.id === id);
    setUsuarioSeleccionado(usuario);
    setMostrarTipoPopup(true);
    setMostrarPermisosPopup(false);
    openPopup();
  };

  const handleChangeTipoUsuario = (nuevoTipo) => {
    setFilasEjemplo((prevFilas) =>
      prevFilas.map((usuario) =>
        usuario.id === usuarioSeleccionado.id
          ? { ...usuario, tipo: nuevoTipo }
          : usuario
      )
    );
    setMostrarTipoPopup(false);
    setUsuarioSeleccionado(null);
  };

  const handleChangePermisosUsuario = async (nuevosPermisos) => {
    setFilasEjemplo((prevFilas) =>
      prevFilas.map((usuario) =>
        usuario.id === usuarioSeleccionado.id
          ? { ...usuario, permisos: nuevosPermisos }
          : usuario
      )
    );
    setMostrarPermisosPopup(false);
    setUsuarioSeleccionado(null);

    try {
      // Aquí llamamos nuevamente a la función userData para obtener los datos actualizados
      const data = await userData();
      setFilasEjemplo(data);
    } catch (error) {
      console.error(error);
    }
  };

  const userData = async () => {
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}root/getUsers`;
      const response = await axios.post(
        url,
        {},
        {
          headers: {
            "Access-Control-Allow-Origin": "*", // Permitir cualquier origen (esto es innecesario en el cliente)
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE", // Métodos HTTP permitidos (esto es innecesario en el cliente)
            "Access-Control-Allow-Headers": "Content-Type, Authorization", // Encabezados permitidos (esto es innecesario en el cliente)
            Authorization: `${getCookie("token")}`,
          },
        }
      );

      const usersWithPermissions = await Promise.all(
        response.data.map(async (user) => {
          const permissionsUrl = `${process.env.NEXT_PUBLIC_API_URL}root/getPermissions`;
          const permissionsResponse = await axios.post(
            permissionsUrl,
            {
              email: user.correo,
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

          return {
            ...user,
            permisos: permissionsResponse.data,
          };
        })
      );

      return usersWithPermissions; // Devuelve los usuarios con sus respectivos permisos
    } catch (error) {
      console.error(error);
      
      throw error; // Lanza el error para que pueda ser capturado por el componente principal
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await userData(); // Llama a la función que hace la solicitud a la API
        setFilasEjemplo(data); // Actualiza el estado con los datos obtenidos
      } catch (error) {
        console.error(error);
      }
    };

    fetchData(); // Ejecuta la función para obtener los datos cuando el componente se monte
  }, []);

  const closeAndRefresh = () => {
    setMostrarPermisosPopup(false);
    setUsuarioSeleccionado(null);
    fetchData(); // Llama a la función fetchData para obtener los datos actualizados
  };

  return (
    <div className="overflow-x-auto text-left bg-MainLight dark:bg-MainDark border border-separate border-spacing-0 border-BorderLight dark:border-BorderDark rounded-3xl mb-10 mx-4 shadow-[0px_0px_15px_rgba(114,114,113,0.3)]">
      <table className="text-TextLight dark:text-TextDark w-full">
        <thead>
          <tr>
            <th className="border-b border-custom-gray"></th>
            <th className="border-b border-custom-gray">Correo</th>
            <th className="border-b border-custom-gray">Tipo de Usuario</th>
            <th className="border-b border-custom-gray">Permisos</th>
            <th className="border-b border-custom-gray"></th>
          </tr>
        </thead>
        <tbody>
          {filasEjemplo.map((usuario) => (
            <tr key={usuario.id} className="h-16">
              <td className="text-lg px-4 border-t border-custom-gray">
                {usuario.id}
              </td>
              <td className="text-lg border-t border-custom-gray">
                {usuario.correo}
              </td>
              <td className="text-lg border-t border-custom-gray">
                {usuario.tipo}
              </td>

              <td className="text-lg border-t border-custom-gray">
                {usuario.permisos &&
                usuario.permisos.some((rajo) => rajo.Permiso === "True")
                  ? usuario.permisos
                      .filter((rajo) => rajo.Permiso === "True")
                      .map((rajo) => rajo.Rajo)
                      .join(", ")
                  : "Sin permisos"}
              </td>
              <td className="border-t border-custom-gray">
                <div className="flex justify-center space-x-4">
                  <button
                    className="hover:text-red-500 text-lg "
                    onClick={() => handleEliminar(usuario.correo)}
                  >
                    <IconContext.Provider value={{ className: "w-6 h-6" }}>
                      <AiOutlineDelete />
                    </IconContext.Provider>
                  </button>
                  <button
                    className="hover:text-yellow-500 text-lg"
                    onClick={() => handleCambiarPermisos(usuario.id)}
                  >
                    <IconContext.Provider value={{ className: "w-6 h-6" }}>
                      <AiOutlineLock />
                    </IconContext.Provider>
                  </button>
                  <button
                    className="hover:text-green-500 text-lg"
                    onClick={() => handleCambiarTipo(usuario.id)}
                  >
                    <IconContext.Provider value={{ className: "w-6 h-6" }}>
                      <AiOutlineUser />
                    </IconContext.Provider>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {mostrarTipoPopup && (
        <CambiarTipoPopup
          usuario={usuarioSeleccionado}
          onClose={() => [setMostrarTipoPopup(false), closePopup()]}
          onChangeTipo={handleChangeTipoUsuario}
        />
      )}

      {mostrarPermisosPopup && (
        <CambiarPermisosPopup
          usuario={usuarioSeleccionado}
          onClose={() => [setMostrarPermisosPopup(false), closePopup()]}
          onChangePermisos={handleChangePermisosUsuario}
          closeAndRefresh={closeAndRefresh} // Pasar la función closeAndRefresh al componente CambiarPermisosPopup
        />
      )}

      {popupOpen && (
        <PopupConfirmacion2
          message="¿Estás seguro de que quieres eliminar este usuario?"
          onConfirm={handleConfirmEliminar}
          onCancel={handleCancelEliminar}
        />
      )}

      {showPopup && (
        <PopupConfirmacion
          message="¡Usuario eliminado correctamente!"
          onClose={() => setShowPopup(false)}
        />
      )}

{showError && (
        <PopupError
          message="¡No se ha podido eliminar el usuario!"
          onClose={() => setShowError(false)}
        />
      )}
      
    </div>
  );
};

export default TablaUsuarios;

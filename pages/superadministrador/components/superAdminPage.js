import React, { useState, useContext } from 'react';
import { IconContext } from 'react-icons';
import { AiOutlineDelete, AiOutlineLock, AiOutlineUser } from 'react-icons/ai';
import CambiarTipoPopup from './CambiarTipoPopup';
import CambiarPermisosPopup from './CambiarPermisosPopup';
import PopupContext from "./PopupContext";

const TablaUsuarios = () => {
  const [filasEjemplo, setFilasEjemplo] = useState([
    { id: 1, correo: 'carlos.ibanez@minerals.com', tipo: 'visita', permisos: ['rajo 1'] },
    { id: 2, correo: 'diego.gonzales@minerals.com', tipo: 'admin', permisos: ['rajo 1', 'rajo 2'] },
    { id: 3, correo: 'rodrigo.vega@minerals.com', tipo: 'admin', permisos: ['rajo 2', 'rajo 4'] },
    { id: 4, correo: 'daniel.bassano@minerals.com', tipo: 'visita', permisos: ['rajo 3'] },
  ]);

  const [mostrarTipoPopup, setMostrarTipoPopup] = useState(false);
  const [mostrarPermisosPopup, setMostrarPermisosPopup] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const { isPopupOpen, setPopupOpen } = useContext(PopupContext);

  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  const handleEliminar = (id) => {
    const confirmacion = window.confirm('¿Estás seguro de que quieres eliminar este usuario?');
    if (confirmacion) {
      setFilasEjemplo((prevFilas) => prevFilas.filter((usuario) => usuario.id !== id));
    }
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
        usuario.id === usuarioSeleccionado.id ? { ...usuario, tipo: nuevoTipo } : usuario
      )
    );
    setMostrarTipoPopup(false);
    setUsuarioSeleccionado(null);
  };

  const handleChangePermisosUsuario = (nuevosPermisos) => {
    setFilasEjemplo((prevFilas) =>
      prevFilas.map((usuario) =>
        usuario.id === usuarioSeleccionado.id ? { ...usuario, permisos: nuevosPermisos } : usuario
      )
    );
    setMostrarPermisosPopup(false);
    setUsuarioSeleccionado(null);
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
              <td className="text-lg px-4 border-t border-custom-gray">{usuario.id}</td>
              <td className="text-lg border-t border-custom-gray">{usuario.correo}</td>
              <td className="text-lg border-t border-custom-gray">{usuario.tipo}</td>
              <td className="text-lg border-t border-custom-gray">{usuario.permisos.join(', ')}</td>
              <td className='border-t border-custom-gray'>
                <div className="flex justify-center space-x-4">
                  <button
                    className="hover:text-red-500 text-lg "
                    onClick={() => handleEliminar(usuario.id)}
                  >
                    <IconContext.Provider value={{ className: 'w-6 h-6' }}>
                      <AiOutlineDelete />
                    </IconContext.Provider>
                  </button>
                  <button
                    className="hover:text-yellow-500 text-lg"
                    onClick={() => handleCambiarPermisos(usuario.id)}
                  >
                    <IconContext.Provider value={{ className: 'w-6 h-6' }}>
                      <AiOutlineLock />
                    </IconContext.Provider>
                  </button>
                  <button
                    className="hover:text-green-500 text-lg"
                    onClick={() => handleCambiarTipo(usuario.id)}
                  >
                    <IconContext.Provider value={{ className: 'w-6 h-6' }}>
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
        />
      )}
    </div>
  );
};

export default TablaUsuarios;

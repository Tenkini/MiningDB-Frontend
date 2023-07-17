import React, { useState } from 'react';
import { IconContext } from 'react-icons';
import { AiOutlineDelete, AiOutlineLock, AiOutlineUser } from 'react-icons/ai';

const TablaUsuarios = () => {
  const [filasEjemplo, setFilasEjemplo] = useState([
    { id: 1, correo: 'ejemplo1@example.com', tipo: 'tipo1' },
    { id: 2, correo: 'ejemplo2@example.com', tipo: 'tipo2' },
    { id: 3, correo: 'ejemplo3@example.com', tipo: 'tipo3' },
  ]);

  const handleEliminar = (id) => {
  };

  const handleCambiarPermisos = (id) => {
  };

  const handleCambiarTipo = (id) => {
  };

  return (
    <div className="text-left bg-MainLight dark:bg-MainDark border border-separate border-spacing-0 border-BorderLight dark:border-BorderDark rounded-3xl mb-10 mx-4 shadow-[0px_0px_15px_rgba(114,114,113,0.3)]">
      <table className="ml-2 text-TextLight dark:text-TextDark w-full">
        <thead>
          <tr>
            <th className="border-b border-custom-gray"></th>
            <th className="border-b border-custom-gray">Correo</th>
            <th className="border-b border-custom-gray">Tipo de Usuario</th>
            <th className="border-b border-custom-gray"></th>
          </tr>
        </thead>
        <tbody>
          {filasEjemplo.map((usuario) => (
            <tr key={usuario.id} className="h-16">
              <td className="text-lg">{usuario.id}</td>
              <td className="text-lg">{usuario.correo}</td>
              <td className="text-lg">{usuario.tipo}</td>
              <td>
                <div className="flex justify-center">
                  <button
                    className="hover:text-red-500 text-lg"
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
    </div>
  );
};

export default TablaUsuarios;

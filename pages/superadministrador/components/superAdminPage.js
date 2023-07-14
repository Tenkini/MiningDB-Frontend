
import React, { useState } from 'react';
import { IconContext } from 'react-icons';
import { AiOutlineEdit, AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';

const TablaUsuarios = () => {
  const [filasEjemplo, setFilasEjemplo] = useState([
    { id: 1, correo: 'ejemplo1@example.com', contraseña: 'contraseña1', tipo: 'tipo1' },
    { id: 2, correo: 'ejemplo2@example.com', contraseña: 'contraseña2', tipo: 'tipo2' },
    { id: 3, correo: 'ejemplo3@example.com', contraseña: 'contraseña3', tipo: 'tipo3' },
  ]);

  const [filaEditada, setFilaEditada] = useState(null);
  const [valoresEditados, setValoresEditados] = useState({});

  const handleEditar = (id) => {
    setFilaEditada(id);
    const fila = filasEjemplo.find((usuario) => usuario.id === id);
    setValoresEditados({ ...fila });
  };

  const handleConfirmarEdicion = (id) => {
    setFilasEjemplo((prevFilas) => {
      return prevFilas.map((usuario) => {
        if (usuario.id === id) {
          return { ...usuario, ...valoresEditados };
        }
        return usuario;
      });
    });
    setFilaEditada(null);
    setValoresEditados({});
  };

  const handleCancelarEdicion = () => {
    setFilaEditada(null);
    setValoresEditados({});
  };

  const handleChange = (event, campo) => {
    setValoresEditados({ ...valoresEditados, [campo]: event.target.value });
  };

  return (
    <div className="overflow-x-auto text-left bg-MainLight dark:bg-MainDark border border-separate border-spacing-0 border-BorderLight dark:border-BorderDark rounded-3xl mb-10 mx-4 shadow-[0px_0px_15px_rgba(114,114,113,0.3)]">
      <table className="ml-2  text-TextLight dark:text-TextDark w-full">
        <thead>
          <tr>
            <th className=" border-b border-custom-gray"></th>
            <th className=" border-b border-custom-gray">correo</th>
            <th className=" border-b border-custom-gray">contraseña</th>
            <th className=" border-b border-custom-gray">tipo de usuario</th>
            <th className=" border-b border-custom-gray"></th>
          </tr>
        </thead>
        <tbody>
          {filasEjemplo.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.id}</td>
              <td>
                {filaEditada === usuario.id ? (
                  <input
                    type="text"
                    value={valoresEditados.correo || ''}
                    onChange={(event) => handleChange(event, 'correo')}
                    className="border border-gray-400 rounded px-2 py-1"
                  />
                ) : (
                  usuario.correo
                )}
              </td>
              <td>
                {filaEditada === usuario.id ? (
                  <input
                    type="text"
                    value={valoresEditados.contraseña || ''}
                    onChange={(event) => handleChange(event, 'contraseña')}
                    className="border border-gray-400 rounded px-2 py-1"
                  />
                ) : (
                  usuario.contraseña
                )}
              </td>
              <td>
                {filaEditada === usuario.id ? (
                  <input
                    type="text"
                    value={valoresEditados.tipo || ''}
                    onChange={(event) => handleChange(event, 'tipo')}
                    className="border border-gray-400 rounded px-2 py-1"
                  />
                ) : (
                  usuario.tipo
                )}
              </td>
              <td>
                {filaEditada === usuario.id ? (
                  <div>
                    <button
                      className="hover:text-blue-500"
                      onClick={() => handleConfirmarEdicion(usuario.id)}
                    >
                      <IconContext.Provider value={{ className: 'w-6 h-6' }}>
                        <AiOutlineCheck />
                      </IconContext.Provider>
                    </button>
                    <button
                      className="hover:text-blue-500"
                      onClick={handleCancelarEdicion}
                    >
                      <IconContext.Provider value={{ className: 'w-6 h-6' }}>
                        <AiOutlineClose />
                      </IconContext.Provider>
                    </button>
                  </div>
                ) : (
                  <button
                    className="hover:text-blue-500"
                    onClick={() => handleEditar(usuario.id)}
                  >
                    <IconContext.Provider value={{ className: 'w-6 h-6' }}>
                      <AiOutlineEdit />
                    </IconContext.Provider>
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaUsuarios;


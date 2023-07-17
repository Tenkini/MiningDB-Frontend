import React, { useState } from 'react';
import { Autocomplete } from '@mui/material';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function CrearUsuario() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState([]);
  const [selectedName, setSelectedName] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState([]);
  

  const handleKeyPress = (event) => {
    const keyCode = event.keyCode || event.which;
    const keyValue = String.fromCharCode(keyCode);

    // Solo permite caracteres numéricos (0-9)
    if (!/^[0-9]+$/.test(keyValue)) {
      event.preventDefault();
    }
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
    setOverlayOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setOverlayOpen(false);
  };

  return (
    <div>
      <button onClick={handleDialogOpen}>Crear Usuario</button>

      {overlayOpen && (
        <div className="overlay">
          <div className="popup">
            <div className="bg-MainLight dark:bg-MainDark rounded-lg p-8 max-w-lg">
              <h2 className="text-2xl font-bold mb-1 text-TextHover">Nuevo Usuario</h2>

              <div className="mb-0">
                <label className="block font-bold mb-1 text-TextLight dark:text-TextDark">Tipo de Usuario</label>
                <Autocomplete className='bg-white'
                  multiple
                  options={['Opción 1', 'Opción 2', 'Opción 3']}
                  value={selectedUser}
                  onChange={(event, value) => setSelectedUser(value)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      placeholder="Seleccione el Usuario"
                      sx={{
                        width: '100%',
                        '& .MuiOutlinedInput-input': {
                          padding: '12px 16px',
                          fontSize: '1rem',
                          
                        },
                      }}
                    />
                  )}
                  sx={{
                    width: '100%',
                    minWidth: '300px',
                    minHeight: '48px',
                  }}
                />
              </div>


              <div className="mb-0">
                <label className="block font-bold mb-1 text-TextLight dark:text-TextDark ">Nombre</label>
                <TextField className='bg-white' 
                  value={selectedName}
                  onChange={(event, value) => setSelectedName(value)}
                  placeholder='Ingrese el Nombre'
                  variant="outlined"
                  sx={{
                    width: '100%',
                    minWidth: '300px',
                    minHeight: '48px',
                    
                  }}
                  
                />
              </div>

              <div className="mb-0">
                <label className="block font-bold mb-1 text-TextLight dark:text-TextDark ">Correo</label>
                <TextField className='bg-white' 
                  value={selectedEmail}
                  onChange={(event, value) => setSelectedEmail(value)}
                  placeholder='Ingrese el Correo'
                  variant="outlined"
                  sx={{
                    width: '100%',
                    minWidth: '300px',
                    minHeight: '48px',
                    
                  }}
                  
                />
              </div>

              <div>

              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-2"
                onClick={handleDialogClose}
              >
                Ingresar
              </button>
              </div>     
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-2"
                onClick={handleDialogClose}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .overlay {
          position: fixed;
          inset: 0;
          z-index: 10;
          background-color: rgba(0, 0, 0, 0.5);
        }

        .popup {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
        }
      `}</style>
    </div>
  );
}

export default CrearUsuario;
import React, { useState } from 'react';
import { Autocomplete } from '@mui/material';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function CambiarContraseña() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [selectedContraseaActual, setSelectedContraseaActual] = useState([]);
  const [selectedNuevaContraseña, setSelectedNuevaContraseña] = useState([]);
  const [selectedContraseñaConfirmada, setSelectedContraseñaConfirmada] = useState([]);
  

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
      <button onClick={handleDialogOpen}>Cambiar Contraseña</button>

      {overlayOpen && (
        <div className="overlay">
          <div className="popup">
            <div className="bg-MainLight dark:bg-MainDark rounded-lg p-8 max-w-lg">
              <h2 className="text-2xl font-bold mb-1 text-TextHover">Cambiar Contraseña</h2>

              <div className="mb-0">
                <label className="block font-bold mb-1 text-TextLight dark:text-TextDark">Contraseña Actual</label>
                <TextField className='bg-white' 
                  value={selectedContraseaActual}
                  onChange={(event, value) => setSelectedContraseaActual(value)}
                  placeholder='Ingrese la Contraseña Actual'
                  variant="outlined"
                  sx={{
                    width: '100%',
                    minWidth: '300px',
                    minHeight: '48px',
                    
                  }}
                  
                />
              </div>

              <div className="mb-0">
                <label className="block font-bold mb-1 text-TextLight dark:text-TextDark">Nueva Contraseña</label>
                <TextField className='bg-white' 
                  value={selectedNuevaContraseña}
                  onChange={(event, value) => setSelectedNuevaContraseña(value)}
                  placeholder='Ingrese la Contraseña Nueva'
                  variant="outlined"
                  sx={{
                    width: '100%',
                    minWidth: '300px',
                    minHeight: '48px',
                    
                  }}
                  
                />
              </div>

              <div className="mb-0">
                <label className="block font-bold mb-1 text-TextLight dark:text-TextDark ">Confirmar Contraseña</label>
                <TextField className='bg-white' 
                  value={selectedContraseñaConfirmada}
                  onChange={(event, value) => setSelectedContraseñaConfirmada(value)}
                  placeholder='Confirme la Nueva Contraseña'
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

export default CambiarContraseña;
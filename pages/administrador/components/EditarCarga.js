import React, { useState } from 'react';
import { Autocomplete } from '@mui/material';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function EditarCarga() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [selectedOrigen, setSelectedOrigen] = useState([]);
  const [selectedFlota, setSelectedFlota] = useState([]);
  const [valueFechaInicio, setValueFechaInicio] = React.useState(null);
  const [valueFechaFin, setValueFechaFin] = React.useState(null);


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
      <button onClick={handleDialogOpen}>Editar Carga</button>

      {overlayOpen && (
        <div className="overlay">
          <div className="popup">
            <div className="bg-MainLight dark:bg-MainDark rounded p-8 max-w-lg">
              <h2 className="text-2xl font-bold mb-4 text-TextHover">Nuevo Facto de Carga</h2>

              <div className="mb-5">
                <label className="block font-bold mb-2 text-TextLight dark:text-TextDark">Origen</label>
                <Autocomplete className='bg-white'
                  multiple
                  options={['Opción 1', 'Opción 2', 'Opción 3']}
                  value={selectedOrigen}
                  onChange={(event, value) => setSelectedOrigen(value)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      placeholder="Seleccione el origen"
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

              <div className="mb-5">
                <label className="block font-bold mb-2 text-TextLight dark:text-TextDark">Flota</label>
                <Autocomplete className='bg-white'
                  multiple
                  options={['Flota 1', 'Flota 2', 'Flota 3']}
                  value={selectedFlota}
                  onChange={(event, value) => setSelectedFlota(value)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      placeholder="Seleccione la flota"
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

              <div className="mb-5">
                <label className="block font-bold mb-2 text-TextLight dark:text-TextDark">Fecha Inicio</label>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker className='bg-white'
                    value={valueFechaInicio}
                    onChange={(newValue) => setValueFechaInicio(newValue)}
                    sx={{
                      width: '100%',
                      minWidth: '300px',
                      minHeight: '48px',
                    }}
                  />
                </LocalizationProvider>
              </div>

              <div className="mb-5">
                <label className="block font-bold mb-2 text-TextLight dark:text-TextDark">Fecha Fin</label>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker className='bg-white'
                    value={valueFechaFin}
                    onChange={(newValue) => setValueFechaFin(newValue)}
                    sx={{
                      width: '100%',
                      minWidth: '300px',
                      minHeight: '48px',
                    }}
                  />
                </LocalizationProvider>
              </div>
              
              <div className="mb-5">
                <label className="block font-bold mb-2 text-TextLight dark:text-TextDark">Factor de Carga</label>
                <TextField className='bg-white' focused
                  placeholder='Ingrese un Numero'
                  variant="outlined"
                  onKeyPress={handleKeyPress}
                />
              </div>

              <button
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-4"
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

export default EditarCarga;
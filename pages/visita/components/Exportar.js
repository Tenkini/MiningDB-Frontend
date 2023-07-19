import React, { useState } from "react";
import { Autocomplete } from "@mui/material";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import PopupConfirmacion from "../../components/PopupConfirmacion";
function Exportar() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState([]);
  const [selectedName, setSelectedName] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

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

  const handleExport = async () => {
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}exportarexcel`;
      const response = await axios.post(
        url,
        {

        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*", // Permitir cualquier origen
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE", // Métodos HTTP permitidos
            "Access-Control-Allow-Headers": "Content-Type, Authorization", // Encabezados permitidos
          },
        }
      );
      setDialogOpen(false);
      setOverlayOpen(false);
      setShowPopup(true);
    } catch (error) {
      setDialogOpen(false);
      setOverlayOpen(false);
    }
  };

  return (
    <div>
      <button onClick={handleDialogOpen}>Exportar</button>

      {overlayOpen && (
        <div className="overlay text-center">
          <div className="popup">
            <div className="bg-MainLight dark:bg-MainDark rounded-lg p-8 max-w-lg">
              <h2 className="text-2xl font-bold mb-1 text-TextHover">
                ¿Seguro que quieres exportar la tabla?
              </h2>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-2 mr-3"
                onClick={handleExport}
                sx={{
                  width: "100%",
                  minWidth: "300px",
                  minHeight: "48px",
                }}
              >
                  Confirmar
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-2"
                onClick={handleDialogClose}
                sx={{
                  width: "100%",
                  minWidth: "300px",
                  minHeight: "48px",
                }}
              >
                Cancelar
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

      {showPopup && (
        <PopupConfirmacion
          message="¡El excel se ha generado correctamente!"
          onClose={() => setShowPopup(false)}
        />
      )}
    </div>
  );
}

export default Exportar;

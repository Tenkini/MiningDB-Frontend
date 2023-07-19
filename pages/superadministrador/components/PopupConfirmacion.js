function PopupConfirmacion({ message, onConfirm, onCancel }) {
    return (
      <div className="overlay">
        <div className="popup">
          <div className="content bg-MainLight dark:bg-MainDark rounded p-8 max-w-lg">
            <h2 className="text-2xl font-bold mb-1 text-TextHover">Confirmación</h2>
            <p className="text-center">{message}</p>
            <div className="flex justify-center mt-4">
            <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2"
                onClick={onConfirm}
              >
                Confirmar
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded "
                onClick={onCancel}
              >
                Cancelar
              </button>
              
            </div>
          </div>
        </div>
  
        <style jsx>{`
          .overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            display: flex;
            justify-content: center;
            align-items: center;
          }
  
          .popup {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
          }
  
          .content {
            /* Estilos para el contenido del popup */
            text-align: center; /* Centrar el texto horizontalmente */
          }
  
          /* Otros estilos... */
        `}</style>
      </div>
    );
  }
  
  export default PopupConfirmacion;
  
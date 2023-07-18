import { useState, useEffect } from 'react';

const PopupError = ({ message, onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => {
      handleClose();
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => {
      onClose();
    }, 1200); // Esperar un poco antes de cerrar completamente el popup después de la animación
  };

  return (
    <div className={`fixed bottom-5 right-5 z-50 ${visible ? '' : 'hidden'}`}>
      <div className={`bg-MainLight dark:bg-MainDark rounded-lg p-4 shadow-md transform ${visible ? 'animate-jump-in' : 'animate-jump-out'}`}>
        <p className='text-red-500'>{message}</p>
      </div>
    </div>
  );
};

export default PopupError;

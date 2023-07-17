import React, { createContext, useState } from 'react';

const PopupContext = createContext();

export function PopupProvider({ children }) {
  const [isPopupOpen, setPopupOpen] = useState(false);

  return (
    <PopupContext.Provider value={{ isPopupOpen, setPopupOpen }}>
      {children}
    </PopupContext.Provider>
  );
}

export default PopupContext;
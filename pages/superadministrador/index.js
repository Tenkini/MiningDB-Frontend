import TopNavbar from "./components/TopNavbar";
import { useState, useEffect } from "react";
import TablaUsuarios from "./components/superAdminPage";
import { PopupProvider } from "./components/PopupContext";
const MiPagina = () => {
  const [mounted, setMounted] = useState(false);
  const [loged, setLoged] = useState(false);
  const login = () => setLoged(true);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <PopupProvider>
      <div className="w-screen h-screen bg-BgLight dark:bg-BgDark">
        <TopNavbar />
        <TablaUsuarios />
      </div>
    </PopupProvider>
  );
};

export default MiPagina;

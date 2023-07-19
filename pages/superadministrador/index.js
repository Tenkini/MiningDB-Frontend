import TopNavbar from "./components/TopNavbar";
import { useState, useEffect } from "react";
import TablaUsuarios from "./components/superAdminPage";
import { PopupProvider } from "./components/PopupContext";
import axios from "axios";
import { getCookie } from "cookies-next";

const MiPagina = () => {
  const [filasEjemplo, setFilasEjemplo] = useState([]);
  const [mounted, setMounted] = useState(false);
  const [loged, setLoged] = useState(false);
  const login = () => setLoged(true);
  useEffect(() => setMounted(true), []);
   

  const fetchData = async () => {
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}root/getUsers`;
      const response = await axios.post(
        url,
        {},
        {
          headers: {
            "Access-Control-Allow-Origin": "*", // Permitir cualquier origen (esto es innecesario en el cliente)
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE", // Métodos HTTP permitidos (esto es innecesario en el cliente)
            "Access-Control-Allow-Headers": "Content-Type, Authorization", // Encabezados permitidos (esto es innecesario en el cliente)
            Authorization: `${getCookie("token")}`,
          },
        }
      );

      // ... (procesar la respuesta y actualizar el estado filasEjemplo)
      console.log(response.data)
      setFilasEjemplo(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData(); // Obtener los datos iniciales al montar el componente
  }, []);

  if (!mounted){
    return null;
  }
  return (
    <PopupProvider>
      <div className="w-screen h-screen bg-BgLight dark:bg-BgDark">
        <TopNavbar filasEjemplo={filasEjemplo} setFilasEjemplo={setFilasEjemplo} fetchData={fetchData} />
        <TablaUsuarios filasEjemplo={filasEjemplo} setFilasEjemplo={setFilasEjemplo} fetchData={fetchData} />
      </div>
    </PopupProvider>
  );
};

export default MiPagina;

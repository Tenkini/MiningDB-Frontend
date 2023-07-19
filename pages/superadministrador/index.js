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
   

  const userData = async () => {
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

      const usersWithPermissions = await Promise.all(
        response.data.map(async (user) => {
          const permissionsUrl = `${process.env.NEXT_PUBLIC_API_URL}root/getPermissions`;
          const permissionsResponse = await axios.post(
            permissionsUrl,
            {
              email: user.correo,
            },
            {
              headers: {
                "Access-Control-Allow-Origin": "*", // Permitir cualquier origen (esto es innecesario en el cliente)
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE", // Métodos HTTP permitidos (esto es innecesario en el cliente)
                "Access-Control-Allow-Headers": "Content-Type, Authorization", // Encabezados permitidos (esto es innecesario en el cliente)
                Authorization: `${getCookie("token")}`,
              },
            }
          );

          return {
            ...user,
            permisos: permissionsResponse.data,
          };
        })
      );
      console.log("esta funcion");
      return usersWithPermissions; // Devuelve los usuarios con sus respectivos permisos
    } catch (error) {
      console.error(error);

      throw error; // Lanza el error para que pueda ser capturado por el componente principal
    }
  };

  /*useEffect(() => {
    const data = await fetchData(); // Obtener los datos iniciales al montar el componente
    setFilasEjemplo(data); 
  }, []);*/

  const fetchData = async () => {
    try {
      const data = await userData();
      setFilasEjemplo(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
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

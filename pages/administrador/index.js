import TablaDesplegable from './components/TablaDesplegable';
import TopNavbar from "./components/TopNavbar";
import { useState, useEffect } from "react";
import axios from 'axios';
import { getCookie } from 'cookies-next';
const MiPagina = () => {
  const [datos, setDatos] = useState([]);
  
  const [mounted, setMounted] = useState(false)
  const [loged,setLoged] = useState(false)
  
  const login = ()=> setLoged(true)
  useEffect(()=> setMounted(true), [])
  const fetchDataTable = async () =>{
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}users/getReport`;
      const response = await axios.post(
        url,
        {},
        {
          headers: {
            "Access-Control-Allow-Origin": "*", // Permitir cualquier origen
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE", // Métodos HTTP permitidos
            "Access-Control-Allow-Headers": "Content-Type, Authorization", // Encabezados permitidos
            Authorization: `${getCookie("token")}`,
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };


  const fetchData = async () => {
    try {
      const data = await fetchDataTable();
      setDatos(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  if(!mounted) return null

  return (
    
    <div className='w-screen h-screen bg-BgLight dark:bg-BgDark'>
      <div><TopNavbar datos={datos} setDatos={setDatos} fetchData={fetchData}/><TablaDesplegable datos={datos} setDatos={setDatos} fetchData={fetchData}/></div>
      
    </div>
    
  );
};

export default MiPagina;

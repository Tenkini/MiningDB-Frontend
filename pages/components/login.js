import Head from "next/head";
import Image from 'next/image'
import { useState,useEffect } from "react";
import { useTheme } from "next-themes";
import axios from 'axios';
import { Inter } from 'next/font/google'

import Link from 'next/link';
const inter = Inter({ subsets: ['latin'] })
import { FaFacebookF,FaGoogle,FaEnvelope,FaRegEnvelope} from 'react-icons/fa';
import {MdLockOutline} from 'react-icons/md';


const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [message,setMessage] = useState(false);

    const handle = async () => {
        try {
            const response = await axios.post('http://chitanda.vgaprint.cl:3000/login', {
                email: email,
                password: password,
        },{
            headers: {
              'Access-Control-Allow-Origin': '*', // Permitir cualquier origen
              'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE', // Métodos HTTP permitidos
              'Access-Control-Allow-Headers': 'Content-Type, Authorization', // Encabezados permitidos
            },
        });
        
        // Maneja la respuesta del servidor, por ejemplo, guarda el token de sesión en el almacenamiento local o redirecciona a otra página.

        // Obtén el token de la respuesta del servidor
        const token = response.data.token;
        const userType = response.data.user_type;
        // Guarda el token en el almacenamiento local
        localStorage.setItem('token', token);
        localStorage.setItem('userType', userType);
        props.login()

        console.log(response.data);
        } catch (error) {
        // Maneja los errores, por ejemplo, muestra un mensaje de error al usuario.
            console.log("Usuario invalido")
            setMessage(true)
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-background">
          <Head>
            <title>Reportes Mineros</title>
            <link rel="icon" href="/favicon.ico"/>
          </Head>
          <main className="flex flex-col items-center justify-center w-full px-5 sm:px-20 text-center">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
              <div className="w-full p-5 text-black">
                <div className="text-left font-bold">
                  <span className="text-blue-500"></span>
                </div>
                <div className="py-10">
                  <h2 className="text-3xl font-bold text-blue mb-2">Bienvenido</h2>
                  <div className="border-2 w-10 border-blue inline-block mb-2"></div>
                  
                  {message && <p className="text-red-500">Usuario o Contraseña invalida</p>}
                  


                  <div className="flex flex-col items-center">
                    <div className="bg-gray-100 w-full sm:w-64 p-2 flex items-center mb-3">
                      <FaRegEnvelope className="text-gray-400 m-2"/>
                      <input type="email" name="email" placeholder="Correo" className="bg-gray-100 outline-none text-sm flex-1"
                      onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    
                    <div className="bg-gray-100 w-full sm:w-64 p-2 flex items-center mb-3">
                      <MdLockOutline className="text-gray-400 m-2"/>
                      <input type="password" name="Password" placeholder="Contraseña" className="bg-gray-100 outline-none text-sm flex-1"
                      onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between w-full sm:w-64 mb-5">
                      <label className="flex items-center text-xs">
                        <input type="checkbox" name="remember" className="mr-1 checked:bg-red-500" /> Recordar
                      </label>
                      <a href="#" className="text-xs">¿Has olvidado tu contraseña?</a>
                    </div>
                    <button className="border-2 border-blue text-blue rounded-full px-12 py-2 inline-block font-semibold hover:bg-blue hover:text-white" onClick={handle}>
                        Iniciar Sesion
                    </button>

                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
    )
    
  }
  
  export default Login;
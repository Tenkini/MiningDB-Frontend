import { useState } from "react";
import axios from "axios";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import { setCookie,hasCookie,getCookie } from "cookies-next";
const inter = Inter({ subsets: ["latin"] });
import {
  FaFacebookF,
  FaGoogle,
  FaEnvelope,
  FaRegEnvelope,
} from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";

function LoginPage() {
  const { theme, setTheme } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [message, setMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  /*if (hasCookie("remember")) {
    const remember = getCookie("remember");
    if (remember) {
      const userType = getCookie("userType")
      if (userType === "guest") {
        router.push("/visita");
      } else if (userType === "admin") {
        router.push("/administrador");
      } else if (userType === "root") {
        router.push("/superadministrador");
      }
    }
  }*/

  const speakMessage = (message) => {
    // Verificar si la API de síntesis de voz es compatible
    if ("speechSynthesis" in window) {
      // Crear un nuevo objeto SpeechSynthesisUtterance
      const utterance = new SpeechSynthesisUtterance(message);

      // Reproducir el mensaje en voz alta
      speechSynthesis.speak(utterance);
    } else {
      // La API de síntesis de voz no es compatible con este navegador.
      // Puedes mostrar un mensaje de error o proporcionar otra retroalimentación.
      console.log(
        "La API de síntesis de voz no es compatible con este navegador."
      );
    }
  };

  const handle = async () => {
    setLoading(true);
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}login`;
      const response = await axios.post(
        url,
        {
          email: email,
          password: password,
          remember: remember,
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*", // Permitir cualquier origen
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE", // Métodos HTTP permitidos
            "Access-Control-Allow-Headers": "Content-Type, Authorization", // Encabezados permitidos
          },
        }
      );
      // Maneja la respuesta del servidor, por ejemplo, guarda el token de sesión en el almacenamiento local o redirecciona a otra página.
      // Obtén el token de la respuesta del servidor
      const token = response.data.token;
      const userType = response.data.user_type;
      setCookie("token", token);
      setCookie("userType", userType);
      if(remember){
        setCookie("remember", remember);
      }
      setTimeout(() => setLoading(false), 5000);
      if (userType === "guest") {
        router.push("/visita");
      } else if (userType === "admin") {
        router.push("/administrador");
      } else if (userType === "root") {
        router.push("/superadministrador");
      }
      console.log(response.data);
    } catch (error) {
      setLoading(false);
      // Maneja los errores, por ejemplo, muestra un mensaje de error al usuario.
      console.log("Usuario invalido");
      setMessage(true);
    }
  };
  return (
    <div className="w-screen h-screen bg-BgLight dark:bg-BgDark">
      <div>
        <header>
          <ul></ul>
          <div className="theme-changer fixed top-2 right-2">
            <label
              role="button"
              for="checkbox"
              className="switch border-2 border-TextLight dark:border-TextDark"
            >
              <input
                type="checkbox"
                id="checkbox"
                checked={theme === "light" ? false : true}
                onChange={() => setTheme(theme === "light" ? "dark" : "light")}
              />
              <span className="switch__ball bg-TextLight dark:bg-TextDark"></span>
              <i className="bx bx-sun text-TextLight dark:text-TextDark"></i>
              <i className="bx bx-moon text-TextLight dark:text-TextDark"></i>
            </label>
            <button
              className="text-TextLight hover:text-TextHover dark:text-TextDark"
              id="menu-icon"
            ></button>
          </div>
        </header>
      </div>
      <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-background">
        <main className="flex flex-col items-center justify-center w-full px-5 sm:px-20 text-center">
          <div className="bg-MainLight rounded-2xl shadow-2xl w-full max-w-md overflow-hidden dark:bg-MainDark">
            <div className="w-full p-5 text-black">
              <div className="text-left font-bold">
                <span className="text-blue-500"></span>
              </div>
              <div className="py-10">
                <h2 className="text-3xl font-bold text-TextHover mb-2 dark:text-TextDark">
                  Bienvenido
                </h2>
                <div className="border-2 w-10 border-blue inline-block mb-2"></div>

                {message && (
                  <p className="text-red-500">Usuario o Contraseña invalida</p>
                )}

                <div className="flex flex-col items-center ">
                  <div className="bg-gray-100 w-full sm:w-64 p-2 flex items-center mb-3 rounded-full">
                    <FaRegEnvelope className="text-gray-400 m-2" />
                    <input
                      type="email"
                      name="email"
                      placeholder="Correo"
                      className="bg-gray-100 outline-none text-sm flex-1 "
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="bg-gray-100 w-full sm:w-64 p-2 flex items-center mb-3 rounded-full">
                    <MdLockOutline className="text-gray-400 m-2" />
                    <input
                      type="password"
                      name="Password"
                      placeholder="Contraseña"
                      className="bg-gray-100 outline-none text-sm flex-1"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row justify-between w-full sm:w-64 mb-5">
                    <label className="flex items-center text-xs text-TextLight dark:text-TextDark">
                      <input
                        type="checkbox"
                        name="remember"
                        className="mr-1 checked:bg-red-500"
                        onChange={(e) => setRemember(!remember)}
                      />{" "}
                      Recordar
                    </label>
                    <a
                      href="resetpassword"
                      className="text-xs text-TextLight dark:text-TextDark"
                    >
                      ¿Has olvidado tu contraseña?
                    </a>
                  </div>
                  <button
                    className={`hover:bg-TextHover border-2 border-TextHover text-TextHover rounded-full px-12 py-2 inline-block font-semibold hover:bg-blue hover:text-white dark:text-TextDark
                      
                    }`}
                    onClick={handle}
                  >
                    {loading ? (
                      <div class="contain">
                        <div class="loader"></div>
                      </div>
                    ) : (
                      "Iniciar Sesion"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default LoginPage;

import { useState } from "react";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
const inter = Inter({ subsets: ["latin"] });
import { FaRegEnvelope } from "react-icons/fa";

const Changepassword = () => {
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [error, setError] = useState("");
  const [showerror, setShowerror] = useState(false);
  const { theme, setTheme } = useTheme();
  const { query } = useRouter();
  const token = query.token;
  const email = query.email;

  const handle = async () => {
    try {
        const url = `${process.env.NEXT_PUBLIC_API_URL}changepassword`;
        const response = await axios.post(
          url,
          {
            email: email,
            token: token,
            password: password,
          },
          {
            headers: {
              "Access-Control-Allow-Origin": "*", // Permitir cualquier origen
              "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE", // Métodos HTTP permitidos
              "Access-Control-Allow-Headers": "Content-Type, Authorization", // Encabezados permitidos
            },
          }
        );
        setError(false)
        setShowerror(true)
      } catch (error) {
        setError(true)
        setShowerror(true)
      }
  };
  return (
    <div className="w-screen h-screen bg-BgLight dark:bg-BgDark">
      {email && token ? (
        <div>
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
                    onChange={() =>
                      setTheme(theme === "light" ? "dark" : "light")
                    }
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
                      Cambiar Contraseña
                    </h2>
                    <div className="border-2 w-10 border-blue inline-block mb-2"></div>
                    { showerror ? (
                         error ? (
                            <p className="text-red-500">No se pudo cambiar la contraseña</p>
                        ) : (
                            <p className="text-green-500">Contraseña cambiada correctamente</p>
                        )
                    ) : (<p></p>)}

                    
                    <div className="flex flex-col items-center ">
                      <div className="bg-gray-100 w-full sm:w-64 p-2 flex items-center mb-3 rounded-full">
                        <FaRegEnvelope className="text-gray-400 m-2" />
                        <input
                          type="password"
                          name="password"
                          placeholder="Nueva Contraseña"
                          className="bg-gray-100 outline-none text-sm flex-1 "
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      {/*<div className="bg-gray-100 w-full sm:w-64 p-2 flex items-center mb-3 rounded-full">
                        <FaRegEnvelope className="text-gray-400 m-2" />
                        <input
                          type="password"
                          name="confirmpassword"
                          placeholder="Confirmar Contraseña"
                          className="bg-gray-100 outline-none text-sm flex-1 "
                          onChange={(e) => setConfirmpassword(e.target.value)}
                        />
                      </div>*/}
                      <div className="flex flex-col sm:flex-row justify-between w-full sm:w-64 mb-5"></div>
                      <button
                        className="hover:bg-TextHover border-2 border-TextHover text-TextHover rounded-full px-12 py-2 inline-block font-semibold hover:bg-blue hover:text-white dark:text-TextDark"
                        onClick={handle}
                      >
                        Enviar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      ) : (
        <p>La pagina que estas intentado acceder no existe</p>
      )}
    </div>
  );
};

export default Changepassword;

import React from "react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import EditarCarga from "./EditarCarga";
import CrearUsuario from "./CrearUsuario";
import Exportar from "./Exportar";
import CambiarContraseña from "./CambiarContraseña";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/router";

function TopNavbar() {
  const { theme, setTheme } = useTheme();
  const [navbar, setNavbar] = useState(false);
  const [enabledSwitch, setEnabledSwitch] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const handlelogout = async () => {
    deleteCookie("token");
    deleteCookie("userType");
    router.push("/../login");
  };

  return (
    <div className=" pb-24 navmedium:pb-36 ">
      <header className="bg-MainLight dark:bg-MainDark ">
        <Image
          className="logo z-10 h-50 w-50"
          src="antofagasta minerals.svg"
          width={50}
          height={50}
          alt="Logo Antofagasta Minerals"
        />
        <ul
          className={`navbar navbreak:bg-transparent bg-MainLight text-TextLight dark:bg-MainDark dark:text-TextDark ${
            navbar ? "open" : ""
          }`}
        >
          <li className="hover:text-TextHover"> Reportes</li>
          <li className="hover:text-TextHover">
            <button>
              <EditarCarga>Editar Carga</EditarCarga>
            </button>
          </li>
          <li className="hover:text-TextHover">
            <button>
              <CrearUsuario>Crear Usuario</CrearUsuario>
            </button>
          </li>
          <li className="hover:text-TextHover">
            <button>
              <Exportar>Exportar</Exportar>
            </button>
          </li>
          <li className="hover:text-TextHover">
            <button>
              <CambiarContraseña>Cambiar Contraseña</CambiarContraseña>
            </button>
          </li>
          <li className="hover:text-TextHover">
            <button onClick={handlelogout}>Salir</button>
          </li>
        </ul>
        <div class="theme-changer">
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
            onClick={() => setNavbar(!navbar)}
          >
            {navbar ? (
              <div class="bx bx-x" id="menu-icon"></div>
            ) : (
              <div class="bx bx-menu" id="menu-icon"></div>
            )}
          </button>
        </div>
      </header>
    </div>
  );
}

export default TopNavbar;

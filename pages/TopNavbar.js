import React from "react";
import Image from 'next/image'
import Link from "next/link";
import { BiMenu, BiMoon, BiSun, BiX } from "react-icons/bi";
import { Switch } from '@headlessui/react'
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

function TopNavbar() {

    const { systemTheme, theme, setTheme } = useTheme();
    const [navbar, setNavbar] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [enabledSwitch, setEnabledSwitch] = useState(false)
    const [showModal, setShowModal] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;
    const currentTheme = theme === 'system' ? systemTheme : theme;
    console.log(systemTheme)
    return (
        
        <header className={`${currentTheme === 'dark' ? 'bg-MainDark' : 'bg-MainLight'}`}>
            <Image className="logo z-10 h-50 w-50"
                src="antofagasta minerals.svg"
                width={50}
                height={50}
                alt="Logo Antofagasta Minerals"
                />
            <ul className={`navbar navbreak:bg-transparent ${navbar ? 'open' : ''} ${currentTheme === 'dark' ? 'bg-MainDark' : 'bg-MainLight'} `}>
                <li className={`${currentTheme === 'dark' ? 'text-TextDark hover:text-TextHover' : 'text-TextLight hover:text-TextHover'}`}>Reportes</li>
                <li className={`${currentTheme === 'dark' ? 'text-TextDark hover:text-TextHover' : 'text-TextLight hover:text-TextHover'}`}>Editar Carga</li>
                <li className={`${currentTheme === 'dark' ? 'text-TextDark hover:text-TextHover' : 'text-TextLight hover:text-TextHover'}`}>Crear Usuario</li>
                <li className={`${currentTheme === 'dark' ? 'text-TextDark hover:text-TextHover' : 'text-TextLight hover:text-TextHover'}`}>Exportar</li>
                <li className={`${currentTheme === 'dark' ? 'text-TextDark hover:text-TextHover' : 'text-TextLight hover:text-TextHover'}`}>Cambiar Contraseña</li>
                <li className={`${currentTheme === 'dark' ? 'text-TextDark hover:text-TextHover' : 'text-TextLight hover:text-TextHover'}`}>Salir</li>
            </ul>

            <div class="theme-changer">
                <label role="button" for="checkbox" className={`switch border-2 ${currentTheme === 'dark' ? 'border-TextDark' : 'border-TextLight'}`}>
                    
                    <input type="checkbox" id="checkbox" checked={currentTheme === 'dark' ? !enabledSwitch : enabledSwitch} onClick={() => setEnabledSwitch(!enabledSwitch)}/>
                    { enabledSwitch ? (
                        setTheme("dark")
                    ) : (
                        setTheme("light")
                    )}
                    <span className={`switch__ball ${currentTheme === 'dark' ? 'bg-TextDark' : 'bg-TextLight'}`}></span>
                    <i className= {`bx bx-sun ${currentTheme === 'dark' ? 'text-TextDark' : 'text-TextLight'}`}></i>
                    <i className={`bx bx-moon ${currentTheme === 'dark' ? 'text-TextDark' : 'text-TextLight'}`}></i>
                </label>
                <button className={`${currentTheme === 'dark' ? 'text-TextDark hover:text-TextHover' : 'text-TextLight hover:text-TextHover'}`} id="menu-icon" onClick={() => setNavbar(!navbar)}>
                    {navbar ? (
                        <div class="bx bx-x" id="menu-icon"></div>
                    ) : (
                        <div class="bx bx-menu" id="menu-icon"></div>
                    )}
                    
                </button>
                
            </div>
        </header>
        



        
    );
}
{/*
        <div>
            <nav className={`w-full fixed top-0 left-0 right-0 z-10 ${currentTheme === 'dark' ? 'bg-MainDark' : 'bg-MainLight'}`}>
                <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8 flex">
                    <div className="flex items-left justify-between py-3 md:py-5 md:block">
                        {/* LOGO 
                        <Link href="/">
                            <h2 className="text-2xl text-cyan-600 font-bold ">LOGO</h2>
                        </Link>
                    </div>
                    <div>
                        <div
                            className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                                navbar ? 'p-12 md:p-0 block' : 'hidden'
                              }`}
                        >
                            <ul className="h-screen md:h-auto items-center justify-center md:flex transition ease-in-out delay-500">
                                <li className={`pb-0 text-xl ${currentTheme === 'dark' ? 'text-TextDark hover:text-TextHover' : 'text-TextLight hover:text-TextHover'} py-2 md:py-0 md:px-6 text-center`}>
                                    <button
                                        className=""
                                        type="button"
                                        >
                                        Reportes
                                    </button>
                                </li>
                                <li className={`pb-0 text-xl ${currentTheme === 'dark' ? 'text-TextDark hover:text-TextHover' : 'text-TextLight hover:text-TextHover'} py-2 md:py-0 md:px-6 text-center`}>
                                    <button
                                        className=""
                                        type="button"
                                        onClick={() => [setShowModal(true), setNavbar(!navbar)]}
                                        >
                                        Editar Carga
                                    </button>
                                </li>
                                <li className={`pb-0 text-xl ${currentTheme === 'dark' ? 'text-TextDark hover:text-TextHover' : 'text-TextLight hover:text-TextHover'} py-2 md:py-0 md:px-6 text-center`}>
                                    <button
                                        className=""
                                        type="button"
                                        onClick={() => [setShowModal(true), setNavbar(!navbar)]}
                                        >
                                        Crear Usuario
                                    </button>
                                </li>
                                <li className={`pb-0 text-xl ${currentTheme === 'dark' ? 'text-TextDark hover:text-TextHover' : 'text-TextLight hover:text-TextHover'} py-2 md:py-0 md:px-6 text-center`}>
                                    <button
                                        className=""
                                        type="button"
                                        onClick={() => [setShowModal(true), setNavbar(!navbar)]}
                                        >
                                        Exportar
                                    </button>
                                </li>
                                <li className={`pb-0 text-xl ${currentTheme === 'dark' ? 'text-TextDark hover:text-TextHover' : 'text-TextLight hover:text-TextHover'} py-2 md:py-0 md:px-6 text-center`}>
                                    <button
                                        className=""
                                        type="button"
                                        onClick={() => [setShowModal(true), setNavbar(!navbar)]}
                                    >
                                    Cambiar Contraseña
                                    </button>
                                </li>
                                <li className={`pb-0 text-xl ${currentTheme === 'dark' ? 'text-TextDark hover:text-TextHover' : 'text-TextLight hover:text-TextHover'} py-2 md:py-0 md:px-6 text-center`}>
                                    <button
                                        className=""
                                        type="button"
                                        onClick={() => [setShowModal(true), setNavbar(!navbar)]}
                                    >
                                    Salir
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="flex items-right justify-between py-3 md:py-5 md:block">
                        <Switch
                            checked={enabledSwitch}
                            onChange={setEnabledSwitch}
                            className={`${
                                enabledSwitch ? 'bg-gray-200' : 'bg-gray-200'
                            } relative inline-flex h-6 w-12 items-center rounded-full top-2.5 md:top-1`}
                        >
                            <span
                                className={`${
                                enabledSwitch ? 'translate-x-6' : 'translate-x-1'
                                } inline-block h-5 w-5 transform rounded-full bg-white transition absolute z-10`}
                            />
                            <BiSun className="absolute z-0 ml-1" />
                            <BiMoon className="absolute z-0 ml-7" />
                        </Switch>
                        {/* BOTON MENU PARA CELULAR
                        <div className="md:hidden">
                                <button
                                    className={`p-2 ${currentTheme === 'dark' ? 'text-TextDark' : 'text-TextLight'}`}
                                    onClick={() => setNavbar(!navbar)}
                                >
                                    {navbar ? (
                                        <BiX
                                        className="h-7 w-7"
                                        />
                                    ) : (
                                        <BiMenu
                                        className="h-7 w-7"
                                        />
                                    )}
                                </button>
                        </div>
                    </div>
                </div>
             </nav>
         </div>
                                    */}
export default TopNavbar;
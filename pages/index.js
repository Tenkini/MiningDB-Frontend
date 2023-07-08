import TablaDesplegable from './components/tablaDesplegable';
import TopNavbar from "./components/TopNavbar";
import Login from "./components/login"
import Link from "next/link";
import Script from 'next/script';
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
const MiPagina = () => {

  const data = [
    {
      rajo: "rajo 1",
      DiarioReal: 2000,
      DiarioPlan: 3000,
      KPI: 0.7,
      SemanalISOReal: 2000,
      SemanalISOPlan: 2000,
      KPI2: 0.5,
      SemanalReal: 5000,
      SemanalPlan: 3000,
      KPI3: 0.2,
      MensualReal: 1000,
      MensualPlan: 1000,
      KPI4: 0.6,
      AnualReal: 3000,
      AnualPlan: 3000,
      KPI5: 1,
      fases: [
        {
          fase: "fase 1",
          DiarioReal: 3000,
          DiarioPlan: 4000,
          KPI: 0.6,
          SemanalISOReal: 2000,
          SemanalISOPlan: 2000,
          KPI2: 0.5,
          SemanalReal: 5000,
          SemanalPlan: 3000,
          KPI3: 0.2,
          MensualReal: 1000,
          MensualPlan: 1000,
          KPI4: 0.6,
          AnualReal: 3000,
          AnualPlan: 3000,
          KPI5: 1,
          flotas: [
            {
              flota: "flota 1",
              DiarioReal: 1000,
              DiarioPlan: 2000,
              KPI: 0.5,
              SemanalISOReal: 2000,
              SemanalISOPlan: 2000,
              KPI2: 0.5,
              SemanalReal: 5000,
              SemanalPlan: 3000,
              KPI3: 0.2,
              MensualReal: 1000,
              MensualPlan: 1000,
              KPI4: 0.6,
              AnualReal: 3000,
              AnualPlan: 3000,
              KPI5: 1,
            }
          ]
        }
      ]
    },
    {
      rajo: "rajo 2",
      DiarioReal: 2000,
      DiarioPlan: 3000,
      KPI: 0.7,
      SemanalISOReal: 2000,
      SemanalISOPlan: 2000,
      KPI2: 0.5,
      SemanalReal: 5000,
      SemanalPlan: 3000,
      KPI3: 0.2,
      MensualReal: 1000,
      MensualPlan: 1000,
      KPI4: 0.6,
      AnualReal: 3000,
      AnualPlan: 3000,
      KPI5: 2,
      fases: [
        {
          fase: "fase 1",
          DiarioReal: 3000,
          DiarioPlan: 4000,
          KPI: 0.6,
          SemanalISOReal: 2000,
          SemanalISOPlan: 2000,
          KPI2: 0.5,
          SemanalReal: 5000,
          SemanalPlan: 3000,
          KPI3: 0.2,
          MensualReal: 1000,
          MensualPlan: 1000,
          KPI4: 0.6,
          AnualReal: 3000,
          AnualPlan: 3000,
          KPI5: 1,
          flotas: [
            {
              flota: "flota 1",
              DiarioReal: 1000,
              DiarioPlan: 2000,
              KPI: 0.9,
              SemanalISOReal: 2000,
              SemanalISOPlan: 2000,
              KPI2: 0.5,
              SemanalReal: 5000,
              SemanalPlan: 3000,
              KPI3: 0.2,
              MensualReal: 1000,
              MensualPlan: 1000,
              KPI4: 0.6,
              AnualReal: 3000,
              AnualPlan: 3000,
              KPI5: 1,
            }
          ]
        }
      ]
    }
  ];
  const [mounted, setMounted] = useState(false)
  const [loged,setLoged] = useState(false)
  const login = ()=> setLoged(true)
  useEffect(()=> setMounted(true), [])
  if(!mounted) return null
  return (
    
    
    <div className='w-screen h-screen bg-BgLight dark:bg-BgDark'>

      { loged === false ? <Login login={login}/> :  <div><TopNavbar/><TablaDesplegable data={data}/></div>    }
      

    </div>
    
  );
};

export default MiPagina;

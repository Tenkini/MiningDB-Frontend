import TablaDesplegable from './tablaDesplegable';
import Script from 'next/script';

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

  return (
    <div>
      <TablaDesplegable data={data} />
    </div>
  );
};

export default MiPagina;

import TablaDesplegable from './tablaDesplegable';

const MiPagina = () => {
  const data = [
    {
      rajo: "rajo 1",
      DiarioReal: 2000,
      DiarioPlan: 3000,
      KPI: 0.7,
      fases: [
        {
          fase: "fase 1",
          DiarioReal: 3000,
          DiarioPlan: 4000,
          KPI: 0.6,
          flotas: [
            {
              flota: "flota 1",
              DiarioReal: 1000,
              DiarioPlan: 2000,
              KPI: 0.5
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
      fases: [
        {
          fase: "fase 1",
          DiarioReal: 3000,
          DiarioPlan: 4000,
          KPI: 0.6,
          flotas: [
            {
              flota: "flota 1",
              DiarioReal: 1000,
              DiarioPlan: 2000,
              KPI: 0.9
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

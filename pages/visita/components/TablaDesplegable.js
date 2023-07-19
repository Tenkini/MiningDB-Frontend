import React, { useState } from 'react';
import { BiPlusCircle, BiMinusCircle} from "react-icons/bi";

function TablaDesplegable({ datos, setDatos, fetchData }){
  const [expandedRows, setExpandedRows] = useState([]);

  const toggleRow = (index) => {
    const newExpandedRows = [...expandedRows];
    if (newExpandedRows.includes(index)) {
      const idx = newExpandedRows.indexOf(index);
      newExpandedRows.splice(idx, 1);
    } else {
      newExpandedRows.push(index);
    }
    setExpandedRows(newExpandedRows);
  };

  const renderRedCircle = () => (
    <svg
      className="w-4 h-4 fill-current text-red-500"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="12" />
    </svg>
  );

  return (
    <>
      {datos.map((rajo, rajoIndex) => {
        const isRajoExpanded = expandedRows.includes(rajoIndex);
        const rowAnimationClass = isRajoExpanded ? 'row-expanded' : '';
        return (
          <div className={`overflow-x-auto text-left bg-MainLight dark:bg-MainDark border border-separate border-spacing-0 border-BorderLight dark:border-BorderDark rounded-3xl mb-10 mx-4 shadow-[0px_0px_15px_rgba(114,114,113,0.3)] '`}>
            <table className="table-auto text-TextLight dark:text-TextDark w-full" key={rajoIndex}>
              <thead>
                <tr>
                  <th className='border-b border-custom-gray'></th>
                  <th className="p-2 border-b border-custom-gray">rajo</th>
                  <th className="p-2 border-b border-custom-gray">fase</th>
                  <th className="p-2 border-b border-custom-gray">flota</th>
                  <th className="p-2 border-b border-custom-gray">Diario Real</th>
                  <th className="p-2 border-b border-custom-gray">Diario Plan</th>
                  <th className="p-2 border-b border-custom-gray">KPI</th>
                  <th className="p-2 border-b border-custom-gray">Semanal ISO Real</th>
                  <th className="p-2 border-b border-custom-gray">Semanal ISO Plan</th>
                  <th className="p-2 border-b border-custom-gray">KPI</th>
                  <th className="p-2 border-b border-custom-gray">Semanal Real Real</th>
                  <th className="p-2 border-b border-custom-gray">Semanal Real Plan</th>
                  <th className="p-2 border-b border-custom-gray">KPI</th>
                  <th className="p-2 border-b border-custom-gray">Mensual Real</th>
                  <th className="p-2 border-b border-custom-gray">Mensual Plan</th>
                  <th className="p-2 border-b border-custom-gray">KPI</th>
                  <th className="p-2 border-b border-custom-gray">Anual Real</th>
                  <th className="p-2 border-b border-custom-gray">Anual Plan</th>
                  <th className="p-2 border-b border-custom-gray">KPI</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <button
                      className={`flex items-center justify-center w-10 h-10 expand-button ${isRajoExpanded ? 'expanded' : ''} `}
                      onClick={() => toggleRow(rajoIndex)}
                    >
                      {isRajoExpanded ? <BiMinusCircle className='w-6 h-6'/> : <BiPlusCircle className='w-6 h-6'/>}
                    </button>
                  </td>
                  <td className="p-2">{rajo.rajo}</td>
                  <td className="p-2"></td>
                  <td className="p-2"></td>
                  <td className="p-2">{rajo.DiarioReal}</td>
                  <td className="p-2">{rajo.DiarioPlan}</td>
                  <td className="p-2">{rajo.KPI === 0 ? renderRedCircle() : null}</td>
                  <td className="p-2">{rajo.SemanalISOReal}</td>
                  <td className="p-2">{rajo.SemanalISOPlan}</td>
                  <td className="p-2">{rajo.KPI2 === 0 ? renderRedCircle() : null}</td>
                  <td className="p-2">{rajo.SemanalReal}</td>
                  <td className="p-2">{rajo.SemanalPlan}</td>
                  <td className="p-2">{rajo.KPI3 === 0 ? renderRedCircle() : null}</td>
                  <td className="p-2">{rajo.MensualReal}</td>
                  <td className="p-2">{rajo.MensualPlan}</td>
                  <td className="p-2">{rajo.KPI4 === 0 ? renderRedCircle() : null}</td>
                  <td className="p-2">{rajo.AnualReal}</td>
                  <td className="p-2">{rajo.AnualPlan}</td>
                  <td className="p-2">{rajo.KPI5 === 0 ? renderRedCircle() : null}</td>
                </tr>
                {isRajoExpanded &&
                  rajo.fases.map((fase, faseIndex) => {
                    const isFaseExpanded = expandedRows.includes(`${rajoIndex}-${faseIndex}`);

                    return (
                      <React.Fragment key={faseIndex}>
                        <tr className={`${rowAnimationClass}`}>
                          <td className='border-t border-custom-gray'></td>
                          <td className='border-t border-custom-gray'>
                            <div className='flex items-center justify-center h-full'>
                              <button
                                  className={`flex items-center justify-center w-10 h-10 expand-button ${isFaseExpanded ? 'expanded' : ''}`}
                                  onClick={() => toggleRow(`${rajoIndex}-${faseIndex}`)}
                                >
                                  {isFaseExpanded ? <BiMinusCircle className='w-6 h-6'/> : <BiPlusCircle className='w-6 h-6'/>}
                                </button>
                            </div>
                          </td>
                          <td className='border-t border-custom-gray'>
                            {fase.fase}
                          </td>
                          <td className='border-t border-custom-gray'></td>
                          <td className="p-2 border-t border-custom-gray">{fase.DiarioReal}</td>
                          <td className="p-2 border-t border-custom-gray">{fase.DiarioPlan}</td>
                          <td className="p-2 border-t border-custom-gray">{fase.KPI === 0 ? renderRedCircle() : null}</td>
                          <td className="p-2 border-t border-custom-gray">{fase.SemanalISOReal}</td>
                          <td className="p-2 border-t border-custom-gray">{fase.SemanalISOPlan}</td>
                          <td className="p-2 border-t border-custom-gray">{fase.KPI2 === 0 ? renderRedCircle() : null}</td>
                          <td className="p-2 border-t border-custom-gray">{fase.SemanalReal}</td>
                          <td className="p-2 border-t border-custom-gray">{fase.SemanalPlan}</td>
                          <td className="p-2 border-t border-custom-gray">{fase.KPI3 === 0 ? renderRedCircle() : null}</td>
                          <td className="p-2 border-t border-custom-gray">{fase.MensualReal}</td>
                          <td className="p-2 border-t border-custom-gray">{fase.MensualPlan}</td>
                          <td className="p-2 border-t border-custom-gray">{fase.KPI4 === 0 ? renderRedCircle() : null}</td>
                          <td className="p-2 border-t border-custom-gray">{fase.AnualReal}</td>
                          <td className="p-2 border-t border-custom-gray">{fase.AnualPlan}</td>
                          <td className="p-2 border-t border-custom-gray">{fase.KPI5 === 0 ? renderRedCircle() : null}</td>
                        </tr>
                        {isFaseExpanded &&
                          fase.flotas.map((flota, flotaIndex) => (
                            <tr
                              key={flotaIndex}
                              className={`child-row ${rowAnimationClass}`}
                            >
                              <td className='border-t border-custom-gray'></td>
                              <td className='border-t border-custom-gray'></td>
                              <td className='border-t border-custom-gray'></td>
                              <td className="p-2 border-t border-custom-gray">{flota.flota}</td>
                              <td className="p-2 border-t border-custom-gray">{flota.DiarioReal}</td>
                              <td className="p-2 border-t border-custom-gray">{flota.DiarioPlan}</td>
                              <td className="p-2 border-t border-custom-gray">{flota.KPI}</td>
                              <td className="p-2 border-t border-custom-gray">{flota.SemanalISOReal}</td>
                              <td className="p-2 border-t border-custom-gray">{flota.SemanalISOPlan}</td>
                              <td className="p-2 border-t border-custom-gray">{flota.KPI2}</td>
                              <td className="p-2 border-t border-custom-gray">{flota.SemanalReal}</td>
                              <td className="p-2 border-t border-custom-gray">{flota.SemanalPlan}</td>
                              <td className="p-2 border-t border-custom-gray">{flota.KPI3}</td>
                              <td className="p-2 border-t border-custom-gray">{flota.MensualReal}</td>
                              <td className="p-2 border-t border-custom-gray">{flota.MensualPlan}</td>
                              <td className="p-2 border-t border-custom-gray">{flota.KPI4}</td>
                              <td className="p-2 border-t border-custom-gray">{flota.AnualReal}</td>
                              <td className="p-2 border-t border-custom-gray">{flota.AnualPlan}</td>
                              <td className="p-2 border-t border-custom-gray">{flota.KPI5}</td>
                            </tr>
                          ))}
                      </React.Fragment>
                    );
                  })}
              </tbody>
            </table>
          </div>
        );
      })}
    </>
  );
};

export default TablaDesplegable;

import React, { useState } from 'react';

const TablaDesplegable = ({ data }) => {
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

  return (
    <>
      {data.map((rajo, rajoIndex) => {
        const isRajoExpanded = expandedRows.includes(rajoIndex);

        return (
          <table className="table-auto" key={rajoIndex}>
            <thead>
              <tr>
                <th></th>
                <th className="p-2">rajo</th>
                <th className="p-2">fase</th>
                <th className="p-2">flota</th>
                <th className="p-2">Diario Real</th>
                <th className="p-2">Diario Plan</th>
                <th className="p-2">KPI</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <button
                    className={`expand-button ${isRajoExpanded ? 'expanded' : ''}`}
                    onClick={() => toggleRow(rajoIndex)}
                  >
                    {isRajoExpanded ? '-' : '+'}
                  </button>
                </td>
                <td className="p-2">{rajo.rajo}</td>
                <td></td>
                <td></td>
                <td className="p-2">{rajo.DiarioReal}</td>
                <td className="p-2">{rajo.DiarioPlan}</td>
                <td className="p-2">{rajo.KPI}</td>
              </tr>
              {isRajoExpanded &&
                rajo.fases.map((fase, faseIndex) => {
                  const isFaseExpanded = expandedRows.includes(`${rajoIndex}-${faseIndex}`);

                  return (
                    <React.Fragment key={faseIndex}>
                      <tr>
                        <td></td>
                        <td></td>
                        <td>
                          <button
                            className={`expand-button ${isFaseExpanded ? 'expanded' : ''}`}
                            onClick={() => toggleRow(`${rajoIndex}-${faseIndex}`)}
                          >
                            {isFaseExpanded ? '-' : '+'}
                          </button>
                          {fase.fase}
                        </td>
                        <td></td>
                        <td className="p-2">{fase.DiarioReal}</td>
                        <td className="p-2">{fase.DiarioPlan}</td>
                        <td className="p-2">{fase.KPI}</td>
                      </tr>
                      {isFaseExpanded &&
                        fase.flotas.map((flota, flotaIndex) => (
                          <tr
                            key={flotaIndex}
                            className={`child-row`}
                          >
                            <td></td>
                            <td></td>
                            <td></td>
                            <td className="p-2">{flota.flota}</td>
                            <td className="p-2">{flota.DiarioReal}</td>
                            <td className="p-2">{flota.DiarioPlan}</td>
                            <td className="p-2">{flota.KPI}</td>
                          </tr>
                        ))}
                    </React.Fragment>
                  );
                })}
            </tbody>
          </table>
        );
      })}
    </>
  );
};

export default TablaDesplegable;

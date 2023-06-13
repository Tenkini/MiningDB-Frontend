import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primeicons/primeicons.css';
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProductServiceRajo } from './tableData/rajoData';
import { ProductServiceFase } from './tableData/faseData';
import { ProductServiceFlota} from './tableData/flotaData';

export default function StripedRowsDemo() {
  const [productsRajo, setProductsRajo] = useState([]);
  const [productsFase, setProductsFase] = useState([]);
  const [productsFlota, setProductsFlota] = useState([]);
  const [expandedRowsRajo, setExpandedRowsRajo] = useState([]);
  const [expandedRowsFase, setExpandedRowsFase] = useState([]);

  const onRowToggleRajo = (event) => {
    setExpandedRowsRajo(event.data);
  };

  const onRowToggleFase = (event) => {
    setExpandedRowsFase(event.data);
  };

  useEffect(() => {
    ProductServiceRajo.getProductsMini().then((data) => setProductsRajo(data));
    ProductServiceFase.getProductsMini().then((data) => setProductsFase(data));
    ProductServiceFlota.getProductsMini().then((data) => setProductsFlota(data));
  }, []);

  const expandedRowFase = (rowData) => {
    return (
      <div className="expanded-row-content p-0">
        <DataTable
          value={rowData} // Pass the expanded row data as an array
          expandedRows={expandedRowsFase}
          onRowToggle={onRowToggleFase}
          rowExpansionTemplate={expandedRowFlota(productsFlota)}
          className="p-datatable-expanded-row" // Add the hide-header class
          tableStyle={{ width: '100%'}}
          
          // Set the header to null to hide it
        >
          <Column 
          style={{ width: '4rem', textAlign: 'center'}}
          bodyStyle={{ textAlign: 'center'}}
          />
          <Column header="Rajo"
          expander
          style={{ width: '4rem', textAlign: 'center'}}
          bodyStyle={{ textAlign: 'center' }}
          headerStyle={{ textAlign: 'center' }}
          />
          <Column field="Fase" header="Fase"/>
          <Column header="Flota"/>
          <Column field="DiarioReal" header="Diario Real"/>
          <Column field="DiarioPlan" header="Diario Plan"/>
          <Column field="KPI1" header="KPI"/>
          <Column field="SemanaISOReal" header="Semana ISO Real"/>
          <Column field="SemanaISOPlan" header="Semana ISO Plan"/>
          <Column field="KPI2" header="KPI"/>
          <Column field="SemanaReal" header="Semana Real" />
          <Column field="SemanaPlan" header="Semana Plan" />
          <Column field="KPI3" header="KPI" />
          <Column field="MensualReal" header="Mensual Real" />
          <Column field="MensualPlan" header="Mensual Plan" />
          <Column field="KPI4" header="KPI" />
          <Column field="AnualReal" header="Anual Real" />
          <Column field="AnualPlan" header="Anual Plan" />
          <Column field="KPI5" header="KPI" />
        </DataTable>
      </div>
    );
  };
  
  const expandedRowFlota = (rowData) => {
    return (
      <div className="expanded-row-content">
        <DataTable
          value={rowData} // Pass the expanded row data as an array
          className="p-datatable-expanded-row hide-header" // Add the hide-header class
          tableStyle={{ width: '100%' }}
          header={null} // Set the header to null to hide it
          style={{padding: 0}}
        >
          <Column/>
          <Column/>
          <Column/>
          <Column field="Flota"/>
          <Column field="DiarioReal" />
          <Column field="DiarioPlan" />
          <Column field="KPI1" />
          <Column field="SemanaISOReal" />
          <Column field="SemanaISOPlan" />
          <Column field="KPI2" />
          <Column field="SemanaReal" />
          <Column field="SemanaPlan" />
          <Column field="KPI3" />
          <Column field="MensualReal" />
          <Column field="MensualPlan" />
          <Column field="KPI4" />
          <Column field="AnualReal" />
          <Column field="AnualPlan" />
          <Column field="KPI5" />
        </DataTable>
      </div>
    );
  };

  return (
    <div className="card">
      <div className="banner flex justify-center">
        <button className="banner-button hover:bg-blue-600 text-grey font-bold py-2 px-4 rounded mx-2">
          Reportes
        </button>
        <button className="banner-button hover:bg-blue-600 text-grey font-bold py-2 px-4 rounded mx-2">
          Editar carga
        </button>
        <button className="banner-button hover:bg-blue-600 text-grey font-bold py-2 px-4 rounded mx-2">
          Crear usuario
        </button>
        <button className="banner-button hover:bg-blue-600 text-grey font-bold py-2 px-4 rounded mx-2">
          Exportar
        </button>
        <button className="banner-button hover:bg-blue-600 text-grey font-bold py-2 px-4 rounded mx-2">
          Salir
        </button>
      </div>
      <DataTable
        value={productsRajo}
        expandedRows={expandedRowsRajo}
        onRowToggle={onRowToggleRajo}
        rowExpansionTemplate={expandedRowFase(productsFase)}
        className="p-datatable-striped p-datatable-hoverable-rows"
        tableStyle={{ minWidth: '50rem'}}
      >
        <Column
          expander
          style={{ width: '3rem', textAlign: 'center' }}
          bodyStyle={{ textAlign: 'center' }}
          headerStyle={{ textAlign: 'center' }}
        />
        <Column field="Rajo" header="Rajo" />
        <Column header="Fase"/>
        <Column header="Flota"/>
        <Column field="DiarioReal" header="Diario Real" />
        <Column field="DiarioPlan" header="Diario Plan" />
        <Column field="KPI1" header="KPI" />
        <Column field="SemanaISOReal" header="Semana ISO Real" />
        <Column field="SemanaISOPlan" header="Semana ISO Plan" />
        <Column field="KPI2" header="KPI" />
        <Column field="SemanaReal" header="Semana Real" />
        <Column field="SemanaPlan" header="Semana Plan" />
        <Column field="KPI3" header="KPI" />
        <Column field="MensualReal" header="Mensual Real" />
        <Column field="MensualPlan" header="Mensual Plan" />
        <Column field="KPI4" header="KPI" />
        <Column field="AnualReal" header="Anual Real" />
        <Column field="AnualPlan" header="Anual Plan" />
        <Column field="KPI5" header="KPI" />
      </DataTable>
      
    </div>
  );
}

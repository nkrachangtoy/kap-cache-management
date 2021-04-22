import React, { useState } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const Grid = () => {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);

  const [rowData, setRowData] = useState([
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 },
    { make: 'Porsche', model: 'Boxter', price: 72000 },
  ]);

  return (
    <div className='ag-theme-alpine grid'>
      <AgGridReact rowData={rowData}>
        <AgGridColumn field='make' sortable={true} filter={true}></AgGridColumn>
        <AgGridColumn
          field='model'
          sortable={true}
          filter={true}
        ></AgGridColumn>
        <AgGridColumn
          field='price'
          sortable={true}
          filter={true}
        ></AgGridColumn>
      </AgGridReact>
    </div>
  );
};

export default Grid;

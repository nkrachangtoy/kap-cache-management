import React, { useState, useEffect } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import { getAllKeys } from '../network/network';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { Button } from '@material-ui/core';

const Grid = () => {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [rowData, setRowData] = useState([]);
  const [columnDefs, setColumnDefs] = useState([
    { headerName: 'ID', field: 'id', sortable: true, filter: true },
    {
      headerName: 'First Name',
      field: 'first_name',
      sortable: true,
      filter: true,
    },
    {
      headerName: 'Last Name',
      field: 'last_name',
      sortable: true,
      filter: true,
    },
    { headerName: 'Email', field: 'email', sortable: true, filter: true },
  ]);

  const handleGetSelectedRows = () => {
    console.log();
  };

  useEffect(() => {
    (async () => {
      const result = await getAllKeys();
      setRowData(result);
    })();
  }, []);

  return (
    <div className='ag-theme-balham grid'>
      <Button onClick={handleGetSelectedRows}>Get selected rows</Button>
      <AgGridReact
        columnDefs={columnDefs}
        rowData={rowData}
        rowSelection='multiple'
      />
    </div>
  );
};

export default Grid;

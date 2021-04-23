import React, { useState, useEffect } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import { getAllKeys } from '../network/network';
import { Button } from '@material-ui/core';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

interface IColumnDef {
  headerName: string;
  field: string;
  sortable?: boolean;
  filter?: boolean;
}

interface IRowData {
  //field1: string etc.
}

const Grid = () => {
  const [gridApi, setGridApi] = useState<null | {}>(null);
  // const [gridColumnApi, setGridColumnApi] = useState(null);
  const [rowData, setRowData] = useState<Array<IRowData>>([]);
  const [columnDefs] = useState<Array<IColumnDef>>([
    {
      headerName: 'Key Name',
      field: 'keyName',
      sortable: true,
      filter: true,
    },
    {
      headerName: 'Subset',
      field: 'subset',
      sortable: true,
      filter: true,
    },
    { headerName: 'OrgId', field: 'orgId', sortable: true, filter: true },
  ]);

  // const handleGetSelectedRows = () => {
  //   const selectedNodes = gridApi.getSelectedNodes();
  //   const selectedData = selectedNodes.map((node) => node.data);
  //   const selectedDataStringPresentation = selectData
  //     .map((node) => node.first_name + ' ' + node.last_name)
  //     .join(', ');
  //   alert(`You selected the following rows: ${selectedDataStringPresentation}`);
  //   // console.log();
  // };

  useEffect(() => {
    (async () => {
      const result = await getAllKeys();
      setRowData(result);
    })();
  }, []);

  return (
    <div className='ag-theme-balham grid'>
      {/* <Button onClick={handleGetSelectedRows}>Get selected rows</Button> */}
      <AgGridReact
        columnDefs={columnDefs}
        rowData={rowData}
        rowSelection='multiple'
        onGridReady={(params) => {
          setGridApi(params.api);
          console.log('PARAMS', params.api);
        }}
      />
    </div>
  );
};

export default Grid;

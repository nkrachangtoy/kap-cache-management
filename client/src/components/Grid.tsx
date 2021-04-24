import React, { useState, useEffect } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

interface IColumnDef {
  headerName: string;
  field: string;
  sortable?: boolean;
  filter?: boolean;
}

interface IRowData {
  keyName: string, 
  subset: string, 
  orgId: string
}

interface GridProps {
  rowData: IRowData[];
}

const Grid:React.FC<GridProps> = ({rowData}) => {
  const [gridApi, setGridApi] = useState<null | {}>(null);
  // const [gridColumnApi, setGridColumnApi] = useState(null);
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

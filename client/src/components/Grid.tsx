import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

interface IColumnDef {
  headerName: string;
  field?: string;
  sortable?: boolean;
  filter?: boolean;
  checkboxSelection?: boolean;
  flex?: number;
}

interface IRowData {
  keys: Array<IKey>;
  totalKeyCount: number;
  pageSize: number;
  totalPages: number;
}

interface IKey {
  keyName: string;
  // subset: string;
  // orgId: string;
}

interface GridProps {
  rowData: any;
  handleGetSelectedRows: (row: Array<IRowData>) => void;
}

const Grid: React.FC<GridProps> = ({ rowData, handleGetSelectedRows }) => {
  const [gridApi, setGridApi] = useState<null | any>(null);
  // const [gridColumnApi, setGridColumnApi] = useState(null);
  const [numFields, setNumFields] = useState<number>(1);
  const [columnDefs] = useState<Array<IColumnDef>>([
    { headerName: "Select", checkboxSelection: true },
    {
      headerName: "Key Name",
      field: "keyName",
      sortable: true,
      filter: true,
      flex: 2,
    },
    // {
    //   headerName: "Subset",
    //   field: "subset",
    //   sortable: true,
    //   filter: true,
    //   flex: 2,
    // },
    // {
    //   headerName: "OrgId",
    //   field: "orgId",
    //   sortable: true,
    //   filter: true,
    //   flex: 2,
    // },
  ]);

  const handleSelected = () => {
    const selectedNodes = gridApi.getSelectedNodes();
    console.log("selectedNodes >>", selectedNodes);
    const selectedData = selectedNodes.map((node: any) => node.data);
    handleGetSelectedRows(selectedData);
  };

  const findNumColumns = (rowData: any) => {
    rowData?.keys?.map((key: any) => {
      // console.log(key.keyName);
      const split = key?.keyName?.split("#");
      //console.log("split >>", split);
      if (split?.length > numFields) {
        setNumFields(split?.length);
      }
    });
  };

  // const makeColumns = (rowData: any) => {
  //   let splitKeys: any;
  //   rowData.map((row) => {
  //     const split = row.split("#");

  //     if (row.split("#").length > numFields) {
  //       numFields = row.split("#").length;
  //     }
  //   });
  // };

  useEffect(() => {
    findNumColumns(rowData);
    console.log("num of fields: ", numFields);
  }, [rowData]);

  return (
    <div className="ag-theme-balham grid">
      {/* <Button onClick={handleGetSelectedRows}>Get selected rows</Button> */}
      <AgGridReact
        columnDefs={columnDefs}
        rowData={rowData?.keys}
        rowSelection="multiple"
        onGridReady={(params) => {
          setGridApi(params.api);
          console.log("PARAMS", params.api);
        }}
        onRowClicked={(event) => {
          console.log("a row has been clicked>>", event.data);
          handleGetSelectedRows(event.data);
        }}
        onRowSelected={handleSelected}
      />
    </div>
  );
};

export default Grid;

import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import { ValueCache } from "ag-grid-community";

interface IColumnDef {
  headerName: string;
  field?: string;
  sortable?: boolean;
  filter?: boolean;
  headerCheckboxSelection?: boolean;
  checkboxSelection?: boolean;
  lockPosition?: boolean;
  flex: number;
  cellRenderParams?: object;
  cellRenderer?: string;
}

interface IRowData {
  keys: Array<string>;
  totalKeyCount: number;
  pageSize: number;
  totalPages: number;
}

interface IKeyValue{
  keyName: string;
  valueString: string;
}

interface GridProps {
  rowData: any;
  handleGetSelectedRows: (row: Array<IRowData>) => void;
  keyValue: IKeyValue;
}

const Grid: React.FC<GridProps> = ({ rowData, handleGetSelectedRows, keyValue }) => {
  const [gridApi, setGridApi] = useState<null | any>(null);
  // const [gridColumnApi, setGridColumnApi] = useState(null);
  const [numFields, setNumFields] = useState<number>(1);
  const [destructuredKeys, setDestructuredKeys] = useState<null | any>(null);
  const [columnDefs, setColumnDefs] = useState<Array<IColumnDef>>([
    {
      headerName: "Select",
      checkboxSelection: true,
      headerCheckboxSelection: true,
      flex: 1,
    },
    {
      headerName: "Key Name",
      field: "field0",
      sortable: true,
      filter: true,
      flex: 1,
    },
  ]);

  /**
   * Adds data of rows selected in the grid to an array that is passed to Main.tsx
   * @return Array of objects as it is stored in the grid (keys will be destructured)
   */

  const handleSelected = () => {
    //const selectedNodes = gridApi.getSelectedNodes();
    //const selectedData = selectedNodes.map((node: any) => node.data);
    const selectedData = gridApi.getSelectedRows();
    console.log("selectedRows >>", selectedData);
    handleGetSelectedRows(selectedData);
  };

  /**
   *Finds number of columns needed in grid by counting max number of fields needed
   * @param rowData
   * @return sets NumFields state to a number
   */

  const findNumColumns = (rowData: any) => {
    let n: number = 1;
    rowData?.keys?.map((key: any) => {
      const split = key?.keyName?.split("#");
      //console.log("split>>", split);
      if (split?.length > numFields) {
        n = split?.length;
      }
    });
    setNumFields(n);
  };

  /**
   * Creates columns definitions for AgGrid based on the number of fields (numFields) needed
   * @return sets ColumnDefs state to Array<IColumnDef>
   */

  const makeColumns = () => {
    let i: number = 0;
    let column: IColumnDef;
    let columns: Array<IColumnDef> = [
      {
        headerName: "Select",
        checkboxSelection: true,
        headerCheckboxSelection: true,
        lockPosition: true,
        flex: 1,
      },
    ];

    if (numFields > 1) {
      do {
        column = {
          headerName: `Field${i}`,
          field: `field${i}`,
          sortable: true,
          filter: true,
          flex: 2,
        }
        ;
        columns.push(column);
        i++;
      } while (i < numFields);
      setColumnDefs(columns);
      console.log("column definitions>>", columns);
    }

    
  };

  /**
   * Separates key strings into fields separated by `#`
   * @param rowData
   * @return Array of key objects
   */

  const destructureKeys = (rowData: any) => {
    let splitKeys: Array<object> = [];
    rowData?.keys?.map((key: any) => {
      const splitArr = key?.keyName?.split("#");
      let splitObj: object = {};
      let i: number = 0;

      do {
        splitObj = { ...splitObj, [`field${i}`]: splitArr[i] };
        i++;
      } while (i < splitArr?.length);

      //console.log("Split Object >> ", splitObj);
      splitKeys.push(splitObj);
    });
    console.log("Split Keys Array >> ", splitKeys);
    setDestructuredKeys(splitKeys);
  };

  useEffect(() => {
    findNumColumns(rowData);
  }, [rowData]);

  useEffect(() => {
    console.log("num of fields: ", numFields);
    makeColumns();
    destructureKeys(rowData);
  }, [numFields]);

  return (
    <div className="ag-theme-balham grid">
      {/* <button onClick={() => gridApi.selectAll()}>Select All</button>
      <button onClick={() => gridApi.deselectAll()}>Deselect All</button> */}
      <AgGridReact
        columnDefs={columnDefs}
        rowData={destructuredKeys ? destructuredKeys : rowData.keys}
        //rowData={rowData.keys}
        rowSelection="multiple"
        onGridReady={(params) => {
          setGridApi(params.api);
          console.log("PARAMS", params.api);
        }}
        // onRowClicked={(event) => {
        //   console.log("a row has been clicked>>", event.data);
        //   handleGetSelectedRows(event.data);
        // }}
        onRowSelected={handleSelected}
      />
    </div>
  );
};

export default Grid;

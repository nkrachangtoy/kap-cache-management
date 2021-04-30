import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import { TramRounded } from "@material-ui/icons";

interface IColumnDef {
  headerName: string;
  field?: string;
  sortable?: boolean;
  filter?: boolean;
  checkboxSelection?: boolean;
  flex?: number;
  lockPosition?: boolean;
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
  const [destructuredKeys, setDestructuredKeys] = useState<null | any>(null);
  const [columnDefs, setColumnDefs] = useState<Array<IColumnDef>>([
    { headerName: "Select", checkboxSelection: true },
    {
      headerName: "Key Name",
      field: "field0",
      sortable: true,
      filter: true,
      flex: 2,
    },
  ]);

  const handleSelected = () => {
    const selectedNodes = gridApi.getSelectedNodes();
    console.log("selectedNodes >>", selectedNodes);
    const selectedData = selectedNodes.map((node: any) => node.data);
    handleGetSelectedRows(selectedData);
  };

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

  const makeColumns = () => {
    let i: number = 0;
    let column: IColumnDef;
    let columns: Array<IColumnDef> = [
      {
        headerName: "Select",
        checkboxSelection: true,
        lockPosition: true,
        flex: 1,
      },
    ];

    if (numFields > 1) {
      console.log("entered if loop");
      do {
        console.log("do while #", i);
        column = {
          headerName: `Field${i}`,
          field: `field${i}`,
          sortable: true,
          filter: true,
          flex: 2,
        };

        columns.push(column);
        console.log("column definitions 1>>", columns);
        i++;
      } while (i < numFields);

      console.log("column definitions 2>>", columns);
      setColumnDefs(columns);
    } else {
      console.log("if loop skipped");
    }
  };

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
    (async () => {
      await findNumColumns(rowData);
    })();
    // console.log("num of fields: ", numFields);
    // makeColumns();
    // destructureKeys(rowData);
  }, [rowData]);

  useEffect(() => {
    console.log("num of fields: #2>>>>>> ", numFields);
    makeColumns();
    destructureKeys(rowData);
  }, [numFields]);

  return (
    <div className="ag-theme-balham grid">
      {/* <Button onClick={handleGetSelectedRows}>Get selected rows</Button> */}
      <AgGridReact
        columnDefs={columnDefs}
        rowData={destructuredKeys ? destructuredKeys : rowData.keys}
        //rowData={rowData.keys}
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

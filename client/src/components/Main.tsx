import React, { useEffect, useState } from "react";
import Grid from "./Grid";

import Pagination from "./Pagination";
import {
  deleteKeyBySelection,
  getAllKeys,
  getKeyValue,
  postNewKeyValue,
  searchKeys,
} from "../network/network";
import Search from "./Search";
import { getPage } from "../network/network";
import SideDrawer from "./SideDrawer";
import { deleteKeyByQuery } from "./../network/network";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

interface IRowData {
  keys: Array<IKey>;
  totalKeyCount: number;
  pageSize: number;
  totalPages: number;
}

interface IKey {
  keyName: string;
  subset: string;
  orgId: string;
  value?: object;
}

interface IKeyValue {
  //Need to refactor this to reduce redundacy above
  keyName: string;
  subset: string;
  orgId: string;
  valueString: string;
}

const Main = () => {
  const [rowData, setRowData] = useState<IRowData | object>({});
  const [pageNum, setPageNum] = useState<number>(1);
  const [selectedRows, setSelectedRows] = useState<Array<IRowData>>([]);
  const [deleteQuery, setDeleteQuery] = useState<string>("");
  const [keyValue, setKeyValue] = useState<IKeyValue>({
    keyName: "",
    subset: "",
    orgId: "",
    valueString: "",
  });

  const handlePageNext = async () => {
    const data = await getPage(pageNum + 1);
    setPageNum(pageNum + 1);
    setRowData(data);
  };

  const handlePageBack = async () => {
    if (pageNum !== 1) {
      setPageNum(pageNum - 1);
      const data = await getPage(pageNum - 1);
      setRowData(data);
    }
  };

  const handleSearch = async (query: string) => {
    const data = await searchKeys(query);
    setRowData(data);
  };

  const handleGetSelectedRows = async (row: any) => {
    if (row.length === 1) {
      const data = await getKeyValue(row);
      row[0].value = data;
    }
    setSelectedRows(row);
  };

  const handleDeleteByQuery = async () => {
    const data = await deleteKeyByQuery(deleteQuery);
    await handleGetAllKeys();
    console.log(`delete query: ${deleteQuery}, result:`, data);
  };

  const handleDeleteBySelection = async () => {
    console.log("selected Rows for deletion", selectedRows);
    await deleteKeyBySelection(selectedRows);
    await handleGetAllKeys(); //this is slow, set up a spinner???
  };

  const handleAddNewKey = async () => {
    const data = await postNewKeyValue(keyValue);
    data &&
      setKeyValue({
        keyName: "",
        subset: "",
        orgId: "",
        valueString: "",
      });
    await handleGetAllKeys();
  };

  const handleGetAllKeys = async () => {
    const result = await getAllKeys();
    setRowData(result);
    console.log("ROW DATA", result);
  };

  const handleReset = async () => {
    await handleGetAllKeys();
    setSelectedRows([]);
  };


  useEffect(() => {
    (async () => {
      await handleGetAllKeys();
    })();
  }, []);

  return (
    <div className="mainContainer">
      <div className="mainContainer__toolbar">
        <span>Results</span>
        <div className="mainContainer__actions">
          <button>
            Filter
          </button>
          <button>
            <MoreHorizIcon />
          </button>
          <Search handleSearch={handleSearch} handleReset={handleReset} />
        </div>
      </div>
      <div className="mainContainer__contentWrapper">
        <div className="mainContainer__gridWrapper">
          <Grid rowData={rowData} handleGetSelectedRows={handleGetSelectedRows} />
          <Pagination
          pageNum={pageNum}
          handlePageNext={handlePageNext}
          handlePageBack={handlePageBack}
          rowData={rowData}
          />
        </div>
        <SideDrawer
          selectedRows={selectedRows}
          handleDeleteByQuery={handleDeleteByQuery}
          handleAddNewKey={handleAddNewKey}
          keyValue={keyValue}
          setKeyValue={setKeyValue}
          deleteQuery={deleteQuery}
          setDeleteQuery={setDeleteQuery}
          handleDeleteBySelection={handleDeleteBySelection}
        />
      </div>
    </div>
  );
};

export default Main;

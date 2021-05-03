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
  keyName: string;
  valueString: string;
}

const Main = () => {
  const [rowData, setRowData] = useState<IRowData | object>({});
  const [pageNum, setPageNum] = useState<number>(1);
  const [selectedRows, setSelectedRows] = useState<Array<string>>([]);
  const [deleteQuery, setDeleteQuery] = useState<string>("");
  const [keyValue, setKeyValue] = useState<IKeyValue>({
    keyName: "",
    valueString: "",
  });
  const [newKey, setNewKey] = useState<IKeyValue>({
    keyName: "",
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
    setPageNum(1);
  };

  const handleGetSelectedRows = async (row: Array<object>) => {
    //Need to concantenate the fields before sending API call
    let keys: Array<string> = [];
    row?.map((key: object) => {
      const joinedKey = Object.values(key).join("#");
      keys.push(joinedKey);
    });
    console.log("concantenated keys array>>", keys);
    setSelectedRows(keys);

    if (row?.length === 1) {
      await handleGetValue(keys[0]);
    }
  };

  //this can be called elsewhere later on
  const handleGetValue = async (key: string) => {
    const data = await getKeyValue(key);
    const keyValuePair = {
      keyName: key,
      valueString: data,
    };
    setKeyValue(keyValuePair);
  };

  const handleDeleteByQuery = async () => {
    const data = await deleteKeyByQuery(deleteQuery);
    await handleGetAllKeys();
    console.log(`delete query: ${deleteQuery}, result:`, data);
  };

  const handleDeleteBySelection = async () => {
    console.log("selected Rows for deletion", selectedRows);
    await deleteKeyBySelection(selectedRows);
    await handleGetAllKeys();
  };

  const handleAddNewKey = async () => {
    const data = await postNewKeyValue(newKey);
    data &&
      setNewKey({
        keyName: "",
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
    setPageNum(1);
    setSelectedRows([]); // this doesnt update the grid
  };

  useEffect(() => {
    (async () => {
      await handleGetAllKeys();
    })();
  }, []);

  return (
    <div className="main">
      <div className="main__toolbar">
        <Pagination
          pageNum={pageNum}
          handlePageNext={handlePageNext}
          handlePageBack={handlePageBack}
          rowData={rowData}
        />
        <Search handleSearch={handleSearch} handleReset={handleReset} />
      </div>
      <div className="main__redisData">
        <Grid rowData={rowData} handleGetSelectedRows={handleGetSelectedRows} />
        <SideDrawer
          selectedRows={selectedRows}
          handleDeleteByQuery={handleDeleteByQuery}
          handleAddNewKey={handleAddNewKey}
          keyValue={keyValue}
          setKeyValue={setKeyValue}
          deleteQuery={deleteQuery}
          setDeleteQuery={setDeleteQuery}
          handleDeleteBySelection={handleDeleteBySelection}
          newKey={newKey}
          setNewKey={setNewKey}
        />
      </div>
    </div>
  );
};

export default Main;

import React, { useEffect, useState } from "react";
import Grid from "./Grid";

import Pagination from "./Pagination";
import { getAllKeys, getKeyValue, searchKeys } from "../network/network";
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

const Main = () => {
  const [rowData, setRowData] = useState<IRowData | object>({});
  const [pageNum, setPageNum] = useState<number>(1);
  const [selectedRows, setSelectedRows] = useState<Array<IRowData>>([]);

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

  const handleGetSelectedRows = async (row: Array<IRowData>) => {
    if (row.length === 1) {
      console.log("row[0] >>", row[0]);
      const data = await getKeyValue(row[0]?.keys[0]);
      console.log("value>>", data.value);
      row[0].keys[0].value = data.value;
    }
    setSelectedRows(row);
  };

  const handleDeleteByQuery = async (deleteQuery: string) => {
    const data = await deleteKeyByQuery(deleteQuery);
    console.log(`delete query: ${deleteQuery}, result:`, data);
  };

  useEffect(() => {
    (async () => {
      const result = await getAllKeys();
      setRowData(result);
      console.log("ROW DATA", result);
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
        <Search handleSearch={handleSearch} />
      </div>
      <div className="main__redisData">
        <Grid rowData={rowData} handleGetSelectedRows={handleGetSelectedRows} />
        <SideDrawer
          selectedRows={selectedRows}
          handleDeleteByQuery={handleDeleteByQuery}
        />
      </div>
    </div>
  );
};

export default Main;

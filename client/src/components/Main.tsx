import React, { useEffect, useState } from "react";
import Grid from "./Grid";

import Pagination from "./Pagination";
import { getAllKeys, searchKeys } from "../network/network";
import Search from "./Search";
import { getPage } from "../network/network";
import SideDrawer from "./SideDrawer";

interface IRowData {
  keyName: string;
  subset: string;
  orgId: string;
}

const Main = () => {
  const [rowData, setRowData] = useState<Array<IRowData>>([]);
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

  const handleGetSelectedRows = (row: Array<IRowData>) => {
    setSelectedRows(row);
    console.log("selectedRows>>>", selectedRows);
  };

  useEffect(() => {
    (async () => {
      const result = (await getAllKeys()) as Array<IRowData>;
      setRowData(result);
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
        <SideDrawer selectedRows={selectedRows} />
      </div>
    </div>
  );
};

export default Main;

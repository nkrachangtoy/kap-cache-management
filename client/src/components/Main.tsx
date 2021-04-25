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

  useEffect(() => {
    (async () => {
      const result = (await getAllKeys()) as Array<IRowData>;
      setRowData(result);
    })();
  }, []);

  return (
    <div className="main">
      <div className="toolbar">
        <Pagination
          pageNum={pageNum}
          handlePageNext={handlePageNext}
          handlePageBack={handlePageBack}
          rowData={rowData}
        />
        <Search handleSearch={handleSearch} />
      </div>
      <div className="redisData">
        <Grid rowData={rowData} />
        <SideDrawer />
      </div>
    </div>
  );
};

export default Main;

import React, { useEffect, useState } from "react";
import Grid from "./Grid";

import Pagination from "./Pagination";
import { getAllKeys } from "../network/network";
import Search from "./Search";
import { getPage } from "../network/network";

interface IRowData {
  keyName: string;
  subset: string;
  orgId: string;
}

const Main = () => {
  const [rowData, setRowData] = useState<Array<IRowData>>([]);
  const [pageNum, setPageNum] = useState<number>(1);
  const [refresh, setRefresh] = useState(false);

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

  useEffect(() => {
    (async () => {
      const result = (await getAllKeys()) as Array<IRowData>;
      setRowData(result);
    })();
  }, []);

  useEffect(() => {
    setRefresh(!refresh);
    console.log("refresh!!!", refresh);
  }, [rowData]);

  return (
    <div className="main">
      <div className="toolbar">
        <Pagination
          pageNum={pageNum}
          handlePageNext={handlePageNext}
          handlePageBack={handlePageBack}
        />
        <Search />
      </div>
      <Grid rowData={rowData} />
    </div>
  );
};

export default Main;

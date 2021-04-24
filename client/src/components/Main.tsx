import React, {useEffect, useState} from 'react';
import Grid from './Grid';

import Pagination from './Pagination';
import { getAllKeys } from '../network/network';
import Search from './Search';
import { getPage } from '../network/network';

interface IRowData {
  keyName: string, 
  subset: string, 
  orgId: string
}

const Main = () => {
  const [rowData, setRowData] = useState<Array<IRowData>>([]);
  const [pageNum, setPageNum] = useState<number>(1);

  const handlePageNext = async() => {
    setPageNum(pageNum + 1)
    const data = await getPage(pageNum);
    setRowData(data)
}

const handlePageBack = async() => {
    setPageNum(pageNum-1)
    const data = await getPage(pageNum);
    setRowData(data)
}

  useEffect(() => {
    (async () => {
      const result = await getAllKeys() as Array<IRowData>;
      setRowData(result);
    })();
  }, []);

  return (
    <div className='main'>
      <div className='toolbar'>
      <Pagination pageNum={pageNum} handlePageNext={handlePageNext} handlePageBack={handlePageBack}/>
      <Search />
    </div>
      <Grid rowData={rowData} />
    </div>
  );
};

export default Main;

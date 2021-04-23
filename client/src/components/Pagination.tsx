import React, {useState} from 'react';
import { getPage } from '../network/network';


const Pagination = () => {
    const [pageNum, setPageNum] = useState<number>(1);

    const handlePageNext = async() => {
        setPageNum(pageNum + 1)
        const data = await getPage(pageNum);
    }

    const handlePageBack = () => {
        setPageNum(pageNum-1)
    }

  return (
    <div className='pagination'>
        <button onClick={handlePageBack}>back</button>
      Page {pageNum}
        <button onClick={handlePageNext}>next</button>

    </div>
  );
};

export default Pagination;

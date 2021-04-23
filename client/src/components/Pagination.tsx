import React, {useState} from 'react';


const Pagination = () => {
    const [pageNum, setPageNum] = useState<number>(1);

    const handlePageNext = () => {
        setPageNum(pageNum + 1)
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

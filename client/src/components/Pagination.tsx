import React from "react";
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';

interface PaginationProps {
  pageNum: number;
  handlePageNext: () => void;
  handlePageBack: () => void;
  rowData: any;
}

const Pagination: React.FC<PaginationProps> = ({
  pageNum,
  handlePageNext,
  handlePageBack,
  rowData,
}) => {
  const firstNum = Math.min((pageNum - 1) * 50 + 1, rowData?.totalCount);
  const lastNum = Math.min(pageNum * 50, rowData?.totalCount);

  return (
    <div className="pagination">
      <div className="pagination__results">
        <span className="pagination__text">
          {firstNum} - {lastNum} 
        </span>
        {" "}of{" "}
        <span className="pagination__text">
        {rowData?.totalCount?.toLocaleString()}
        </span>
      </div>
      <div className="pagination__fields">
        {/* <button  className="pagination__button">
          <SkipPreviousIcon />
        </button> */}
        <button className="pagination__button" onClick={handlePageBack} disabled={!rowData?.hasPreviousPage}>
          <NavigateNextIcon style={{transform: "rotate(180deg)"}} />
        </button>
        <span className="pagination__text--page-num">
          {pageNum}
        </span>
        <button className="pagination__button" onClick={handlePageNext} disabled={!rowData?.hasNextPage}>
          <NavigateNextIcon />
        </button>
        {/* <button  className="pagination__button">
          <SkipNextIcon />
        </button> */}
      </div>
    </div>
  );
};

export default Pagination;

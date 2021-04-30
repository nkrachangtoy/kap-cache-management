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
      <div>
        Showing keys {firstNum} - {lastNum} of{" "}
        {rowData?.totalCount?.toLocaleString()} results
      </div>
      <div className="pagination__fields">
        <button  className="pagination__button">
          <SkipPreviousIcon />
        </button>
        <button className="pagination__button" onClick={handlePageBack} disabled={!rowData?.hasPreviousPage}>
          <NavigateNextIcon style={{transform: "rotate(180deg)"}} />
        </button>
        <h5>
          Page {pageNum}
        </h5>
        <button className="pagination__button" onClick={handlePageNext} disabled={!rowData?.hasNextPage}>
          <NavigateNextIcon />
        </button>
        <button  className="pagination__button">
          <SkipNextIcon />
        </button>
      </div>
    </div>
  );
};

export default Pagination;

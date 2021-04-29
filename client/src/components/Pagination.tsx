import React from "react";

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
      <div>
        <button onClick={handlePageBack} disabled={!rowData?.hasPreviousPage}>
          back
        </button>
        Page {pageNum}
        <button onClick={handlePageNext} disabled={!rowData?.hasNextPage}>
          next
        </button>
      </div>
    </div>
  );
};

export default Pagination;

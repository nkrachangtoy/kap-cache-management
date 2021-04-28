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
  return (
    <div className="pagination">
      <div>Showing {rowData?.keys?.length} of (totalNum) results</div>
      <div>
        <button
          onClick={handlePageBack}
          disabled={pageNum === 1 ? true : false}
        >
          back
        </button>
        Page {pageNum}
        <button
          onClick={handlePageNext}
          // disabled={pageNum === rowData.totalPages ? true : false}
        >
          next
        </button>
      </div>
    </div>
  );
};

export default Pagination;

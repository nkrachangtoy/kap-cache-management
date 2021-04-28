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
      <div>
        Showing {rowData?.keys?.length} of{" "}
        {rowData?.totalCount.toLocaleString()} results
      </div>
      <div>
        <button onClick={handlePageBack} disabled={!rowData.hasPreviousPage}>
          back
        </button>
        Page {pageNum}
        <button onClick={handlePageNext} disabled={!rowData.hasNextPage}>
          next
        </button>
      </div>
    </div>
  );
};

export default Pagination;

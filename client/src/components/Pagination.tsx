import React from "react";

interface IRowData {
  keyName: string;
  subset: string;
  orgId: string;
}

interface PaginationProps {
  pageNum: number;
  handlePageNext: () => void;
  handlePageBack: () => void;
  rowData: IRowData[];
}

const Pagination: React.FC<PaginationProps> = ({
  pageNum,
  handlePageNext,
  handlePageBack,
  rowData,
}) => {
  return (
    <div className="pagination">
      <div>Showing {rowData.length} results</div>
      <div>
        <button
          onClick={handlePageBack}
          disabled={pageNum === 1 ? true : false}
        >
          back
        </button>
        Page {pageNum}
        <button onClick={handlePageNext}>next</button>
      </div>
    </div>
  );
};

export default Pagination;

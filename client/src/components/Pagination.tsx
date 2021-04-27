import React from "react";

interface IRowData {
  keys: Array<IKey>;
  totalKeyCount: number;
  pageSize: number;
  totalPages: number;
}

interface IKey {
  keyName: string;
  subset: string;
  orgId: string;
}

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
      <div>Showing {rowData?.keys?.length} results</div>
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
          disabled={pageNum === rowData?.totalPages ? true : false}
        >
          next
        </button>
      </div>
    </div>
  );
};

export default Pagination;

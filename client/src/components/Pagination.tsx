import React from "react";

interface PaginationProps {
  pageNum: number;
  handlePageNext: () => void;
  handlePageBack: () => void;
}

const Pagination: React.FC<PaginationProps> = ({
  pageNum,
  handlePageNext,
  handlePageBack,
}) => {
  return (
    <div className="pagination">
      <button onClick={handlePageBack} disabled={pageNum === 1 ? true : false}>
        back
      </button>
      Page {pageNum}
      <button onClick={handlePageNext}>next</button>
    </div>
  );
};

export default Pagination;

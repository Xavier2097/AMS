const Pagination = ({ currentPage, totalPages, onNext, onPrev }) => {
  return (
    <div className="pagination">
      <button onClick={onPrev} disabled={currentPage === 1}>
        Prev
      </button>
      <span>
        {currentPage} / {totalPages}
      </span>
      <button onClick={onNext} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
};

export default Pagination;

import React from 'react';

const Pagination = ({ page, setPage, paginationMeta }) => {
  const { currentPage, totalPages } = paginationMeta;

  return (
    <div className="flex items-center justify-center gap-4 mt-6">
      <button
        onClick={() => setPage(prev => prev - 1)}
        disabled={page === 1}
        className={`px-4 py-2 rounded-lg transition-all duration-200 
          ${page === 1
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-blue-600 text-white hover:bg-blue-700'}
        `}
      >
        Prev
      </button>

      <span className="text-gray-700 font-medium">
        Page <span className="font-semibold">{currentPage}</span> of <span className="font-semibold">{totalPages}</span>
      </span>

      <button
        onClick={() => setPage(prev => prev + 1)}
        disabled={page === totalPages}
        className={`px-4 py-2 rounded-lg transition-all duration-200 
          ${page === totalPages
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-blue-600 text-white hover:bg-blue-700'}
        `}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;

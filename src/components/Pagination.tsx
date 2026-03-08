interface PaginationProps {
    currentPage : number;
    totalPages : number;
    onPageChange : (page : number) => void;
}

export function Pagination({
    currentPage,
    totalPages,
    onPageChange,
} : PaginationProps) {
    const pages = Array.from({length : totalPages}, (_, i) => i + 1);
    return (
          <div className="flex justify-center gap-2 mt-10">
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-4 py-2 rounded-md transition ${
            currentPage === page
              ? "bg-amber-500 text-white"
              : "bg-gray-800 text-gray-300 hover:bg-gray-700"
          }`}
        >
          {page}
        </button>
      ))}
    </div>
    )
}
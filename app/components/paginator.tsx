type paginatorProps = {
  length: number;
  page: number;
  setPage: (page: number) => void;
};

export default function Paginator(props: paginatorProps) {
  const { length, page, setPage } = props;

  return (
    <nav
      className="flex items-center border-gray-200 py-3"
      aria-label="Pagination"
    >
      <div className="hidden sm:block">
        <p className="text-sm text-gray-700">
          Showing <span className="font-medium">{page * 8 - 7}</span> to{" "}
          <span className="font-medium">
            {page * 8 > length ? length : page * 8}
          </span>{" "}
          of <span className="font-medium">{length}</span> results
        </p>
      </div>
      <div className="flex flex-1 justify-between sm:justify-end">
        <button
          type="submit"
          onClick={() => {
            if (page > 1) {
              setPage(page - 1);
            }
          }}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </button>
        <button
          type="submit"
          onClick={() => {
            if (page < length / 8) {
              setPage(page + 1);
            }
          }}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </button>
      </div>
    </nav>
  );
}

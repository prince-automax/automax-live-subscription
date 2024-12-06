import React, { useState, useEffect } from "react";
import {
    CalendarIcon,
    DocumentDownloadIcon,
    SearchIcon,
  } from "@heroicons/react/outline";
const SearchComponent = ({setDebouncedSearch,handleResetFilters}) => {
  const [search, setSearch] = useState("");
//   const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 300);

    return () => clearTimeout(timer);
  }, [search]);

  const clearFilter=()=>{
    handleResetFilters()
    setSearch("")
  }

  return  <div className=" flex gap-14 space-x-6 ">
  <div className="relative rounded-md shadow-sm max-w-sm">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <SearchIcon
        className="h-5 w-5 text-gray-400"
        aria-hidden="true"
      />
    </div>
    <input
      type="text"
      placeholder="Search live events..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-600 rounded-md"
    />
  </div> 
 
  <button
    type="button"
    onClick={clearFilter} // Add your reset handler
    className="text-white bg-indigo-600 hover:bg-indigo-700 border-transparent px-4 py-2 border shadow-sm text-sm font-medium rounded-md focus:outline-none"
  >
    Clear Filters
  </button>
</div>
};

export default SearchComponent;

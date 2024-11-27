// import React from "react";
// import {
//   useGlobalFilter,
//   usePagination,
//   useRowSelect,
//   useSortBy,
//   useTable,
// } from "react-table";

// import {
//   SearchIcon,
//   SelectorIcon,
//   SortAscendingIcon,
//   SortDescendingIcon,
// } from "@heroicons/react/outline";

// function Datatable(props) {
//   const {
//     tableColumns,
//     tableData,
//     onRowClickPath,
//     alternateLayout,
//     hideSearch,
//     wrapperClass,
//     rowClass,
//   } = props;

//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     page,
//     prepareRow,
//     canPreviousPage,
//     canNextPage,
//     pageOptions,
//     nextPage,
//     previousPage,
//     state: { pageIndex },
//   } = useTable(
//     {
//       columns: tableColumns,
//       data: tableData,
//     },
//     useGlobalFilter,
//     useSortBy,
//     usePagination,
//     useRowSelect
//   );

//   return (
//     <div>
//       {!alternateLayout ? (
//         <div className="mt-2 ring-1 ring-gray-300 rounded-lg overflow-auto max-sm:overflow-scroll max-sm:h-[450px] lg:max-w-2xl xl:max-w-[1115px]">
//           <table
//             {...getTableProps()}
//             className="min-w-full divide-y divide-gray-300"
//           >
//             <thead className="bg-primary rounded-lg">
//               {headerGroups.map((headerGroup,hgidx) => (
//                 <tr
//                 key={hgidx}
//                   {...headerGroup.getHeaderGroupProps()}
//                   className="divide-x divide-gray-200"
//                 >
//                   {headerGroup.headers.map((column,colIdx) => (
//                     <th
//                     key={colIdx}
//                       {...column.getHeaderProps(column.getSortByToggleProps())}
//                       className="py-3.5 pl-1 pr-1 text-sm font-semibold text-gray-100 text-left sm:pl-2"
//                     >
//                       <span className="whitespace-nowrap">
//                         {column.render("Header")}
//                         {column.isSorted ? (
//                           column.isSortedDesc ? (
//                             <SortDescendingIcon className="ml-2 text-yellow-400 inline-flex h-5 w-5" />
//                           ) : (
//                             <SortAscendingIcon className="ml-2 text-yellow-400 inline-flex h-5 w-5" />
//                           )
//                         ) : (
//                           <SelectorIcon className="ml-2 inline-flex h-5 w-5" />
//                         )}
//                       </span>
//                     </th>
//                   ))}
//                 </tr>
//               ))}
//             </thead>

//             <tbody {...getTableBodyProps()}>
//               {page.map((row,rowIdx) => {
//                 prepareRow(row);
//                 return (
//                   <tr
//                   key={rowIdx}
//                     {...row.getRowProps()}
//                     className="divide-x divide-gray-200 cursor-pointer hover:bg-indigo-50"
//                   >
//                     {row.cells.map((cell,cellIdx) => (
//                       <td
//                       key={cellIdx}

//                         {...cell.getCellProps()}
//                         className="px-6 py-3.5 text-sm text-gray-800 border-t border-gray-200"
//                       >
//                         {/* Render image if cell contains image data */}
//                         {cell.column.id === "image" ? (
//                           <img
//                             src={cell.value}
//                             alt="table content"
//                             className="h-10 w-10 object-cover rounded-md"
//                           />
//                         ) : (
//                           cell.render("Cell")
//                         )}
//                       </td>
//                     ))}
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>
//       ) : (
//         <div {...getTableBodyProps()} className={wrapperClass}>
//           {page.map((row,rowId) => {
//             prepareRow(row);
//             return (
//               <div
//               key={rowId}
//                 {...row.getRowProps()}
//                 className={onRowClickPath ? "cursor-pointer" : ""}
//               >
//                 {row.cells.map((cell,cellId) => (
//                   <div
//                   key={cellId}
//                   {...cell.getCellProps()} className={rowClass}>
//                     {cell.render("Cell")}
//                   </div>
//                 ))}
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// }

// export default Datatable;



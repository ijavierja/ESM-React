import React from "react";
import { useMemo } from "react";
import { useTable, usePagination } from "react-table";

const EmployeeTable = ({
  data,
  sort,
  ascending,
  limit,
  setLimit,
  setOffset,
  submitForm,
  handlePageDown,
  handlePageUp,
  handleSortClick,
}: {
  data: any;
  sort: string;
  ascending: boolean;
  limit: number;
  setLimit: any;
  setOffset: any;
  submitForm: () => void;
  handlePageDown: () => void;
  handlePageUp: () => void;
  handleSortClick: (str: string) => void;
}): JSX.Element => {
  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Login",
        accessor: "login",
      },
      {
        Header: "Salary",
        accessor: "salary",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      // @ts-ignore
      { columns, data }
    );

  return (
    <div>
      <div className=" overflow-auto border" style={{ height: "60vh" }}>
        <table
          {...getTableProps()}
          className="data-table w-full "
          style={{ borderCollapse: "separate", borderSpacing: "0px 20px" }}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()} className="">
                {headerGroup.headers.map((column) => {
                  console.log(column.id === sort ? column.id : "");
                  const isSortedColumn = column.id === sort;
                  return (
                    <th {...column.getHeaderProps()} className={`p-4 `}>
                      <button
                        className="w-full text-left"
                        onClick={() => {
                          handleSortClick(column.id);
                        }}
                      >
                        <h1 className={` ${isSortedColumn ? "underline" : ""}`}>
                          {column.render("Header")}
                          {isSortedColumn ? (ascending ? "↑" : "↓") : ""}
                        </h1>
                      </button>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, index) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} className="bg-gray-100 rounded-xl">
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()} className="p-4 ">
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="flex"></div>
      </div>
      <form
        className="flex mt-2"
        onSubmit={(e) => {
          e.preventDefault();
          setOffset(0);
          submitForm();
        }}
      >
        <h1 className="m-2">No. of items: </h1>
        <input
          className="border"
          value={limit}
          type="number"
          pattern="[0-9]"
          onChange={(e) => setLimit(Number(e.target.value))}
        />
        <button className="bg-gray-200 p-2">submit</button>
      </form>

      <div className="flex mt-2">
        <button
          className="p-2 bg-gray-200"
          onClick={() => {
            handlePageDown();
          }}
        >{`<`}</button>
        <button
          className="p-2 bg-gray-200"
          onClick={() => {
            handlePageUp();
          }}
        >{`>`}</button>
      </div>
    </div>
  );
};

export default EmployeeTable;

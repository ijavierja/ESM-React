import React from "react";
import { useMemo } from "react";
import { useTable, usePagination } from "react-table";

const EmployeeTable = ({
  data,
  initialState,
}: {
  data: any;
  initialState?: any;
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
    <div className=" overflow-auto" style={{ height: "60vh" }}>
      <table
        {...getTableProps()}
        className="data-table w-full "
        style={{ borderCollapse: "separate", borderSpacing: "0px 20px" }}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} className="text-left">
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} className="p-4">
                  {column.render("Header")}
                </th>
              ))}
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
    </div>
  );
};

export default EmployeeTable;

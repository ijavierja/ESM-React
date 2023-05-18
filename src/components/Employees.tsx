import React, { useEffect, useState } from "react";
import SearchForm from "./SearchForm";
import apiAgent from "../api/apiAgent";

const Employees = () => {
  const [employees, setEmployees] = useState<any>();

  const fetchEmployees = async (params: {
    minSalary: number;
    maxSalary: number;
    offset: number;
    limit: number;
    sort: string;
    ascending: boolean;
  }) => {
    try {
      const { minSalary, maxSalary, offset, limit, sort, ascending } = params;
      const result = await apiAgent.User.getUser(
        minSalary,
        maxSalary,
        offset,
        limit,
        sort,
        ascending
      );
      setEmployees(result.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEmployees({
      minSalary: 0,
      maxSalary: 100000,
      offset: 0,
      limit: 10,
      sort: "name",
      ascending: true,
    });
  }, []);

  return (
    <div className="flex-1 h-full w-fit white py-10 px-32">
      <SearchForm fetchEmployees={fetchEmployees} />
      <div className="my-10">
        <h1 className="font-bold text-3xl">Employees</h1>
      </div>
      <div>Table</div>
      {/* <button
        onClick={async () => {
          try {
            const result = await apiAgent.User.getUser(
              0,
              100000,
              0,
              10,
              "name",
              true
            );
            console.log(result);
          } catch (error: any) {
            console.log(error);
          }
        }}
      >
        click me
      </button> */}
      <button onClick={() => console.log(employees)}>click</button>
    </div>
  );
};

export default Employees;

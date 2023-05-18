import React, { useEffect, useState } from "react";
import SearchForm from "./SearchForm";
import apiAgent from "../api/apiAgent";
import Joi from "joi";
import EmployeeTable from "./EmployeeTable";

const getUsersParamsSchema = Joi.object({
  minSalary: Joi.number().min(0).required(),
  maxSalary: Joi.number().greater(Joi.ref("minSalary")).required(),
  offset: Joi.number().integer().min(0).required(),
  limit: Joi.number().integer().min(0).required(),
  sort: Joi.string().allow("id", "login", "name", "salary").required(),
  ascending: Joi.boolean(),
});

const Employees = () => {
  const [employees, setEmployees] = useState<any[] | null>(null);
  const [minSalary, setMinSalary] = useState<number>(0);
  const [maxSalary, setMaxSalary] = useState<number>(100000);
  const [offset, setOffset] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [sort, setSort] = useState<string>("id");
  const [ascending, setAscending] = useState<boolean>(true);

  const transformDataForTable = (employees: any[]) => {
    const data = employees.map((employee: any) => {
      return {
        id: employee.id,
        name: employee.name,
        login: employee.login,
        salary: employee.salary,
      };
    });
    return data || [];
  };

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
      const validationResults = getUsersParamsSchema.validate(params);

      if (validationResults.error) {
        console.log(validationResults.error);
      }

      const result = await apiAgent.User.getUser(
        minSalary,
        maxSalary,
        offset,
        limit,
        sort,
        ascending
      );
      setEmployees(transformDataForTable(result.data.results));
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitForm = () => {
    fetchEmployees({ minSalary, maxSalary, offset, limit, sort, ascending });
  };

  const handlePageUp = () => {
    fetchEmployees({
      minSalary,
      maxSalary,
      offset: offset + limit,
      limit,
      sort,
      ascending,
    });
    setOffset(offset + limit);
  };

  const handlePageDown = () => {
    let newOffset = offset - limit;
    if (newOffset < 0) {
      newOffset = 0;
    }
    fetchEmployees({
      minSalary,
      maxSalary,
      offset: newOffset,
      limit,
      sort,
      ascending,
    });
    setOffset(newOffset);
  };

  const handleSortClick = (header: string) => {
    let newAsc = true;
    if (header === sort) {
      newAsc = !ascending;
    }
    fetchEmployees({
      minSalary,
      maxSalary,
      offset,
      limit,
      sort: header,
      ascending: newAsc,
    });
    setSort(header);
    setAscending(newAsc);
  };

  useEffect(() => {
    fetchEmployees({
      minSalary: minSalary,
      maxSalary: maxSalary,
      offset,
      limit,
      sort,
      ascending,
    });
  }, []);

  return (
    <div className="flex-1 h-full w-fit white py-10 px-32">
      <SearchForm
        submitForm={handleSubmitForm}
        minSalary={minSalary}
        maxSalary={maxSalary}
        setMinSalary={setMinSalary}
        setMaxSalary={setMaxSalary}
      />
      <div className="my-10">
        <h1 className="font-bold text-3xl">Employees</h1>
      </div>
      {employees ? (
        <EmployeeTable
          data={employees}
          sort={sort}
          ascending={ascending}
          limit={limit}
          setLimit={setLimit}
          setOffset={setOffset}
          submitForm={handleSubmitForm}
          handlePageUp={handlePageUp}
          handlePageDown={handlePageDown}
          handleSortClick={handleSortClick}
        />
      ) : (
        <div>No result</div>
      )}
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
    </div>
  );
};

export default Employees;

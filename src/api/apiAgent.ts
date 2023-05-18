import axios, { AxiosError } from "axios";

const superagent = axios.create({
  baseURL: `http://localhost:8080`,
  timeout: 6000,
});

const User = {
  getUser: (
    minSalary: number,
    maxSalary: number,
    offset: number,
    limit: number,
    sort: string,
    ascending: boolean
  ) =>
    superagent.get("/users", {
      params: {
        minSalary,
        maxSalary,
        offset,
        limit,
        sort: `${ascending ? " " : "-"}${sort}`,
      },
    }),
};
const apiAgent = {
  User,
};

export default apiAgent;

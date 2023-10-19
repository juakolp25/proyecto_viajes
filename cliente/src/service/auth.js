import axios from "axios";

const url = "http://localhost:5050/api/admin";

//--Signin
export const login = (data) => {
  return axios({
    withCredentials: true,
    url: url,
    method: "POST",
    data,
  });
};
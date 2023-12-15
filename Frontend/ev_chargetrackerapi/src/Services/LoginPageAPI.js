import React from "react";
import axios from "axios";
import config from "../Config/config";

export const LoginPageAPI = async (apiRoute, payLoad) => {
  try {
    const res = await axios.post(`${config.apiUrl}${apiRoute}`, payLoad);
    return res;
  } catch (Error) {}
};

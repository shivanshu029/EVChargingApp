import React from "react";
import axios from "axios";
import config from "../Config/config";
import { toast } from "react-toastify";

export const SignUpAPI = async (apiRoute, payLoad) => {
  const res = await axios.post(`${config.apiUrl}${apiRoute}`, payLoad);
  return res;
};

import React from "react";
import axios from "axios";
import config from "../Config/config";

export const AdminDashboardAPI = async (apiRoute) => {
  try {
    const res = await axios.get(`${config.apiUrl}${apiRoute}`);
    return res;
  } catch (Error) {}
};

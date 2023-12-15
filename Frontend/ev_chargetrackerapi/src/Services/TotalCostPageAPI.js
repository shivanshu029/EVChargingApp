import React from "react";
import axios from "axios";
import config from "../Config/config";

export const TotalCostPageAPI = async (apiRoute, username) => {
  try {
    const res = await axios.get(`${config.apiUrl}${apiRoute}${username}`);
    return res;
  } catch (error) {}
};

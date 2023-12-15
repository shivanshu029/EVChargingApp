import React from "react";
import axios from "axios";
import config from "../Config/config";

export const GetAllDetailsAPI = async (apiRoute_GetDetails, username) => {
  try {
    const res = await axios.get(
      `${config.apiUrl}${apiRoute_GetDetails}${username}`
    );
    return res;
  } catch (Error) {}
};

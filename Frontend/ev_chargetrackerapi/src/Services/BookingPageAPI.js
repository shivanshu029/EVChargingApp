import axios from "axios";
import config from "../Config/config";

export const BookingPageAPI = async (apiRoute, payLoad) => {
  try {
    const res = await axios.post(`${config.apiUrl}${apiRoute}`, payLoad);
    console.log("Response", res);
    return res;
  } catch (Error) {}
};

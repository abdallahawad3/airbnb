import axios from "axios";

export const AXIOS_URL = axios.create({
  baseURL: "https://some-domain.com/api/",
});

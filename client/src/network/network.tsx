import axios from "axios";
const BASE_URL = "https://localhost:44371/api";

export const getAllKeys = async () => {
  const response = await axios.get(`${BASE_URL}/Keys`);
  console.log("getAllKeys response>>", response.data);
  return response.data;
};

export const getPage = async (pageNum: number) => {
  const response = await axios.get(`${BASE_URL}/Keys?pageNumber=${pageNum}`);
  console.log(`get items on page ${pageNum} >>>`, response.data);
  return response.data;
};

export const searchKeys = async (query: string) => {
  const response = await axios.get(`${BASE_URL}/Keys/Query?pattern=${query}`);
  console.log(`search results from ${query}>>>`, response.data);
  return response.data;
};

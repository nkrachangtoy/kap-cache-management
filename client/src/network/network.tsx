import axios from "axios";
const BASE_URL = "https://localhost:44371/api/Keys";

interface IRowData {
  keyName: string;
  subset: string;
  orgId: string;
}

export const getAllKeys = async () => {
  const response = await axios.get(`${BASE_URL}/`);
  console.log("getAllKeys response>>", response.data);
  return response.data;
};

export const getPage = async (pageNum: number) => {
  const response = await axios.get(`${BASE_URL}?pageNumber=${pageNum}`);
  console.log(`get items on page ${pageNum} >>>`, response.data);
  return response.data;
};

export const searchKeys = async (query: string) => {
  const response = await axios.get(`${BASE_URL}/Query?pattern=${query}`);
  console.log(`search results from ${query}>>>`, response.data);
  return response.data;
};

export const getKeyValue = async (key: IRowData) => {
  const response = await axios.get(
    `${BASE_URL}/value?KeyName=${key.keyName}&Subset=${key.subset}&OrgId=${key.orgId}`
  );
  console.log(`value of ${key.keyName}...>>>`, response.data);
  return response.data;
};

//https://localhost:44371/api/Keys/value?KeyName=KoreSetting&Subset=UnallocatedRevenueProperty&OrgId=fsdfsd-123123-dfds-123123

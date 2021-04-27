import axios from "axios";
const BASE_URL = "https://localhost:44371/api/Keys";

interface IRowData {
  keyName: string;
  subset: string;
  orgId: string;
}

export const getAllKeys = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/`);
    console.log("getAllKeys response>>", response.data);
    return response.data;
  } catch (e) {
    console.log(`Error: ${e}`);
  }
};

export const getPage = async (pageNum: number) => {
  try {
    const response = await axios.get(`${BASE_URL}?pageNumber=${pageNum}`);
    console.log(`get items on page ${pageNum} >>>`, response.data);
    return response.data;
  } catch (e) {
    console.log(`Error: ${e}`);
  }
};

export const searchKeys = async (query: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/Query?pattern=${query}`);
    console.log(`search results from ${query}>>>`, response.data);
    return response.data;
  } catch (e) {
    console.log(`Error: ${e}`);
  }
};

export const getKeyValue = async (key: IRowData) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/value?KeyName=${key.keyName}&Subset=${key.subset}&OrgId=${key.orgId}`
    );
    console.log(`value of ${key.keyName}...>>>`, response.data);
    return response.data;
  } catch (e) {
    console.log(`Error: ${e}`);
  }
};

export const deleteKeyByQuery = async (query: string) => {
  try {
    const response: any = await axios.delete(
      `${BASE_URL}/removeSubset?pattern=${query}`
    );
    console.log(
      `deleted ${response.data.success} results from ${query}>>>`,
      response.data.message
    );
    return response.data;
  } catch (e) {
    console.log(`Error: ${e}`);
  }
};

//https://localhost:44371/api/Keys/removeSubset?pattern=KonnectOrganization%235%2A

//https://localhost:44371/api/Keys/value?KeyName=KoreSetting&Subset=UnallocatedRevenueProperty&OrgId=fsdfsd-123123-dfds-123123

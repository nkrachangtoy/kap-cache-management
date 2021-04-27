import axios from "axios";
const BASE_URL = "https://localhost:44371/api/Keys";

export const getAllKeys = async () => {
  try {
    const response = await axios.get(`${BASE_URL}`);
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

export const getKeyValue = async (row: any) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/value?KeyName=${row[0].keyName}&Subset=${row[0].subset}&OrgId=${row[0].orgId}`
    );
    console.log(`value of ${row[0].keyName}...>>>`, response.data.data);
    return response.data.data;
  } catch (e) {
    console.log(`Error: ${e}`);
  }
};

export const deleteKeyByQuery = async (query: string) => {
  try {
    const response: any = await axios.delete(
      `${BASE_URL}/removeSubset?pattern=${query}`
    );
    response.data.success &&
      alert(
        `Deleted ${response.data.success} results >>>
      ${response.data.message}`
      );
    return response.data;
  } catch (e) {
    alert(`Error: ${e}`);
  }
};

import axios from "axios";
import toastr from "toastr";
//const BASE_URL = "https://localhost:44371/api/keys";
const BASE_URL = "https://konnect-redis.azurewebsites.net/api/keys";

interface IKeyValue {
  keyName: string;
  valueString: string;
}

export const getAllKeys = async () => {
  try {
    const response = await axios.get(`${BASE_URL}`);
    return response.data;
  } catch (e) {
    toastr["error"](`Error: ${e}`);
  }
};

export const getPage = async (pageNum: number) => {
  try {
    const response = await axios.get(`${BASE_URL}?pageNumber=${pageNum}`);
    return response.data;
  } catch (e) {
    toastr["error"](`Error: ${e}`);
  }
};

export const searchKeys = async (query: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/Query?pattern=${query}`);
    return response.data;
  } catch (e) {
    toastr["error"](`Error: ${e}`);
  }
};

export const getKeyValue = async (key: any) => {
  try {
    const replaced = key.replace(/[#]/g, "%23");
    const response = await axios.get(`${BASE_URL}/value?KeyName=${replaced}`);
    return response.data.data;
  } catch (e) {
    toastr["error"](`Error: ${e}`);
  }
};

export const deleteKeyByQuery = async (query: string) => {
  try {
    const response: any = await axios.delete(
      `${BASE_URL}/removeSubset?pattern=${query}`
    );
    response.data.success &&
      toastr["success"](`Deleted ${response.data.success} results >>>
    ${response.data.message}`);
    return response.data;
  } catch (e) {
    toastr["error"](`Error: ${e}`);
  }
};

export const deleteKeyBySelection = async (selection: any) => {
  try {
    //POST req to create selection
    let keyNameObjects: Array<object> = [];
    selection.forEach((key: string) => {
      const obj = {
        keyName: key,
      };
      keyNameObjects.push(obj);
    });

    await axios.post(`${BASE_URL}/selections`, keyNameObjects);

    //DELETE req to delete selection from redis
    const delResponse = await axios.delete(`${BASE_URL}/deleteSelections`);
    delResponse.data.success && toastr["success"](delResponse.data.message);
  } catch (e) {
    toastr["error"](`Error: ${e}`);
  }
};

export const postNewKeyValue = async (keyValue: IKeyValue) => {
  try {
    const postObj = {
      keyName: keyValue.keyName,
      value: {
        data: keyValue.valueString,
      },
    };
    const response = await axios.post(`${BASE_URL}`, postObj);
    return response.data;
  } catch (e) {
    toastr["error"](`Error: ${e}`);
  }
};

export const fetchFilters = async (fieldNum: number, filterSelections: any) => {
  let query;
  //if previous patterns selected, concantenate with '#'
  if (filterSelections.field0) {
    const values = Object.values(filterSelections);
    query = values.join("#");
  }

  try {
    let response;
    if (query) {
      response = await axios.get(
        `${BASE_URL}/filter?index=${fieldNum}&field=${query}`
      );
    } else {
      response = await axios.get(`${BASE_URL}/filter`);
    }
    return response.data;
  } catch (e) {
    toastr["error"](`Error: ${e}`);
  }
};

export const getPatterns = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/availablePatterns`);
    return response.data.patterns;
  } catch (e) {
    toastr["error"](`Error: ${e}`);
  }
};

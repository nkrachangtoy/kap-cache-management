import axios from "axios";
const BASE_URL = "https://localhost:44371/api/keys";

interface IKeyValue {
  keyName: string;
  valueString: string;
}

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

export const getKeyValue = async (key: any) => {
  try {
    const replaced = key.replace(/[#]/g, "%23");
    console.log("REPLACED", replaced);
    const response = await axios.get(`${BASE_URL}/value?KeyName=${replaced}`);
    console.log(`value of ${key}...>>>`, response.data.data);
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
    delResponse.data.success && alert(delResponse.data.message);
    console.log("Delete by Selection Response:", delResponse.data);
  } catch (e) {
    alert(`Error: ${e}`);
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
    console.log("NEWKEY", postObj);
    const response = await axios.post(`${BASE_URL}`, postObj);
    console.log("Post response >>", response);
    // response.status === 200 &&
    //   alert(`Successfully added new key: ${JSON.stringify(response.data)}`);
    // response.status === 200;
    return response.data;
  } catch (e) {
    console.log(`Error: ${e}`);
  }
};

export const fetchFilters = async (fieldNum: number, query?: string) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/filter?index=${fieldNum}&field=${query}`
    );
    console.log("FETCH FILTERS RESPONSE", response.data);
    return response.data;
  } catch (e) {
    console.log(`Error: ${e}`);
  }
};

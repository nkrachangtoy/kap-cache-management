import axios from "axios";
const BASE_URL = "https://localhost:44371/api/Keys";

interface IKeyValue {
  keyName: string;
  subset: string;
  orgId: string;
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

export const deleteKeyBySelection = async (selection: any) => {
  try {
    const response = await axios({
      method: "delete",
      url: `${BASE_URL}/removeSelected`,
      data: selection,
      headers: { "Content-Type": "application/json" },
    });
    response.data.success && alert(response.data.message);
    console.log("Delete by Selection Response:", response);
  } catch (e) {
    alert(`Error: ${e}`);
  }
};

export const postNewKeyValue = async (keyValue: IKeyValue) => {
  try {
    const postObj = {
      keyName: keyValue.keyName,
      subset: keyValue.subset,
      orgId: keyValue.orgId,
      value: {
        data: keyValue.valueString,
      },
    };
    console.log(postObj);
    const response = await axios.post(`${BASE_URL}`, postObj);
    console.log("Post response >>", response);
    response.status === 200 &&
      alert(`Successfully added new key: ${JSON.stringify(response.data)}`);
    return response.data;
  } catch (e) {
    console.log(`Error: ${e}`);
  }
};

import axios from 'axios';
const BASE_URL = "https://localhost:44371/api";

export const getAllKeys = async () => {
  const response = await axios.get(`${BASE_URL}/Keys`);
  console.log('getAllKeys response>>', response.data);
  return response.data
  ;
};

export const getPage = async(pageNum: number) => {
    const response = await axios.get(`${BASE_URL}/Keys?pageNumber=${pageNum}`);
    console.log(`get items on page ${pageNum} >>>`, response.data)
    return response.data
}

//'https://localhost:44371/api/Keys?pageNumber=2'
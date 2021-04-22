import axios from 'axios';

export const getAllKeys = async () => {
  const response = await axios.get('https://reqres.in/api/users');
  console.log('getAllKeys response>>', response.data.data);
  return response.data.data;
};

import axios from 'axios';

export const getAllKeys = async () => {
  const response = await axios.get('https://localhost:44371/api/keys');
  console.log('getAllKeys response>>', response.data);
  return response.data
  ;
};

// file: page/Auth/api/auth.api.js
import axios from 'axios';

export const loginApi = async (credentials) => {
  // credentials bao gồm username, password, taxCode
  const response = await axios.post('/api/auth/login', credentials);
  return response.data;
};
import axios from 'axios';

const API_URL = 'https://sandbox.api.lettutor.com';

export const request = axios.create({
  baseURL: API_URL,
});

export const authRequest = axios.create({
  baseURL: API_URL,
});

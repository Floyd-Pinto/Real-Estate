import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Ensure this matches the backend URL
});

export const userLogin = (username, password) => {
  return api.post('/user-login', { username, password });
};

export const userSignup = (username, contact_no, email, password) => {
  return api.post('/signup', { username, contact_no, email, password });
};

export const getProperties = () => {
  return api.get('/properties');
};

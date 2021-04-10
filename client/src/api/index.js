import axios from 'axios';

export default axios.create({
  baseURL: 'https://astra-olshop-test-backend.herokuapp.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

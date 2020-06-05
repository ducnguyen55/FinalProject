import axios from 'axios';
const BASE_URL = 'https://apiserver7th.herokuapp.com/';
const URL = axios.create({
    baseURL: BASE_URL,
});

export default URL;
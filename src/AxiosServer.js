import axios from 'axios';
const BASE_URL = 'https://apiserverfinal.herokuapp.com/';
const URL = axios.create({
    baseURL: BASE_URL,
});

export default URL;
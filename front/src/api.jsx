import axios from 'axios';

const api = axios.create({
    baseURL: "http://52.207.97.51/api"
})

export default api;
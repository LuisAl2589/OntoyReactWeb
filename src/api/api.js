import axios from 'axios';
const API_URL = "http://localhost:3000";

const api = axios.create({
    baseURL: API_URL,
});
const user = JSON.parse(localStorage.getItem('user'));
if (user?.token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
}


export default api;

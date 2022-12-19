import axios from 'axios';

export const URL = 'http://localhost:8080';
export default axios.create({
    baseURL: URL,
});
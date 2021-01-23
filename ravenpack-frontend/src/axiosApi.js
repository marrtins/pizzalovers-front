import axios from 'axios'


const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json'
    }
});

axiosInstance.interceptors.request.use(
    (config) => {
        /*const token = localStorage.getItem('token');
        if (token) {
            config.headers.authorization = 'JWT ' + token;
        }*/
        return config;
    },
    (error) => Promise.reject(error),
);



export default axiosInstance;
import axios from "axios";

const request = axios.create({
    baseURL: 'http://localhost:23333/',
    timeout: 1000,
    // headers: {'X-Custom-Header': 'foobar'}
});

// request.defaults.baseURL = 'http://localhost:23333'; // 设置访问地址
request.defaults.withCredentials = true; // 设置跨域允许携带 cookie
// request.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded"; // 设置POST请求格式

export default request
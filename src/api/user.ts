import request from "./index";
interface loginInfo {
    email: string,
    password: number | string
}
interface userInfo {
    email: string,
    nickname: string,
    pass: number | string,
    checkPass?: number | string,
    phone: number
}

function login(loginInfo: loginInfo) {
    return request.post('/user/login', loginInfo)
}

function register(userInfo: userInfo) {
    return request.post('/user/register', userInfo)
}

export default {
    login,
    register
}

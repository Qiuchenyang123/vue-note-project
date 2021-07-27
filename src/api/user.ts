import request from "./index";
import {AxiosPromise} from "axios";
interface loginInfo {
    email: string,
    pass: number | string
}
interface userInfo {
    email: string,
    nickname: string,
    pass: number | string,
    checkPass?: number | string,
    phone: number,
    passTip: string,
    avatar: string
}

function login(loginInfo: loginInfo): AxiosPromise {
    return request.post('/user/login', loginInfo)
}

function register(userInfo: userInfo): AxiosPromise {
    return request.post('/user/register', userInfo)
}

function update(userInfo: userInfo): AxiosPromise {
    return request.post('/user/update', userInfo)
}

function getUserInfo(): AxiosPromise {
    return request.get('/user/getUserInfo')
}

export default {
    login,
    register,
    update,
    getUserInfo
}

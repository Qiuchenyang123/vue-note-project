import userRequest from '../api/user'
interface userState {
    email: string,
    password: number | string,
    isLogin: boolean
}
interface userInfo {
    email: string,
    password: number | string,
}
interface registerInfo {
    email: string,
    nickname: string,
    pass: number | string,
    checkPass?: number | string,
    phone: number
}
const user = {
    namespaced: true,
    state: {
        email: '',
        password: '',
        isLogin: false
    },
    mutations: {
        changeUserInfo: (state: userState, payload: userInfo): void => {
            state.email = payload.email;
            state.password = payload.password;
            window.sessionStorage.setItem('isLogin', 'true')
        }
    },
    actions: {
        login({commit}: {commit: any}, payload: userInfo): Promise<any> {
            return new Promise(((resolve) => {
                userRequest.login(payload)
                    .then((res: any) => {
                        commit('changeUserInfo', payload)
                        resolve(res.data)
                    })
                    .catch((err: any) => console.log(err))
            }))
        },
        register({commit}: {commit: any}, payload: registerInfo): Promise<any> {
            return new Promise(((resolve) => {
                userRequest.register(payload)
                    .then((res: any) => {
                        resolve(res.data)
                    })
                    .catch((err: any) => console.log(err))
            }))
        }
    },
    modules: {}
}


export default user
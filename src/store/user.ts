import userRequest from '../api/user'
interface userState {
    username: string,
    email: string,
    password: number | string,
    isLogin: boolean
}
interface userInfo {
    username: string,
    email: string,
    password: number | string,
}
interface registerInfo {
    username: string,
    email: string,
    nickname: string,
    pass: number | string,
    checkPass?: number | string,
    phone: number
}
const user = {
    namespaced: true,
    state: {
        username: '',
        email: '',
        password: '',
        isLogin: false
    },
    getters: {
        getUsername: (state: userState): string => {
            return state.username
        }
    },
    mutations: {
        changeUserInfo: (state: userState, payload: userInfo): void => {
            state.username = payload.username;
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
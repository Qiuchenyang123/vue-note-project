import userRequest from '../api/user'
interface userState {
    username: string,
    email: string,
    nickname: string,
    pass: number | string,
    phone: number,
    avatar: string,
    passTip: string
    isLogin: boolean
}
interface userInfo {
    username: string,
    email: string,
    nickname: string,
    pass: number | string,
    phone: number,
    avatar: string,
    passTip: string
}
interface registerInfo {
    username: string,
    email: string,
    nickname: string,
    pass: number | string,
    checkPass?: number | string,
    phone: number,
    avatar: string,
    passTip: string
}
const user = {
    namespaced: true,
    state: {
        username: '',
        email: '',
        password: '',
        avatar: '',
        phone: '',
        passTip: '',
        nickname: '',
        userId: '',
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
            state.pass = payload.pass;
            state.nickname = payload.nickname;
            state.passTip = payload.passTip;
            state.phone = payload.phone;
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
        },
        update({commit}: {commit: any}, payload: registerInfo): Promise<any> {
            return new Promise(((resolve) => {
                userRequest.register(payload)
                    .then((res: any) => {
                        resolve(res.data)
                    })
                    .catch((err: any) => console.log(err))
            }))
        },
        getUserInfo({commit}: {commit: any}): Promise<any> {
            return new Promise(((resolve) => {
                userRequest.getUserInfo()
                    .then((res: any) => {
                        console.log(67, 11, res, res.data.data.userInfo);
                        // debugger
                        commit('changeUserInfo', res.data.data.userInfo)
                        resolve(res.data)
                    })
                    .catch((err: any) => console.log(err))
            }))
        }
    },
    modules: {}
}


export default user
import $api from "@/api";
import {getProfile} from "@/api/profile";

export default {
    state: {
        curUser: {
            isLogin: false,
            canBeAdmin: false,
            email: "",
            firstName: "",
            id: 0,
            isConfirmed: false,
            patronymic: "",
            secondName: ""
        }
    },
    mutations: {
        setCurUser(state, payload) {
            state.curUser = payload;
        },
    },
    getters: {
        getCurUser(state) {
            return state.curUser;
        },
        getFullName(state) {
            return `${state.curUser.secondName} ${state.curUser.firstName} ${state.curUser.patronymic ? state.curUser.patronymic : ""}`
        }
    },
    actions: {
        async fetchCurUser(ctx, params) {
            try {
                const response = await $api.post(`/auth/login`, {
                    email: params[0],
                    password: params[1],
                });
                localStorage.setItem('accessToken', response.data.accessToken);
                localStorage.setItem('refreshToken', response.data.refreshToken);
                let user = await getProfile();
                console.log(user)
                user = {
                    ...user,
                    isLogin: true
                };
                ctx.commit("setCurUser", user);
            } catch (err) {
                console.error("Ошибка при запросе данных пользователя:", err);
                throw err;
            }
        },
        async registerNewUser(ctx, params) {
            try {
                console.log(params)
                const response = await $api.post(`/auth/register`, {
                    "email": params[0],
                    "firstName": params[1],
                    "password": params[2],
                    "secondName": params[3],
                });
                localStorage.setItem('accessToken', response.data.accessToken);
                localStorage.setItem('refreshToken', response.data.refreshToken);
                let user = await getProfile();
                console.log(user)
                user = {
                    ...user,
                    isLogin: true
                };
                ctx.commit("setCurUser", user);
            } catch (err) {
                console.error("Ошибка при запросе создания пользователя:", err);
                throw err;
            }
        },
        logout(ctx) {
            let user = {
                isLogin: false
            }
            localStorage.setItem('accessToken', "");
            localStorage.setItem('refreshToken', "");
            ctx.commit("setCurUser", user);
        },
        async checkAuth(ctx) {
            try {
                const response = await $api.post(`/auth/refresh`, {refreshToken: localStorage.getItem('refreshToken')})
                localStorage.setItem('accessToken', response.data.accessToken);
                localStorage.setItem('refreshToken', response.data.refreshToken);
                let user = await getProfile();
                console.log(user)
                user = {
                    ...user,
                    isLogin: true
                };
                console.log("Валиден")
                ctx.commit("setCurUser", user);
            } catch (e) {
                console.log(e)
                console.log('НЕ Валиден')
                throw e;
            }
        }

    }
};

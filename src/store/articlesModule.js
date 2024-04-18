import {getArticles} from "@/api/userArticles";
export default {
    state: {
        articles: []
    },
    mutations: {
        setArticles(state, payload) {
            state.articles = payload;
        },
    },
    getters: {
        getArticles(state) {
            return state.articles;
        },
    },
    actions: {
        async fetchArticles(ctx, params) {
            console.log(params)
            try {
                const response = await getArticles(params)
                ctx.commit("setArticles", response.data);
            } catch (err) {
                console.error("Ошибка при запросе данных пользователя:", err);
                throw err;
            }
        },
    }
};

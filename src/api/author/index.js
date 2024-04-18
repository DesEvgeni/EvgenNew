import $api from "@/api";

export async function createAuthor(params) {
    try {
        const response = await $api.post(`/authors`, params);
        return response.data
    } catch (err) {
        console.log(err)
        throw err;
    }
}

export async function getAuthors(params) {
    try {
        const response = await $api.get(`/authors?fullname=${params.fullname}&page=${params.page}&size=${params.size}`);
        return response.data
    } catch (err) {
        console.log(err)
        throw err;
    }
}


import $api from "@/api";

export async function getArticles(params) {
    try {
        const response = await $api.get(`/offerArticles?page=${params.page}&size=${params.size}&status=${params.status}&orderByDate=${params.orderByDate}`);
        return response.data
    } catch (err) {
        console.log(err)
        throw err;
    }
}

export async function createOfferArticle(params) {
    try {
        const response = await $api.post(`/offerArticles`, params);
        return response.data
    } catch (err) {
        console.log(err)
        throw err;
    }
}


export async function getArticle(id) {
    try {
        const response = await $api.get(`/offerArticles/${id}`);
        return response.data
    } catch (err) {
        console.log(err)
        throw err;
    }
}


export async function editArticle(id, params) {
    try {
        const response = await $api.put(`/offerArticles/${id}`, params);
        return response.data
    } catch (err) {
        console.log(err)
        throw err;
    }
}


export async function deleteArticle(id) {
    try {
        const response = await $api.delete(`/offerArticles/${id}`);
        return response.data
    } catch (err) {
        console.log(err)
        throw err;
    }
}

export async function getVersions(id, params) {
    console.log("id",id)
    try {
        const response = await $api.get(`/offerArticles/${id}/versions?page=${params.page}&size=${params.size}`);
        return response.data
    } catch (err) {
        console.log(err)
        throw err;
    }
}

export async function editVersions(id, params) {
    console.log("id",id)
    try {
        const response = await $api.put(`/offerArticles/${id}/versions`, params);
        return response.data
    } catch (err) {
        console.log(err)
        throw err;
    }
}

export async function submitVersion(id) {
    try {
        const response = await $api.post(`/offerArticles/${id}/versions/submit`);
        return response.data
    } catch (err) {
        console.log(err)
        throw err;
    }
}

export async function deleteVersion(id) {
    try {
        const response = await $api.delete(`/offerArticles/${id}/versions`);
        return response.data
    } catch (err) {
        console.log(err)
        throw err;
    }
}

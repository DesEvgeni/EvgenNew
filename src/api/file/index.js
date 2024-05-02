import $api from "@/api";

export async function downloadFile(uuid) {
    try {
        const response = await $api.get(`/files?uuid=${uuid}`, {responseType: 'blob'});
        console.log(response)
        return response
    } catch (err) {
        console.log(err)
        throw err;
    }
}

export async function uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file);
    try {
        const response = await $api.post(`/files`, formData);
        return response.data
    } catch (err) {
        console.log(err)
        throw err;
    }
}



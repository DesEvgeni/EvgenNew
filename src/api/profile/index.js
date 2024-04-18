import $api from "@/api";

export async function getProfile() {
    try {
        const response = await $api.get(`/profile`);
        return response.data
    } catch (err) {
        console.log(err)
        throw err;
    }
}

export async function confirm(code) {
    try {
        const response = await $api.get(`/email/confirm?code=${code}`);
        return response.data
    } catch (err) {
        console.log(err)
        throw err;
    }
}

export async function sendCode() {
    try {
        const response = await $api.post(`/email/sendCode`);
        return response.data
    } catch (err) {
        console.log(err)
        throw err;
    }
}



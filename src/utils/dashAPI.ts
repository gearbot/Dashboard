const API_ROOT = `${process.env.API_SECURE == "true" ? "https": "http"}://${process.env.API_ROOT}/api`;
const CORS = process.env.CORS == "true";



export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const get_info = async ({method, endpoint, body = {}, auth_on_fail = false}) => {
    const options: any = {
        method: method,
        cache: "no-cache",
        credentials: CORS ? "include" : "same-origin",
        mode: CORS ? "cors" : "same-origin"
    };
    if (Object.keys(body).length > 0) {
        options["headers"] = {
            "Content-Type": "application/json"
        };
        options["body"] = JSON.stringify(body)
    }
    const response = await fetch(`${API_ROOT}/${endpoint}`, options);
    if (response.status == 401) {
        console.log("Unauthorized");
        if (auth_on_fail) {
            window.location.href = `${API_ROOT}/discord/login`;
        } else throw "Unauthorized"
    } else {
        return await response.json();
    }
};
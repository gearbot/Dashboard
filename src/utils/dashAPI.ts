const API_ROOT = process.env.API_ROOT;
const CORS = process.env.CORS == "ENABLED";


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const get_info = async ({method, endpoint, body = false, auth_on_fail = true}) => {
    console.log("CORS: ", CORS)
    const options: any = {
        method: method,
        cache: "no-cache",
        credentials: CORS ? "include" : "same-origin",
        mode: CORS ? "cors" : "same-origin"
    };
    if (body) {
        options["headers"] = {
            "Content-Type": "application/json"
        };
        options["body"] = JSON.stringify(body)
    }
    const response = await fetch(`${API_ROOT}/${endpoint}`, options);
    if (response.status == 401) {
        console.log("Unauthorized");
        if (auth_on_fail) {
            const w = window.open(`${API_ROOT}/discord/login`, "Discord login", "location=0 status=0,width=400,height=800");
            console.log(w);
            let ready = false;
            const interval = window.setInterval(() => {
                if (w.closed) {
                    clearInterval(interval);
                    ready = true
                }
            });
            while (!ready) {
                await sleep(100)
            }
            return await get_info({method: method, endpoint: endpoint, body: body, auth_on_fail: false});
        }
    } else {
        return await response.json();
    }
};
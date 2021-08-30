import axios from "axios";

const myAxios = () => axios
    .create({
        baseURL: "http://localhost:8000",
        headers: {
            'x-auth-token': localStorage.getItem("id_token")
        },
        withCredentials : true
    })


export default {
    get: myAxios().get,
    post: myAxios().post,
    put: myAxios().put,
    delete: myAxios().delete,
}

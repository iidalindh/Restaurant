import axios from "axios";

const myAxios = () => axios
    .create({
        baseURL: "http://localhost:8000",
        withCredentials: true
    })


export default {
    get: myAxios().get,
    post: myAxios().post,
    put: myAxios().put,
    delete: myAxios().delete,
}

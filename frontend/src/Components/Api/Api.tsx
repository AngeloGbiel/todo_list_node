import axios from "axios";

const Api = axios.create({
    baseURL: "http://192.168.49.2:32000",
    withCredentials: true, //para conseguir visualizar o Token
})

export default Api
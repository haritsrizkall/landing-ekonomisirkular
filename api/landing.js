import axios from "axios";
import { constant } from "../constant";

const landingApi = {
    getAllView: async () => {
        const response = await axios.get(`${constant.apiURL}/landings/view`);
        return response.data.data;
    },
    getAll: async () => {
        const response = await axios.get(`${constant.apiURL}/landings`);
        return response.data.data;
    },
    update: async (data) => {
        const response = await axios.put(`${constant.apiURL}/landings/${data.landing_id}`, {
            content: data.content
        }, {
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        return response.data.data;
    }
}

export default landingApi;
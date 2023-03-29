import axios from "axios";
import { constant } from "../constant";

const exploreApi = {
    getExplores: async () => {
        const response = await axios.get(`${constant.apiURL}/explores`);
        return response.data.data;
    },
    create: async (data) => {
        const response = await axios.post(`${constant.apiURL}/explores`, data, {
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        return response.data.data;
    },
    update: async (data) => {
        const response = await axios.put(`${constant.apiURL}/explores/${data.explore_id}`, {
            title: data.title,
            content: data.content
        }, {
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        return response.data.data;
    },
    delete: async (id) => {
        const response = await axios.delete(`${constant.apiURL}/explores/${id}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        return response.data.data;
    }
}

export default exploreApi;
import axios from "axios";
import { constant } from "../constant";

const sliderApi = {
    getAll: async () => {
        const response = await axios.get(`${constant.apiURL}/sliders`);
        return response.data.data;
    },
    create: async (data) => {
        const response = await axios.post(`${constant.apiURL}/sliders`, data, {
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        return response.data.data;
    },
    update: async (data) => {
        const response = await axios.put(`${constant.apiURL}/sliders/${data.id}`, data.form, {
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        return response.data.data;
    },
    delete: async (id) => {
        const response = await axios.delete(`${constant.apiURL}/sliders/${id}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        return response.data.data;
    }
}

export default sliderApi;
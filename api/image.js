import axios from "axios";
import { constant } from "../constant";

const ImageAPI = {
    getAll: async () => {
        const response = await axios.get(`${constant.apiURL}/images`);
        return response.data.data;
    },
    getPerPage: async () => {
        const response = await axios.get(`${constant.apiURL}/images/view`);
        return response.data.data;
    },
    update: async (data) => {
        const response = await axios.put(`${constant.apiURL}/images/${data.id}`, data.form);
        return response.data.data;
    }

}

export default ImageAPI;
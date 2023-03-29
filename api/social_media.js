import axios from 'axios';

const { constant } = require('../constant/index');

const socialMediaAPI = {
    getAll: async () => {
        const response = await axios.get(`${constant.apiURL}/social-medias`);
        return response.data.data;
    },
    addSocialMedia: async (data) => {
        const response = await axios.post(`${constant.apiURL}/social-medias`, data, {
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        return response.data.data
    },
    delete: async (id) => {
        const response = await axios.delete(`${constant.apiURL}/social-medias/${id}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        return response.data.data;
    },
    update: async (data) => {
        const response = await axios.put(`${constant.apiURL}/social-medias/${data.id}`, data.form, {
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        return response.data.data;
    }   
}

export default socialMediaAPI;
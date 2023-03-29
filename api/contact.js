import axios from 'axios';
import { async } from 'regenerator-runtime';

const { constant } = require('../constant/index');

const contactAPI = {
    getAll: async () => {
        const response = await axios.get(`${constant.apiURL}/contacts`);
        return response.data.data;
    },
    create: async (data) => {
        const response = await axios.post(`${constant.apiURL}/contacts`, data, {
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        return response.data.data;
    },
    update: async (data) => {
        const response = await axios.put(`${constant.apiURL}/contacts/${data.contact_id}`, {
            name: data.name,
            value: data.value
        }, {
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        return response.data.data
    },
    delete: async (id) => {
        const response = await axios.delete(`${constant.apiURL}/contacts/${id}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        return response.data.data
    }
}

export default contactAPI;
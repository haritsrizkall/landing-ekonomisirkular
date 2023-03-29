import { async } from "regenerator-runtime";
import { constant } from "../constant";

const axios = require("axios");
export const participantAPI = {
    getById: async (id) => {
        const response = await axios.get(`${constant.apiURL}/participants/${id}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        return response.data.data;
    },
    getCompanies: async () => {
        const response = await axios.get(`${constant.apiURL}/participants/companies`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        return response.data.data;
    },
    getIndividus: async () => {
        const response = await axios.get(`${constant.apiURL}/participants/individus`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        return response.data.data;
    },
    downloadIndividus: async () => {
        return axios.get(`${constant.apiURL}/participants/individus/download`, {
            responseType: 'blob',
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
    },
    downloadCompanies: async () => {
        return axios.get(`${constant.apiURL}/participants/companies/download`, {
            responseType: 'blob',
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
    },
    deleteParticipant: async (id) => {
        const response = await axios.delete(`${constant.apiURL}/participants/${id}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        return response.data.data
    }
}


import { async } from "regenerator-runtime";
import { constant } from "../constant";

const axios = require("axios");
const scoreAPI = {
    getStats: async () => {
        const res = await axios.get(`${constant.apiURL}/scores/stats`);
        return res.data.data;
    },
    getScoreByParticipantId: (id) => {
        return axios.get(`${constant.apiURL}/participants/${id}/score`);
    },
    getCompanyScores: async () => {
        const response = await axios.get(`${constant.apiURL}/scores/company?group_scores=true`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        return response.data.data;
    },
    getIndividuScores: async () => {
        const response =  await axios.get(`${constant.apiURL}/scores/individu?group_scores=true`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        return response.data.data;
    },
    downloadScoreByParticipantId: (id) => {
        return axios.get(`${constant.apiURL}/participants/${id}/score/download`, {
            responseType: 'blob'
        });
    },
    downloadScoresIndividu: async () => {
        return axios.get(`${constant.apiURL}/scores/individu/download`, {
            responseType: 'blob',
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
    },
    downloadScoresCompany: async () => {
        return axios.get(`${constant.apiURL}/scores/company/download`, {
            responseType: 'blob',
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
    },
    delete: async (id) => {
        const response = await axios.delete(`${constant.apiURL}/scores/${id}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        return response.data.data
    }
}

export default scoreAPI;
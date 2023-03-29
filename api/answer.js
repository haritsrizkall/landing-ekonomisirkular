import { constant } from '../constant';

const axios = require('axios');
const answersAPI = {
    submitIndividu: (data) => {
        return axios.post(`${constant.apiURL}/answers/submit/individu`, data)
    },
    submitCompany: (data) => {
        return axios.post(`${constant.apiURL}/answers/submit/company`, data)
    },
    downloadRecapAnswer: async (type) => {
        return axios.get(`${constant.apiURL}/answers/recap/download?type=${type}`, {
            responseType: 'blob',
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
    }
}

export default answersAPI;
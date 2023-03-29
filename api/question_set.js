const axios = require('axios');
const { constant } = require('../constant/index');

const questionSetsAPI = {
    getByID: async (id, questionGroup, question) => {
        const query = "?question_groups=" + questionGroup + "&questions=" + question;
        return await axios.get(`${constant.apiURL}/question-sets/${id}${query}`);
    },
    getAll: async (questionGroup, question) => {
        const query = "?question_groups=" + questionGroup + "&questions=" + question;
        const response = await axios.get(`${constant.apiURL}/question-sets${query}`);
        return response.data.data;
    },
    editQuestionSet: async (data) => {
        const response = await axios.put(`${constant.apiURL}/question-sets/${data.id}`, {
            name: data.name,
            description: data.description,
            instruction: data.instruction,
            type: data.type,
        }, {
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        return response.data.data;
    },
    downloadQuestionSet: async () => {
        return axios.get(`${constant.apiURL}/question-sets/download`, {
            responseType: 'blob',
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
    }
}

export default questionSetsAPI;
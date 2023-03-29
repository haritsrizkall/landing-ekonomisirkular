const axios = require('axios');
const { constant } = require('../constant/index');

const questionGroupAPI = {
    getAll: async (type, questions) => {
        const query = "?type=" + (type ? type : "")+ "&questions=" + (questions ? questions : "");
        const response = await axios.get(`${constant.apiURL}/question-groups${query}`);
        return response.data.data;
    },
    editQuestionGroup: async (data) => {
        const response = await axios.put(`${constant.apiURL}/question-groups/${data.question_group_id}`, {
            question_set_id: data.question_set_id,
            name: data.name,
            description: data.description,
        }, {
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
    },
    addQuestionGroup: async (data) => {
        const response = await axios.post(`${constant.apiURL}/question-groups`, {
            question_set_id: data.question_set_id,
            name: data.name,
            description: data.description,
        }, {
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
    },
    deleteQuestionGroup: async (id) => {
        const response = await axios.delete(`${constant.apiURL}/question-groups/${id}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
    }
}

export default questionGroupAPI;
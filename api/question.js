import { constant } from "../constant"

const axios = require("axios")

export const questionAPI = {
    addQuestion: async (data) => {
        const response = await axios.post(`${constant.apiURL}/questions`, data, {
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        return response.data.data
    },
    getQuestions: async () => {
        const response = await axios.get(`${constant.apiURL}/questions`)
        return response.data.data
    },
    editQuestion: async (data) => {
        const response = await axios.put(`${constant.apiURL}/questions/${data.question_id}`, {
            question: data.question,
            question_group_id: data.question_group_id
        }, {
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        return response.data.data
    },
    deleteQuestion: async (id) => {
        const response = await axios.delete(`${constant.apiURL}/questions/${id}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        return response.data.data
    }
}


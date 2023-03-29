import { constant } from "../constant"

const axios = require("axios")

export const userAPI = {
    getAll: async () => {
        const response = await axios.get(`${constant.apiURL}/users`,{
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        return response.data.data
    },
    addUser: async (data) => {
        const response = await axios.post(`${constant.apiURL}/auth/register`, data, {
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        return response.data.data
    },
    delete: async (id) => {
        const response = await axios.delete(`${constant.apiURL}/users/${id}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        return response.data.data
    },
    update: async (data) => {
        const response = await axios.put(`${constant.apiURL}/users/${data.user_id}`, {
            email: data.email,
            password: data.password,
            role: data.role
        }, {
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        return response.data.data
    }
}

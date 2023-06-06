import { constant } from "../constant";

const axios = require("axios");

export const authAPI = {
    login: async (email, password) => {
       const response = await axios.post(`${constant.apiURL}/auth/login`, { email, password }, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response.data.data;
    }
}
import { constant } from "../constant";

const axios = require("axios");

export const visitorAPI = {
    visit: async () => {
        const response = await axios.post(`${constant.apiURL}/visitors`, {}, {});
        return response.data.data;
    }
}
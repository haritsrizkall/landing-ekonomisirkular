const axios = require('axios');
const { constant } = require('../constant/index');

const categoryAPI = {
    getAll: async () => {
        const response = await axios.get(`${constant.apiURL}/categories`);
        return response.data.data;
    }
}

export default categoryAPI;
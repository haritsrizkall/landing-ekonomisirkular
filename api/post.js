import axios from "axios";
import { constant } from "../constant";

const postAPI = {
    getPosts: async (category_ids, page, sizePerPage) => {
        let query = `?page=${page ? page : 1}&sizePerPage=${sizePerPage ? sizePerPage : 10}`;
        if (category_ids && category_ids.length > 0) {
            for (const category_id of category_ids) {
                query = query + `&category_id=${category_id}`;
            }
        }
        const response = await axios.get(`${constant.apiURL}/posts${query}`);
        return response.data;
    },
    addPost: async (data) => {
        const response = await axios.post(`${constant.apiURL}/posts`, data, {
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        return response.data.data;
    },
    getPostBySlug: async (slug) => {
        const response = await axios.get(`${constant.apiURL}/posts/slug/${slug}`);  
        return response.data.data;
    },
    getPost: async (id) => {
        const response = await axios.get(`${constant.apiURL}/posts/${id}`);
        return response.data.data;
    },
    delete: async (id) => {
        const response = await axios.delete(`${constant.apiURL}/posts/${id}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        return response.data.data;
    },
    update: async (data) => {
        const response = await axios.put(`${constant.apiURL}/posts/${data.id}`, data.form, {
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        return response.data.data;
    }   
}

export default postAPI;
import { axios } from "axios";

const api = import.meta.env.VITE_URL_API;

const client = axios.create (
    {
        baseURL: api,
        headers: {
            "Content-Type": "application/json"
        }
    }
);

// POST Endpoints

export const PostsAPI = {
    listPosts: async (id)  => {
        const res = await client.get(`/api/posts`, { params: id ? { id } : {} } );
        return res.data;
        },

        register: async (payload) => {
        const res = await client.post('/api/auth/register', payload, {
            headers: {
            "Content-Type": "application/json"
            }
        });
        return res.data;
        },

        login: async (credentials) => {
        const res = await client.post('/api/auth/login', credentials, {
            headers: {
            "Content-Type": "application/json"
            }
        });
        return res.data;
        },

        createPost: async (payload, token) => {
        const res = await client.post('/api/posts', payload, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res.data;
    }, 


    listComments: async (id)  => {
            const res = await client.get(`/api/posts/:postId/comments`,{ params: id ? { id } : {} } );
            return res.data;
        },


    createComment: async (payload, token) => {
        const res = await client.post(`/api/posts/:postId/comments`, payload, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res.data;
    },
}  
// Import necessary modules
import axios from 'axios';

// Define API base URL
const BASE_URL = 'http://127.0.0.1:5000/api'; // Update this with your actual API URL

// Define getTodos function
export const getTodos = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/todos`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};

// Define addTodo function
export const addTodo = async (data) => {
    try {
        const response = await axios.post(`${BASE_URL}/todos`, data);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};

// Define deleteTodo function
export const deleteTodo = async (id) => {
    try {
        await axios.delete(`${BASE_URL}/todos/${id}`);
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};

// Define updateTodo function
export const updateTodo = async (id, data) => {
    try {
        const response = await axios.put(`${BASE_URL}/todos/${id}`, data);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};
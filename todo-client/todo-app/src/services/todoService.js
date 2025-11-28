import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/todos';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const todoService = {
    getAllTodos: async () => {
        const response = await api.get('');
        return response.data;
    },

    // Get todo by ID
    getTodoById: async (id) => {
        const response = await api.get(`/${id}`);
        return response.data;
    },

    // Create new todo
    createTodo: async (todoData) => {
        const response = await api.post('', todoData);
        return response.data;
    },

    // Update todo
    updateTodo: async (id, todoData) => {
        const response = await api.put(`/${id}`, todoData);
        return response.data;
    },

    // Toggle todo completion
    toggleTodo: async (id) => {
        const response = await api.patch(`/${id}/toggle`);
        return response.data;
    },

    // Delete todo
    deleteTodo: async (id) => {
        await api.delete(`/${id}`);
    },

    // Search todos
    searchTodos: async (keyword) => {
        const response = await api.get(`/search?keyword=${keyword}`);
        return response.data;
    },

    // Get todos by completion status
    getTodosByCompletion: async (completed) => {
        const response = await api.get(`/completed/${completed}`);
        return response.data;
    },

    // Get todos by priority
    getTodosByPriority: async (priority) => {
        const response = await api.get(`/priority/${priority}`);
        return response.data;
    }
};
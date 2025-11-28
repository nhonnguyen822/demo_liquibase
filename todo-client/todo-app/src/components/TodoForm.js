import React, { useState } from 'react';

const TodoForm = ({ onAddTodo, editingTodo, onUpdateTodo, onCancelEdit }) => {
    const [formData, setFormData] = useState({
        title: editingTodo?.title || '',
        description: editingTodo?.description || '',
        priority: editingTodo?.priority || 1
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingTodo) {
            onUpdateTodo(editingTodo.id, formData);
        } else {
            onAddTodo(formData);
            setFormData({ title: '', description: '', priority: 1 });
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.type === 'number' ? parseInt(e.target.value) : e.target.value
        });
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4">
                {editingTodo ? 'Edit Todo' : 'Add New Todo'}
            </h2>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title *
                </label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter todo title"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                </label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter todo description"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority
                </label>
                <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value={1}>Low</option>
                    <option value={2}>Medium</option>
                    <option value={3}>High</option>
                </select>
            </div>

            <div className="flex gap-2">
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    {editingTodo ? 'Update Todo' : 'Add Todo'}
                </button>

                {editingTodo && (
                    <button
                        type="button"
                        onClick={onCancelEdit}
                        className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    >
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
};

export default TodoForm;
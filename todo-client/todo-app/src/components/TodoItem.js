import React from 'react';

const TodoItem = ({ todo, onToggle, onEdit, onDelete }) => {
    const getPriorityColor = (priority) => {
        switch (priority) {
            case 1: return 'bg-green-100 text-green-800';
            case 2: return 'bg-yellow-100 text-yellow-800';
            case 3: return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getPriorityText = (priority) => {
        switch (priority) {
            case 1: return 'Low';
            case 2: return 'Medium';
            case 3: return 'High';
            default: return 'Unknown';
        }
    };

    return (
        <div className={`bg-white p-4 rounded-lg shadow-md border-l-4 ${
            todo.completed ? 'border-green-500' : 'border-blue-500'
        }`}>
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => onToggle(todo.id)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <h3 className={`text-lg font-medium ${
                            todo.completed ? 'line-through text-gray-500' : 'text-gray-900'
                        }`}>
                            {todo.title}
                        </h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(todo.priority)}`}>
              {getPriorityText(todo.priority)}
            </span>
                    </div>

                    {todo.description && (
                        <p className="text-gray-600 mb-2">{todo.description}</p>
                    )}

                    <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>Created: {new Date(todo.createdAt).toLocaleDateString()}</span>
                        {todo.updatedAt && todo.updatedAt !== todo.createdAt && (
                            <span>Updated: {new Date(todo.updatedAt).toLocaleDateString()}</span>
                        )}
                    </div>
                </div>

                <div className="flex gap-2 ml-4">
                    <button
                        onClick={() => onEdit(todo)}
                        className="text-blue-600 hover:text-blue-800 focus:outline-none"
                        title="Edit"
                    >
                        ✏️
                    </button>
                    <button
                        onClick={() => onDelete(todo.id)}
                        className="text-red-600 hover:text-red-800 focus:outline-none"
                        title="Delete"
                    >
                        🗑️
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TodoItem;
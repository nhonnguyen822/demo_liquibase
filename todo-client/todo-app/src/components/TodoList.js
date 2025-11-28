import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, onToggleTodo, onEditTodo, onDeleteTodo, filter, onFilterChange }) => {
    const filteredTodos = todos.filter(todo => {
        if (filter === 'completed') return todo.completed;
        if (filter === 'active') return !todo.completed;
        if (filter === 'high') return todo.priority === 3;
        return true;
    });

    return (
        <div className="bg-white rounded-lg shadow-md">
            <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">
                        Todos ({filteredTodos.length})
                    </h2>

                    <select
                        value={filter}
                        onChange={(e) => onFilterChange(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="all">All Todos</option>
                        <option value="active">Active</option>
                        <option value="completed">Completed</option>
                        <option value="high">High Priority</option>
                    </select>
                </div>
            </div>

            <div className="p-4 space-y-4">
                {filteredTodos.length === 0 ? (
                    <div className="text-center text-gray-500 py-8">
                        {filter === 'all' ? 'No todos yet. Add one above!' : `No ${filter} todos found.`}
                    </div>
                ) : (
                    filteredTodos.map(todo => (
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            onToggle={onToggleTodo}
                            onEdit={onEditTodo}
                            onDelete={onDeleteTodo}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default TodoList;
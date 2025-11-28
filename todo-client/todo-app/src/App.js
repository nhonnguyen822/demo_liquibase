import React, { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import SearchBar from './components/SearchBar';
import { todoService } from './services/todoService';

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const [editingTodo, setEditingTodo] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      setLoading(true);
      const todosData = await todoService.getAllTodos();
      setTodos(todosData);
      setError('');
    } catch (err) {
      setError('Failed to load todos');
      console.error('Error loading todos:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTodo = async (todoData) => {
    try {
      const newTodo = await todoService.createTodo(todoData);
      setTodos(prev => [...prev, newTodo]);
      setError('');
    } catch (err) {
      setError('Failed to create todo');
      console.error('Error creating todo:', err);
    }
  };

  const handleUpdateTodo = async (id, todoData) => {
    try {
      const updatedTodo = await todoService.updateTodo(id, todoData);
      setTodos(prev => prev.map(todo => todo.id === id ? updatedTodo : todo));
      setEditingTodo(null);
      setError('');
    } catch (err) {
      setError('Failed to update todo');
      console.error('Error updating todo:', err);
    }
  };

  const handleToggleTodo = async (id) => {
    try {
      const updatedTodo = await todoService.toggleTodo(id);
      setTodos(prev => prev.map(todo => todo.id === id ? updatedTodo : todo));
      setError('');
    } catch (err) {
      setError('Failed to toggle todo');
      console.error('Error toggling todo:', err);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await todoService.deleteTodo(id);
      setTodos(prev => prev.filter(todo => todo.id !== id));
      setError('');
    } catch (err) {
      setError('Failed to delete todo');
      console.error('Error deleting todo:', err);
    }
  };

  const handleSearch = async (keyword) => {
    setSearchTerm(keyword);
    try {
      if (keyword.trim()) {
        const searchResults = await todoService.searchTodos(keyword);
        setTodos(searchResults);
      } else {
        await loadTodos();
      }
      setError('');
    } catch (err) {
      setError('Failed to search todos');
      console.error('Error searching todos:', err);
    }
  };

  const handleEditTodo = (todo) => {
    setEditingTodo(todo);
  };

  const handleCancelEdit = () => {
    setEditingTodo(null);
  };

  if (loading) {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <div className="text-xl">Loading...</div>
        </div>
    );
  }

  return (
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <header className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Todo App with Liquibase
            </h1>
            <p className="text-gray-600">
              A fullstack demo showing Liquibase database migrations
            </p>
          </header>

          {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <TodoForm
                  onAddTodo={handleAddTodo}
                  editingTodo={editingTodo}
                  onUpdateTodo={handleUpdateTodo}
                  onCancelEdit={handleCancelEdit}
              />
            </div>

            <div className="lg:col-span-2">
              <SearchBar onSearch={handleSearch} />
              <TodoList
                  todos={todos}
                  onToggleTodo={handleToggleTodo}
                  onEditTodo={handleEditTodo}
                  onDeleteTodo={handleDeleteTodo}
                  filter={filter}
                  onFilterChange={setFilter}
              />
            </div>
          </div>

        </div>
      </div>
  );
}

export default App;
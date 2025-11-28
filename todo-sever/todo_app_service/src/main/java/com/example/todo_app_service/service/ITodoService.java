package com.example.todo_app_service.service;

import com.example.todo_app_service.dto.CreateTodoRequest;
import com.example.todo_app_service.dto.TodoDto;

import java.util.List;

public interface ITodoService {
    List<TodoDto> getAllTodos();
    TodoDto getTodoById(Long id);
    TodoDto createTodo(CreateTodoRequest request);
    TodoDto updateTodo(Long id, CreateTodoRequest request);
    TodoDto toggleTodo(Long id);
    void deleteTodo(Long id);
    List<TodoDto> searchTodos(String keyword);
    List<TodoDto> getTodosByCompletion(Boolean completed);
    List<TodoDto> getTodosByPriority(Integer priority);
}

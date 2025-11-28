package com.example.todo_app_service.service;

import com.example.todo_app_service.dto.CreateTodoRequest;
import com.example.todo_app_service.dto.TodoDto;
import com.example.todo_app_service.entity.Todo;
import com.example.todo_app_service.repository.ITodoRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class TodoService implements ITodoService {

    @Autowired
    private ITodoRepository todoRepository;

    private TodoDto convertToDto(Todo todo) {
        return TodoDto.builder()
                .id(todo.getId())
                .title(todo.getTitle())
                .description(todo.getDescription())
                .completed(todo.getCompleted())
                .priority(todo.getPriority())
                .createdAt(todo.getCreatedAt())
                .updatedAt(todo.getUpdatedAt())
                .build();
    }

    private Todo convertToEntity(CreateTodoRequest request) {
        return Todo.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .priority(request.getPriority())
                .completed(false)
                .build();
    }

    @Override
    @Transactional(readOnly = true)
    public List<TodoDto> getAllTodos() {
        return todoRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public TodoDto getTodoById(Long id) {
        return todoRepository.findById(id)
                .map(this::convertToDto)
                .orElseThrow(() -> new EntityNotFoundException("Todo not found with id: " + id));
    }

    @Override
    public TodoDto createTodo(CreateTodoRequest request) {
        Todo todo = convertToEntity(request);
        Todo savedTodo = todoRepository.save(todo);
        return convertToDto(savedTodo);
    }

    @Override
    public TodoDto updateTodo(Long id, CreateTodoRequest request) {
        return todoRepository.findById(id)
                .map(todo -> {
                    todo.setTitle(request.getTitle());
                    todo.setDescription(request.getDescription());
                    todo.setPriority(request.getPriority());
                    Todo updatedTodo = todoRepository.save(todo);
                    return convertToDto(updatedTodo);
                })
                .orElseThrow(() -> new EntityNotFoundException("Todo not found with id: " + id));
    }

    @Override
    public TodoDto toggleTodo(Long id) {
        return todoRepository.findById(id)
                .map(todo -> {
                    todo.setCompleted(!todo.getCompleted());
                    Todo updatedTodo = todoRepository.save(todo);
                    return convertToDto(updatedTodo);
                })
                .orElseThrow(() -> new EntityNotFoundException("Todo not found with id: " + id));
    }

    @Override
    public void deleteTodo(Long id) {
        if (!todoRepository.existsById(id)) {
            throw new EntityNotFoundException("Todo not found with id: " + id);
        }
        todoRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public List<TodoDto> searchTodos(String keyword) {
        return todoRepository.searchByKeyword(keyword).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<TodoDto> getTodosByCompletion(Boolean completed) {
        return todoRepository.findByCompleted(completed).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<TodoDto> getTodosByPriority(Integer priority) {
        return todoRepository.findByPriority(priority).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
}
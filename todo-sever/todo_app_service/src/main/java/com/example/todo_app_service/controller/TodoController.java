package com.example.todo_app_service.controller;

import com.example.todo_app_service.dto.CreateTodoRequest;
import com.example.todo_app_service.dto.TodoDto;
import com.example.todo_app_service.service.ITodoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/todos")
public class TodoController {

    @Autowired
    private ITodoService todoService;

    @GetMapping("/test")
    public String test() {
        return "Todo API is working!";
    }

    @GetMapping
    public ResponseEntity<List<TodoDto>> getAllTodos() {
        List<TodoDto> todos = todoService.getAllTodos();
        return ResponseEntity.ok(todos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TodoDto> getTodoById(@PathVariable Long id) {
        try {
            TodoDto todo = todoService.getTodoById(id);
            return ResponseEntity.ok(todo);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<TodoDto> createTodo(@Valid @RequestBody CreateTodoRequest request) {
        TodoDto createdTodo = todoService.createTodo(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdTodo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TodoDto> updateTodo(@PathVariable Long id, @Valid @RequestBody CreateTodoRequest request) {
        try {
            TodoDto updatedTodo = todoService.updateTodo(id, request);
            return ResponseEntity.ok(updatedTodo);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PatchMapping("/{id}/toggle")
    public ResponseEntity<TodoDto> toggleTodo(@PathVariable Long id) {
        try {
            TodoDto updatedTodo = todoService.toggleTodo(id);
            return ResponseEntity.ok(updatedTodo);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTodo(@PathVariable Long id) {
        try {
            todoService.deleteTodo(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/search")
    public ResponseEntity<List<TodoDto>> searchTodos(@RequestParam String keyword) {
        List<TodoDto> todos = todoService.searchTodos(keyword);
        return ResponseEntity.ok(todos);
    }

    @GetMapping("/completed/{completed}")
    public ResponseEntity<List<TodoDto>> getTodosByCompletion(@PathVariable Boolean completed) {
        List<TodoDto> todos = todoService.getTodosByCompletion(completed);
        return ResponseEntity.ok(todos);
    }

    @GetMapping("/priority/{priority}")
    public ResponseEntity<List<TodoDto>> getTodosByPriority(@PathVariable Integer priority) {
        List<TodoDto> todos = todoService.getTodosByPriority(priority);
        return ResponseEntity.ok(todos);
    }
}
package com.example.todo_app_service.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateTodoRequest {
    @NotBlank(message = "Title is mandatory")
    private String title;

    private String description;
    private Integer priority = 1;
}

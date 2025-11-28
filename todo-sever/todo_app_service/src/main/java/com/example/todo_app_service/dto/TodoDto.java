package com.example.todo_app_service.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TodoDto {
    private Long id;
    private String title;
    private String description;
    private Boolean completed;
    private Integer priority;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

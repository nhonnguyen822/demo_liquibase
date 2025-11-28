package com.example.todo_app_service.repository;

import com.example.todo_app_service.entity.Todo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface ITodoRepository  extends JpaRepository<Todo, Long> {
    List<Todo> findByCompleted(Boolean completed);

    List<Todo> findByPriority(Integer priority);

    @Query("SELECT t FROM Todo t WHERE LOWER(t.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(t.description) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Todo> searchByKeyword(String keyword);
}

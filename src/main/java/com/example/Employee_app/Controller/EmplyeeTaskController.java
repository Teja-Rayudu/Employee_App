package com.example.Employee_app.Controller;
import com.example.Employee_app.Entity.Employee;
import com.example.Employee_app.Entity.Task;
import com.example.Employee_app.Repository.EmployeeRepository;
import com.example.Employee_app.Repository.TaskRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class EmplyeeTaskController {

    private final EmployeeRepository employeeRepo;
    private final TaskRepository taskRepo;

    public EmplyeeTaskController(EmployeeRepository employeeRepo, TaskRepository taskRepo) {
        this.employeeRepo = employeeRepo;
        this.taskRepo = taskRepo;
    }

    @PostMapping("/employees")
    public Employee createEmployee(@RequestBody Employee employee) {
        return employeeRepo.save(employee);
    }

    @GetMapping("/employees")
    public List<Employee> getAllEmployees() {
        return employeeRepo.findAll();
    }

    @GetMapping("/employees/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id) {
        return employeeRepo.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/employees/{empId}/tasks")
    public ResponseEntity<Task> createTask(@PathVariable Long empId, @RequestBody Task task) {
        return employeeRepo.findById(empId).map(employee -> {
            task.setEmployee(employee);
            return ResponseEntity.ok(taskRepo.save(task));
        }).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/employees/{empId}/tasks")
    public List<Task> getTasksByEmployee(@PathVariable Long empId) {
        return taskRepo.findByEmployeeId(empId);
    }
}

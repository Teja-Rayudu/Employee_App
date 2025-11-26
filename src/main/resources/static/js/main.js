const API_URL = "/api";

document.addEventListener("DOMContentLoaded", loadEmployees);

function loadEmployees() {
    fetch(`${API_URL}/employees`)
        .then(res => res.json())
        .then(employees => {
            const list = document.getElementById("employeeList");
            list.innerHTML = "";
            employees.forEach(emp => {
                const li = document.createElement("li");
                li.className = "employee-item";
                li.innerHTML = `
                    <div class="employee-info" onclick="selectEmployee(${emp.id}, '${emp.name}', this.parentElement)">
                        <b>${emp.name}</b> (${emp.email})
                    </div>
                    <div class="action-buttons">
                        <button class="btn-warning" onclick="openEditEmployeeModal(${emp.id}, '${emp.name}', '${emp.email}'); event.stopPropagation();">Edit</button>
                        <button class="btn-danger" onclick="deleteEmployee(${emp.id}); event.stopPropagation();">Delete</button>
                    </div>
                `;
                list.appendChild(li);
            });
        });
}

function addEmployee() {
    const name = document.getElementById("empName").value;
    const email = document.getElementById("empEmail").value;

    if(!name || !email) return alert("Please fill all details");

    fetch(`${API_URL}/employees`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email })
    }).then(() => {
        document.getElementById("empName").value = "";
        document.getElementById("empEmail").value = "";
        loadEmployees();
    });
}

function openEditEmployeeModal(id, name, email) {
    document.getElementById("editEmpId").value = id;
    document.getElementById("editEmpName").value = name;
    document.getElementById("editEmpEmail").value = email;
    document.getElementById("editEmployeeModal").style.display = "block";
}

function closeEditEmployeeModal() {
    document.getElementById("editEmployeeModal").style.display = "none";
}

function updateEmployee() {
    const id = document.getElementById("editEmpId").value;
    const name = document.getElementById("editEmpName").value;
    const email = document.getElementById("editEmpEmail").value;

    if(!name || !email) return alert("Please fill all details");

    fetch(`${API_URL}/employees/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email })
    }).then(() => {
        closeEditEmployeeModal();
        loadEmployees();
        const selectedEmpId = document.getElementById("selectedEmpId").value;
        if(selectedEmpId == id) {
            document.getElementById("selectedEmpName").innerText = name;
        }
    });
}

function deleteEmployee(id) {
    if(!confirm("Are you sure you want to delete this employee? All their tasks will be deleted too.")) return;

    fetch(`${API_URL}/employees/${id}`, {
        method: "DELETE"
    }).then(() => {
        const selectedEmpId = document.getElementById("selectedEmpId").value;
        if(selectedEmpId == id) {
            document.getElementById("taskSection").style.display = "none";
        }
        loadEmployees();
    });
}

function selectEmployee(id, name, element) {
    document.querySelectorAll(".employee-item").forEach(el => el.classList.remove("active"));
    element.classList.add("active");

    document.getElementById("taskSection").style.display = "block";
    document.getElementById("selectedEmpName").innerText = name;
    document.getElementById("selectedEmpId").value = id;

    loadTasks(id);
}

function loadTasks(empId) {
    fetch(`${API_URL}/employees/${empId}/tasks`)
        .then(res => res.json())
        .then(tasks => {
            const list = document.getElementById("taskList");
            list.innerHTML = "";
            if(tasks.length === 0) {
                list.innerHTML = "<li style='color:#888'>No tasks yet.</li>";
                return;
            }

            tasks.forEach(task => {
                const li = document.createElement("li");
                li.className = "task-item";
                li.innerHTML = `
                    <div class="task-info">
                        ${task.description}
                        <span class="status">${task.status}</span>
                    </div>
                    <div class="task-actions">
                        <button class="btn-warning" onclick="openEditTaskModal(${task.id}, '${task.description}', '${task.status}')">Edit</button>
                        <button class="btn-danger" onclick="deleteTask(${task.id})">Delete</button>
                    </div>
                `;
                list.appendChild(li);
            });
        });
}

function addTask() {
    const empId = document.getElementById("selectedEmpId").value;
    const desc = document.getElementById("taskDesc").value;
    const status = document.getElementById("taskStatus").value;

    if(!desc) return alert("Please enter task description");

    fetch(`${API_URL}/employees/${empId}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: desc, status: status })
    }).then(() => {
        document.getElementById("taskDesc").value = "";
        document.getElementById("taskStatus").value = "PENDING";
        loadTasks(empId);
    });
}

function openEditTaskModal(id, description, status) {
    document.getElementById("editTaskId").value = id;
    document.getElementById("editTaskDesc").value = description;
    document.getElementById("editTaskStatus").value = status;
    document.getElementById("editTaskModal").style.display = "block";
}

function closeEditTaskModal() {
    document.getElementById("editTaskModal").style.display = "none";
}

function updateTask() {
    const taskId = document.getElementById("editTaskId").value;
    const description = document.getElementById("editTaskDesc").value;
    const status = document.getElementById("editTaskStatus").value;

    if(!description) return alert("Please enter task description");

    fetch(`${API_URL}/tasks/${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description, status })
    }).then(() => {
        closeEditTaskModal();
        const empId = document.getElementById("selectedEmpId").value;
        loadTasks(empId);
    });
}

function deleteTask(taskId) {
    if(!confirm("Are you sure you want to delete this task?")) return;

    fetch(`${API_URL}/tasks/${taskId}`, {
        method: "DELETE"
    }).then(() => {
        const empId = document.getElementById("selectedEmpId").value;
        loadTasks(empId);
    });
}

window.onclick = function(event) {
    const empModal = document.getElementById("editEmployeeModal");
    const taskModal = document.getElementById("editTaskModal");
    if (event.target == empModal) {
        empModal.style.display = "none";
    }
    if (event.target == taskModal) {
        taskModal.style.display = "none";
    }
}

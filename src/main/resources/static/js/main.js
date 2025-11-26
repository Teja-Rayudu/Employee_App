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
                li.innerHTML = `<span><b>${emp.name}</b> (${emp.email})</span>`;
                li.onclick = () => selectEmployee(emp.id, emp.name, li);
                list.appendChild(li);
            });
        });
}

function addEmployee() {
    const name = document.getElementById("empName").value;
    const email = document.getElementById("empEmail").value;

    if(!name || !email) return alert("Please fill details");

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

function selectEmployee(id, name, element) {
    document.querySelectorAll("li").forEach(el => el.classList.remove("active"));
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
            if(tasks.length === 0) list.innerHTML = "<p style='color:#888'>No tasks yet.</p>";

            tasks.forEach(task => {
                const li = document.createElement("li");
                li.innerHTML = `
                    ${task.description} 
                    <span class="status">${task.status}</span>
                `;
                list.appendChild(li);
            });
        });
}

function addTask() {
    const empId = document.getElementById("selectedEmpId").value;
    const desc = document.getElementById("taskDesc").value;

    if(!desc) return;

    fetch(`${API_URL}/employees/${empId}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: desc, status: "PENDING" })
    }).then(() => {
        document.getElementById("taskDesc").value = "";
        loadTasks(empId);
    });
}


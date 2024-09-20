let taskToEdit = null;

document.getElementById("task-form").addEventListener("submit", (event) => {
    event.preventDefault();
    addOrUpdateTask();
});

document.getElementById("update-button").addEventListener("click", () => addOrUpdateTask(true));

function addOrUpdateTask(isEdit = false) {
    const taskData = {
        nomeTarefa: document.getElementById("task-name").value,
        prioridadeTarefa: document.getElementById("task-priority").value,
        dataTarefa: document.getElementById("task-date").value,
        descTarefa: document.getElementById("task-desc").value
    };

    if (Object.values(taskData).every(value => value && value !== "#")) {
        isEdit ? updateTask(taskData) : addTask(taskData);
        document.getElementById('task-form').reset();
    }
}

function addTask({ nomeTarefa, prioridadeTarefa, dataTarefa, descTarefa }) {
    const listaTarefa = document.getElementById('task-list');
    const novaLinha = document.createElement("tr");

    [nomeTarefa, prioridadeTarefa, new Date(dataTarefa).toLocaleDateString('pt-BR'), descTarefa].forEach((valor, index) => {
        const novaCelula = document.createElement("td");
        novaCelula.textContent = valor;
        novaLinha.appendChild(novaCelula);
    });

    novaLinha.innerHTML += `
        <td data-label="Ação">
            <button class="editar" onclick="editTask(this)">Editar</button>
            <button class="excluir" onclick="deleteTask(this)">Excluir</button>
        </td>`;

    listaTarefa.appendChild(novaLinha);
}

function deleteTask(button) {
    const linha = button.closest("tr");
    linha.remove();
}

function editTask(button) {
    const [nomeTarefa, prioridadeTarefa, dataTarefa, descTarefa] = Array.from(button.closest("tr").children).map(cell => cell.textContent);
    
    document.getElementById("task-name").value = nomeTarefa;
    document.getElementById("task-priority").value = prioridadeTarefa;
    document.getElementById("task-date").value = dataTarefa.split('/').reverse().join('-');
    document.getElementById("task-desc").value = descTarefa;

    taskToEdit = button.closest("tr");
    document.getElementById("update-button").style.display = "inline-block";
}

function updateTask({ nomeTarefa, prioridadeTarefa, dataTarefa, descTarefa }) {
    if (taskToEdit) {
        [nomeTarefa, prioridadeTarefa, new Date(dataTarefa).toLocaleDateString('pt-BR'), descTarefa].forEach((valor, index) => {
            taskToEdit.children[index].textContent = valor;
        });

        taskToEdit = null;
        document.getElementById("update-button").style.display = "none";
    }
}

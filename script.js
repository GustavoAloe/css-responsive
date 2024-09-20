let taskToEdit = null;

document.getElementById("task-form").addEventListener("submit", function (event) {
    event.preventDefault();
    addOrUpdateTask();
});

document.getElementById("update-button").addEventListener("click", function () {
    addOrUpdateTask(true);
});

function addOrUpdateTask(isEdit = false) {
    const nomeTarefa = document.getElementById("task-name").value;
    const prioridadeTarefa = document.getElementById("task-priority").value;
    const dataTarefa = document.getElementById("task-date").value;
    const descTarefa = document.getElementById("task-desc").value;

    if (nomeTarefa && prioridadeTarefa !== "#" && dataTarefa && descTarefa) {
        const taskData = { nomeTarefa, prioridadeTarefa, dataTarefa, descTarefa };
        if (isEdit && taskToEdit) {
            updateTask(taskData);
        } else {
            addTask(taskData);
        }
        document.getElementById('task-form').reset();
    }
}

function addTask(taskData) {
    const listaTarefa = document.getElementById('task-list');
    const novaLinha = document.createElement("tr");

    Object.values(taskData).forEach((valor, index) => {
        const novaCelula = document.createElement("td");
        novaCelula.setAttribute('data-label', Object.keys(taskData)[index].replace(/([A-Z])/g, ' $1'));
        novaCelula.textContent = index === 2 ? new Date(valor).toLocaleDateString('pt-BR') : valor;
        novaLinha.appendChild(novaCelula);
    });

    const acaoCelula = document.createElement("td");
    acaoCelula.setAttribute('data-label', 'Ação');
    acaoCelula.innerHTML = `
        <button class="editar" onclick="editTask(this)">Editar</button>
        <button class="excluir" onclick="deleteTask(this)">Excluir</button>`;
    novaLinha.appendChild(acaoCelula);

    listaTarefa.appendChild(novaLinha);
}

function deleteTask(button) {
    const listaTarefa = document.getElementById("task-list");
    const linha = button.parentNode.parentNode;

    const novasTarefas = Array.from(listaTarefa.rows).filter(row => row !== linha);

    listaTarefa.innerHTML = '';
    novasTarefas.forEach(row => listaTarefa.appendChild(row));
}

function editTask(button) {
    const linha = button.parentNode.parentNode;
    const cells = linha.children;

    document.getElementById("task-name").value = cells[0].textContent;
    document.getElementById("task-priority").value = cells[1].textContent;
    document.getElementById("task-date").value = new Date(cells[2].textContent.split('/').reverse().join('-')).toISOString().substr(0, 10);
    document.getElementById("task-desc").value = cells[3].textContent;

    document.getElementById("update-button").style.display = "inline-block";
    taskToEdit = linha;
}

function updateTask(updatedData) {
    if (taskToEdit) {
        const cells = Array.from(taskToEdit.children);
        const keys = ['nomeTarefa', 'prioridadeTarefa', 'dataTarefa', 'descTarefa'];
        
        cells.forEach((cell, index) => {
            if (index < 4) {
                const key = keys[index];
                cell.textContent = key === 'dataTarefa' ? new Date(updatedData[key]).toLocaleDateString('pt-BR') : updatedData[key];
            }
        });

        // RESET EDIÇÃO
        taskToEdit = null;
        document.getElementById("update-button").style.display = "none";
    }
}

document.getElementById("task-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const nomeTarefa = document.getElementById("task-name").value;
    const prioridadeTarefa = document.getElementById("task-priority").value;
    const dataTarefa = document.getElementById("task-date").value;
    const descTarefa = document.getElementById("task-desc").value;

    if (nomeTarefa && descTarefa && prioridadeTarefa && dataTarefa) {
        const listaTarefa = document.getElementById('task-list');
        const novaLinha = listaTarefa.insertRow();

        const tarefa = novaLinha.insertCell(0);
        const prioridade = novaLinha.insertCell(1);
        const data = novaLinha.insertCell(2);
        const descricao = novaLinha.insertCell(3);
        const acao = novaLinha.insertCell(4);

        tarefa.setAttribute('data-label', 'Tarefa')
        tarefa.textContent = nomeTarefa;

        prioridade.setAttribute('data-label', 'Prioridade')
        prioridade.textContent = prioridadeTarefa;

        data.setAttribute('data-label', 'Data')
        data.textContent = new Date(dataTarefa).toLocaleDateString('pt-BR');

        descricao.setAttribute('data-label', 'Descrição')
        descricao.textContent = descTarefa

        acao.setAttribute('data-label', 'Ação')
        acao.innerHTML = `<button onclick="deleteTask(this)">Excluir</button>`

        document.getElementById('task-form').reset();
    }
});

function deleteTask(button) {
    const linha = button.parentNode.parentNode;
    linha.parentNode.removeChild(linha);
}

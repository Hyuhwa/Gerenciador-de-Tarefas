// Selecionar os elementos do DOM
const inputTarefa = document.querySelector('.Put');
const botaoAdicionar = document.querySelector('.botadd');
const listaTarefas = document.querySelector('.AddTaf');

// Carregar tarefas do Local Storage ao iniciar
document.addEventListener('DOMContentLoaded', carregarTarefas);

// Função para salvar tarefas no Local Storage
function salvarTarefasLocalStorage() {
    const tarefas = [];
    const itensLista = listaTarefas.querySelectorAll('li');
    
    itensLista.forEach(function(item) {
        const texto = item.firstChild.textContent;
        tarefas.push(texto);
    });
    
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

// Função para carregar tarefas do Local Storage
function carregarTarefas() {
    const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
    
    tarefas.forEach(function(textoTarefa) {
        criarElementoTarefa(textoTarefa);
    });
}

// Função para criar o elemento de tarefa
function criarElementoTarefa(texto) {
    // Criar o item da lista (li)
    const itemLista = document.createElement('li');
    itemLista.textContent = texto;

    // Criar botão para excluir a tarefa
    const botaoExcluir = document.createElement('button');
    botaoExcluir.textContent = 'Excluir';
    botaoExcluir.classList.add('botdel');

    // Adicionar evento de clique no botão excluir
    botaoExcluir.addEventListener('click', function() {
        listaTarefas.removeChild(itemLista);
        salvarTarefasLocalStorage();
    });

    // Adicionar o botão de excluir ao item da lista
    itemLista.appendChild(botaoExcluir);

    // Adicionar o item à lista de tarefas
    listaTarefas.appendChild(itemLista);
}

// Função para adicionar uma nova tarefa
function adicionarTarefa() {
    const textoTarefa = inputTarefa.value.trim();
    
    // Verificar se o input não está vazio
    if (textoTarefa === '') {
        alert('Por favor, digite uma tarefa!');
        return;
    }

    // Criar o elemento de tarefa
    criarElementoTarefa(textoTarefa);

    // Salvar no Local Storage
    salvarTarefasLocalStorage();

    // Limpar o input após adicionar
    inputTarefa.value = '';
    inputTarefa.focus();
}

// Adicionar evento de clique no botão adicionar
botaoAdicionar.addEventListener('click', adicionarTarefa);

// Permitir adicionar tarefa ao pressionar Enter
inputTarefa.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        adicionarTarefa();
    }
});

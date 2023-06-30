// Chama a função NoTask para verificar se há tarefas
NoTask();
// Chama a função VerifyMode para verificar e continuar com o MODECOLOR
VerifyMode();

// Cria o ID das tarefas e verifica o valor armazenado localmente
let counter = null;

if (localStorage.getItem("counter")) {
  counter = parseInt(localStorage.getItem("counter"));
} else {
  counter = 0;
}

// Criação das variáveis
let task_input = document.getElementById("add-field");
let add_list = document.getElementById("add-list");
let main = document.getElementById("main");
let delete_button = document.getElementById("delete-button");

const categorySelect = document.getElementById("category");
const taskList = main;
const taskItems = document.getElementsByClassName("task-item");

// Função para adicionar uma tarefa
function addTask() {
  let valueInput = task_input.value;
  const selectedCategory = categorySelect.value;

  if (valueInput !== "" && valueInput !== null && valueInput !== undefined) {
    rm_text_noTask();
    ++counter;

    let newItem = `<li class="task-item ${selectedCategory}" id="${counter}">
        <button onclick="markTask(${counter})" class="confirm_button"><i class="fas fa-check"></i></button>
        <button onclick="deleteItem(${counter})" class="delete-button"><i class="fas fa-trash"></i></button>
        <p id="tag_text" class="">${valueInput} <span class="line-category">${selectedCategory}</span></p>
    </li>`;

    main.innerHTML += newItem;
    let item_Fade = document.getElementById(counter);

    // Adiciona a classe 'fade-in' após um pequeno intervalo
    setTimeout(function () {
      item_Fade.classList.add("fade-in");
    }, 10);

    localStorage.setItem("tasks", main.innerHTML);
    localStorage.setItem("counter", counter);

    task_input.value = "";
    task_input.focus();
  }
}

// Função para deletar um item da lista de tarefas pelo id
function deleteItem(id) {
  let task_id = document.getElementById(id);
  task_id.classList.remove("fade-in");
  // Aguarda
  setTimeout(function() {
    task_id.remove();
    NoTask();
    localStorage.setItem("tasks", main.innerHTML);
  }, 400);
}

// Função para marcar uma tarefa como confirmada pelo id
function markTask(id) {
  let item_id = document.getElementById(id);
  let p_tag = item_id.querySelector("p");
  let p_class = p_tag.getAttribute("class");
  let elemento_text = document.querySelector("#items-list ul li p");
  let confirm_button = item_id.querySelector("button.confirm_button");

  if (p_class == "") {
    elemento_text.style.paddingRight = "45px";
    item_id.classList.add("click");
    confirm_button.remove();
    localStorage.setItem("tasks", main.innerHTML);
  }
}

// Remover o texto de NoTask quando houver tarefa
function rm_text_noTask() {
  let frase = document.querySelector(".sem_tarefa");
  if (frase) {
    frase.remove();
  }
}

// Verificar se há tarefas para exibir a mensagem de que não há tarefas
function NoTask() {
  let conteiner = document.getElementById("main");

  if (conteiner.innerHTML.trim() === "") {
    let newItem1 = `<div class='sem_tarefa all personal work other'>Uau, sem tarefas. Vamos adicionar uma...</div>`;
    conteiner.innerHTML += newItem1;
  }
}

// Função chamada para alternar o MODEcolor
function toggleMode() {
  const html = document.documentElement;
  html.classList.toggle("dark");
}

// Função chamada para verificar o MODEcolor e salvar
function VerifyMode() {
  const html = document.documentElement;

  classMode = localStorage.getItem("ColorMode");

  if (classMode == "dark") {
    html.classList.add("dark");
  }
}

function RemoveOrAdd_NoTask() {
  let newItem1 = `<div class='sem_tarefa'>Sem tarefas para esta categoria. Vamos adicionar uma...</div>`;
  let frase = document.querySelector(".sem_tarefa");
  const taskItems = document.getElementsByClassName("task-item");

  if (frase) {
    // Se já existe a frase de sem tarefas, não é necessário adicionar novamente
  } else {
    main.innerHTML += newItem1;
  }

  for (let i = 0; i < taskItems.length; i++) {
    const item = taskItems[i];

    if (item.style.display === "block") {
      rm_text_noTask();
    }
  }
}

function resetDisplay() {
  const taskItems = document.querySelectorAll("#main li"); // Obtém todos os elementos <li> dentro da lista <ul> com o ID "main"

  if (taskItems.length > 0) {
    // Define o estilo "display: block;" e adiciona a classe "fade-in" em todos os <li>
    for (let i = 0; i < taskItems.length; i++) {
      const taskItem = taskItems[i];
      taskItem.style.display = "block";
      taskItem.classList.add("fade-in")
    }
  } else {
    // Caso não haja elementos <li> encontrados, faça nada.
  }
}

// Evento para alterar a exibição das tarefas de acordo com a categoria selecionada
categorySelect.addEventListener("change", function () {
  const selectedCategory = categorySelect.value;

  for (let i = 0; i < taskItems.length; i++) {
    const taskItem = taskItems[i];
    const category = taskItem.classList[1];

    if (selectedCategory === "all" || selectedCategory === category) {
      taskItem.style.display = "block";
      rm_text_noTask();
    } else {
      taskItem.style.display = "none";
      RemoveOrAdd_NoTask();
    }
  }
});

// Evento ao pressionar Enter para adicionar uma tarefa
task_input.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    add_list.click();
  }
});

// Evento antes de fechar a página para salvar o modo de cor
window.addEventListener("beforeunload", function () {
  const html = document.documentElement;
  classMode = html.classList.value;

  localStorage.setItem("ColorMode", classMode);
});

// Evento quando a página é carregada para carregar as tarefas salvas e resetar as propiedades dos <li>
window.addEventListener("DOMContentLoaded", function () {
  if (localStorage.getItem("tasks")) {
    main.innerHTML = localStorage.getItem("tasks");
  }
  resetDisplay();
});

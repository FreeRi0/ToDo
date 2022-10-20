
//Тут мы при загрузке документа , делаем так, чтобы введеные данные оставались на странице , даже после перезагрузке страницы


window.addEventListener('load', () => {
  todos = JSON.parse(localStorage.getItem('todos')) || []; //Метод JSON.parse() разбирает строку JSON, возможно с преобразованием получаемого в процессе разбора значения.
  const todoList = document.querySelector("#todo-list");
  const newTodoForm = document.querySelector("#new-todo-form");

  newTodoForm.addEventListener('submit', e => {
    e.preventDefault();

    const todo = {
      content: e.target.elements.content.value, 
      category: e.target.elements.category.value,
      done: false,
      createdAt: new Date().getTime()
    }

    todos.push(todo);

    localStorage.setItem('todos', JSON.stringify(todos));

    e.target.reset();

    DisplayTodos();
  })
  DisplayTodos();
})

//Блок кода , который отвечает за создание блоков с задачами


function DisplayTodos () {
  const todoList = document.querySelector("#todo-list");
  todoList.innerHTML = "";

  todos.forEach(todo => {
    const todoItem = document.createElement('div');
		todoItem.classList.add('todo-item');


    const label = document.createElement('label');
    const input = document.createElement('input');
		const span = document.createElement('span');
		const content = document.createElement('div');
		const actions = document.createElement('div');
		const edit = document.createElement('button');
		const deleteButton = document.createElement('button');

    //Тут мы делаем переключение междутипами задач

    input.type = 'checkbox';
    input.checked = todo.done;
    span.classList.add('bubble');

    if(todo.category == 'personal') {
      span.classList.add('personal');
    }else{
      span.classList.add('business');
    }

    //Работа над кнопками: Редактировать, Удалить
    content.classList.add('todo-content');
    actions.classList.add('actions');
    edit.classList.add('edit');
		deleteButton.classList.add('delete');

    content.innerHTML=  `<input type="text" value="${todo.content}" readonly>`;
    edit.innerHTML = 'Редактировать';
    deleteButton.innerHTML = 'Удалить';

    label.appendChild(input);
    label.appendChild(span);
    actions.appendChild(edit);
    actions.appendChild(deleteButton);
    todoItem.appendChild(label);
    todoItem.appendChild(content);
    todoItem.appendChild(actions);

		todoList.appendChild(todoItem);

    //Тут делаем так, чтобы выполненая задача была перечеркнута(или изменила цвет)
    if(todo.done) {
      todoItem.classList.add('done');
    }

    input.addEventListener('click', e => {
      todo.done = e.target.checked; //Свойство event.target может быть использовано для реализации делегирования событий.
      localStorage.setItem('todos', JSON.stringify(todos));

      if(todo.done){
        todoItem.classList.add('done');
      }else{
        todoItem.classList.remove('done');
      }

      DisplayTodos();
    })


//Делаем редактирование задачи
    edit.addEventListener('click', e => {
      const input = content.querySelector('input')
      input.removeAttribute('readonly');
      input.focus();
      input.addEventListener('blur', e => {
        input.setAttribute('readonly', true);
        todo.content = e.target.value;
        localStorage.setItem('todos', JSON.stringify(todos));
        DisplayTodos();
      })
    })


    //Делаем удаление задачи
    deleteButton.addEventListener('click', (e) => {
			todos = todos.filter(t => t != todo);
			localStorage.setItem('todos', JSON.stringify(todos));
			DisplayTodos()
		})
  });

}


//Переключение темы
const body = document.querySelector("body");
const toggle = document.getElementById("toggle");
toggle.onclick = function() {
  toggle.classList.toggle("active")
  body.classList.toggle("active")
}

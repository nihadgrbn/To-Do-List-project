document.addEventListener('DOMContentLoaded', () => {
    const todos = [];
    let isSortedAsc = false;

    const addButton = document.querySelector('.add');
    const inputField = document.querySelector('.todo-input');
    const todoList = document.querySelector('.todo-list');
    const cancelButton = document.querySelector('.cancel-image');
    const sortButton = document.querySelector('.white-down');
    const showButton = document.querySelector('#show-button');
    const submitContainer = document.querySelector('.submit');
    const formContainer = document.querySelector('.form');
    const errorMessage = document.querySelector('.error-message');

    todoList.classList.add('hidden');

    addButton.addEventListener('click', () => {
        if (formContainer.style.display === 'block') {
            addTodo();
        } else {
            formContainer.style.display = 'block';
        }
    });

    cancelButton.addEventListener('click', toggleView);
    sortButton.addEventListener('click', toggleSort);
    showButton.addEventListener('click', showList);

    sortButton.addEventListener('mouseover', changeIconToBlack);
    sortButton.addEventListener('mouseout', changeIconToWhite);

    inputField.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            addTodo();
        }
    });

    function addTodo() {
        const todoText = inputField.value.trim();
        if (todoText) {
            todos.push(todoText);
            displayTodos();
            clearInput();
            isSortedAsc = false;
            errorMessage.style.display = 'none';

            if (todos.length > 0) {
                sortButton.style.display = 'block';
            }
        } else {
            errorMessage.textContent = 'Please add a to-do';
            errorMessage.style.display = 'block';
        }
    }

    function displayTodos() {
        todoList.innerHTML = '';
        todos.forEach((todoText, index) => createTodoItem(todoText, index));
    }

    function createTodoItem(todoText, index) {
        const todoItem = document.createElement('li');
        todoItem.innerText = todoText;
        todoItem.draggable = true;
        todoItem.dataset.index = index;

        todoItem.addEventListener('dragstart', dragStart);
        todoItem.addEventListener('dragover', dragOver);
        todoItem.addEventListener('drop', drop);
        todoItem.addEventListener('dblclick', () => editTodoItem(todoItem, index));

        const deleteButton = document.createElement('img');
        deleteButton.src = 'image/cancel.svg';  
        deleteButton.alt = 'Delete';
        deleteButton.classList.add('delete-todo');
        todoItem.appendChild(deleteButton);
        todoList.appendChild(todoItem);

        deleteButton.addEventListener('click', () => {
            todos.splice(index, 1);
            displayTodos();
        });
    }

    function dragStart(event) {
        event.dataTransfer.setData('text/plain', event.target.dataset.index);
        event.target.classList.add('dragging');
    }

    function dragOver(event) {
        event.preventDefault();
        event.target.classList.add('drag-over');
    }

    function drop(event) {
        event.preventDefault();
        const draggedIndex = event.dataTransfer.getData('text/plain');
        const targetIndex = event.target.dataset.index;

        if (draggedIndex !== targetIndex) {
            const [draggedItem] = todos.splice(draggedIndex, 1);
            todos.splice(targetIndex, 0, draggedItem);
            displayTodos();
        }
        event.target.classList.remove('drag-over');
    }

    function editTodoItem(todoItem, index) {
        const currentText = todoItem.innerText;
        const input = document.createElement('input');
        input.type = 'text';
        input.value = currentText;
        input.classList.add('edit-input');

        todoItem.innerText = '';
        todoItem.appendChild(input);
        input.focus();

        function saveEdit() {
            const newText = input.value.trim();
            if (newText) {
                todos[index] = newText;
            }
            displayTodos();
        }

        input.addEventListener('blur', saveEdit);
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') saveEdit();
        });
    }

    function clearInput() {
        inputField.value = '';
        inputField.focus();
        formContainer.style.display = 'block';
    }

    function toggleSort() {
        isSortedAsc = !isSortedAsc;
        todos.sort((a, b) => {
            const num_a = parseFloat(a);
            const num_b = parseFloat(b);
    
            if (!isNaN(num_a) && !isNaN(num_b)) {
                return isSortedAsc ? num_a - num_b : num_b - num_a;
            } else {
                return isSortedAsc ? a.localeCompare(b) : b.localeCompare(a);
            }
        });

        if (isSortedAsc) {
            sortButton.src = 'image/upsort-black.svg';
        } else {
            sortButton.src = 'image/downsort-black.svg';
        }

        displayTodos();
    }

    function changeIconToBlack() {
        if (isSortedAsc) {
            sortButton.src = 'image/upsort-black.svg';
        } else {
            sortButton.src = 'image/downsort-black.svg';
        }
    }

    function changeIconToWhite() {
        if (isSortedAsc) {
            sortButton.src = 'image/upsort.svg';
        } else {
            sortButton.src = 'image/downsort.svg';
        }
    }

    function toggleView() {
        formContainer.style.display = 'none';
    }

    function showList() {
        todoList.classList.remove('hidden');
        toggleView();
    }
});

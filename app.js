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
		if (formContainer.style.display === 'blocka') {
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


});

import { store } from './app.js';
import { addTodo, removeTodo, toggleTodo, addGoal, removeGoal } from './actionCreators.js';

// this was to replace "store.dispatch(action)" with "checkAndDispatch(store,action)"
// import { checkAndDispatch } from "./middlewares.js"; 

// ID Helper
const generateId = () => Math.random().toString(36).substring(2) + new Date().getTime().toString(36);
// DOM Helper
const createRemoveBtn = (onClick) => {
	const btn = document.createElement('button');
	btn.innerHTML = 'X';
	btn.addEventListener('click', onClick);
	return btn;
};

// DOM Code
export const addTodoToStore = () => {
	const input = document.getElementById('todo'),
		name = input.value;
	input.value = '';

	store.dispatch(
		addTodo({
			id: generateId(),
			name,
			complete: false
		})
	);
};

export const addGoalToStore = () => {
	const input = document.getElementById('goal'),
		name = input.value;
	input.value = '';

	store.dispatch(
		addGoal({
			id: generateId(),
			name
		})
	);
};

export const addTodoToDOM = (todo) => {
	const node = document.createElement('li'),
		text = document.createTextNode(todo.name),
		removeBtn = createRemoveBtn(() => {
			store.dispatch(removeTodo(todo.id));
		});
	node.appendChild(text);
	node.appendChild(removeBtn);

	node.style.textDecoration = todo.complete ? 'line-through' : 'none';
	node.addEventListener('click', () => {
		store.dispatch(toggleTodo(todo.id));
	});

	document.getElementById('todos').appendChild(node);
};

export const addGoalToDOM = (goal) => {
	const node = document.createElement('li'),
		text = document.createTextNode(goal.name),
		removeBtn = createRemoveBtn(() => {
			store.dispatch(removeGoal(goal.id));
		});
	node.appendChild(text);
	node.appendChild(removeBtn);

	document.getElementById('goals').appendChild(node);
};

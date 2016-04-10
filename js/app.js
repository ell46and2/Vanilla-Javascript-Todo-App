var taskInput = document.getElementById('new-task'); //#new-task
var addButton = document.getElementsByTagName('button')[0]; // First button
var incompleteTasksHolder = document.getElementById('incomplete-tasks'); //#incomplete-tasks
var completedTasksHolder = document.getElementById('completed-tasks'); //#completed-tasks

// new Task List Item
var createNewTaskElement = function(taskString) {
	// create list item
	var listItem = document.createElement('li');
	// input (checkbox)
	var checkbox = document.createElement('input'); 
		// label
	var label = document.createElement('label');
		// input (text)
	var editInput = document.createElement('input');
		// button.edit
	var editButton = document.createElement('button');
		// button.delete
	var deleteButton = document.createElement('button');
		// Modify elements
	checkbox.type = 'checkbox';
	editInput.type = 'text';
	label.innerText = taskString;
	editButton.innerText = 'Edit';
	editButton.className = 'edit';
	deleteButton.innerText = 'Delete';
	deleteButton.className = 'delete';

		// Append element
	listItem.appendChild(checkbox);
	listItem.appendChild(label);
	listItem.appendChild(editInput);
	listItem.appendChild(editButton);
	listItem.appendChild(deleteButton);

	return listItem;
}

// Add a new task
var addTask = function() {
	if(taskInput.value != '') {
		console.log('Add task');
		//when button is pressed, create a task
		// Create a new list item with the text from #new-task
		var listItem = createNewTaskElement(taskInput.value);
		
		// Append listItem to incompleteTasksHolder
		incompleteTasksHolder.appendChild(listItem);
		bindTaskEvents(listItem, taskCompleted);
		taskInput.value = '';
	} else {
		alert('Please enter a task!');
	}
}


// Edit an existing task
var editTask = function() {
	console.log('Edit task');

	var listItem = this.parentNode;
	var editInput = listItem.querySelector("input[type=text]");
	var label = listItem.querySelector("label");
	 // if parent has class .editMode
	 if(listItem.classList.contains('editMode')) {
	 	// Switch from .editMode
	 	// label text becomes the input's value
	 	label.innerText = editInput.value;
	 	this.innerText = 'Edit';
	 } else {
	 	// Switch to .editMode
	 	// input value becomes the label's text
	 	editInput.value = label.innerText;
	 	this.innerText = 'Update';
	 }
	 // Toggle .editMode on the parent
	 listItem.classList.toggle('editMode');
}



// Delete an existing task
var deleteTask = function() {
	console.log('Delete task');
	// When delete btn is pressed
		// remove the parent list item from the <ul> 
	var listItem = this.parentNode;
	var ul = listItem.parentNode;
	ul.removeChild(listItem);
}



// Mark task as complete
var taskCompleted = function() {
	console.log('Task complete');
	// Append the task list item to the completed-tasks
	var listItem = this.parentNode;
	completedTasksHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskIncomplete);
}




// Mark task as incomplete
var taskIncomplete = function() {
	console.log('Task incomplete');
	// Append the task list item to the incompleted-tasks
	var listItem = this.parentNode;
	incompleteTasksHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskCompleted);
}

var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
	console.log('Bind list item events');
	//select taskListItem's children
	var checkbox = taskListItem.querySelector('input[type=checkbox]')
	var editButton = taskListItem.getElementsByClassName('edit')[0];
	var deleteButton = taskListItem.getElementsByClassName('delete')[0];

	// bind editTask to edit button 
	editButton.onclick = editTask;
	// bind deleteTask to delete button
	deleteButton.onclick = deleteTask;
	// bind checkboxEventHandler to checkbox
	checkbox.onchange = checkBoxEventHandler;
} 

var ajaxRequest = function() {
	if(taskInput.value != '') {
		console.log('AJAX request');
	}
}

// Set the click handler to the addTask function
addButton.addEventListener('click', addTask);
addButton.addEventListener('click', ajaxRequest);

// cycle over incompleteTasksHolder ul list items
for(var i=0; i < incompleteTasksHolder.children.length; i++) {
	bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
	// for each list item
		// bind events to list item's children (taskCompleted)
}


// cycle over completeTasksHolder ul list items
for(var i=0; i < completedTasksHolder.children.length; i++) {
	bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
	// for each list item
		// bind events to list item's children (taskIncomplete)
}



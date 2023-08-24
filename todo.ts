import * as readline from 'readline';

type Todo = {
	text: string;
	completed: boolean;
};

const taskArray: Todo[] = [];

const createTask = (text: string): Todo => {
	return {
		text,
		completed: false,
	};
};

const addTask = (task: Todo) => {
	taskArray.push(task);
};

const displayTask = () => {
	if (taskArray.length === 0) {
		console.log("No tasks.");
	} else {
		taskArray.forEach((task, index) => {
			const status = task.completed ? '[x]' : '[ ]';
			console.log(`${index + 1}. ${status} ${task.text}`);
		});
	}
};

const toggleTask = (taskId: number) => {
	if (taskId >= 1 && taskId <= taskArray.length) {
		taskArray[taskId - 1].completed = !taskArray[taskId - 1].completed;
	} else {
		console.log("Invalid taskId.\n");
	}
};

const deleteTask = (taskId: number) => {
	if (taskId >= 1 && taskId <= taskArray.length) {
		taskArray.splice(taskId - 1, 1);
	} else {
		console.log("Invalid taskId. No task deleted.");
	}
};

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

const main = () => {
	displayTask()
	rl.question("Choose an action: add, toggle, delete, or exit: ", (answer: string) => {
		switch (answer.toLowerCase()) {
			case 'add':
				rl.question("Enter task description: ", (text: string) => {
					const newTask = createTask(text);
					addTask(newTask);
					console.log("Task added.");
					main();
				});
				break;

			// case 'list':
			// 	displayTask();
			// 	main();
			// 	break;

			case 'toggle':
				rl.question("Enter task number to toggle: ", (numStr: string) => {
					const taskId = parseInt(numStr);
					toggleTask(taskId);
					console.log("Task toggled.");
					main();
				});
				break;

			case 'delete':
				rl.question("Enter task number to delete: ", (numStr: string) => {
					const taskId = parseInt(numStr);
					deleteTask(taskId);
					console.log("Task deleted.");
					main();
				});
				break;

			case 'exit':
				rl.close();
				break;

			default:
				console.log("Invalid choice.");
				main();
				break;
		}
	});
};

main();

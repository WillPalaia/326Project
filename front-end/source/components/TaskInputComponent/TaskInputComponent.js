import { EventHub } from '../../eventhub/EventHub.js';
import { Events } from '../../eventhub/Events.js';
import { BaseComponent } from '../BaseComponent/BaseComponent.js';

export class TaskInputComponent extends BaseComponent {
  #container = null;

  constructor() {
    super();
    this.loadCSS('TaskInputComponent');
  }

  render() {
    if (this.#container) {
      return this.#container;
    }
    
    this.#createContainer();
    this.#attachEventListeners();
    return this.#container;
  }

  #createContainer() {
    // Create and configure the container element
    this.#container = document.createElement('div');
    this.#container.classList.add('task-input');
    this.#container.innerHTML = this.#getTemplate();
  }

  #getTemplate() {
    // Returns the HTML template for the component
    return `
      <input type="text" id="taskInput" placeholder="Enter task">
      <input type="file" id="fileInput">
      <button id="addTaskBtn">Add Task</button>
    `;
  }

  #attachEventListeners() {
    // Attach event listeners to the input and button elements
    const addTaskBtn = this.#container.querySelector('#addTaskBtn');
    const taskInput = this.#container.querySelector('#taskInput');
    const fileInput = this.#container.querySelector('#fileInput');

    addTaskBtn.addEventListener('click', () => this.#handleAddTask(taskInput, fileInput));
  }

  #handleAddTask(taskInput, fileInput) {
    const task = taskInput.value;
    const file = fileInput.files[0];

    if (!task) {
      alert('Please enter a task.');
      return;
    }

    // Publish a 'NewTask' event with the task and file data
    this.#publishNewTask(task, file);

    // Clear inputs
    this.#clearInputs(taskInput, fileInput);
  }

  #publishNewTask(task, file) {
    const hub = EventHub.getInstance();
    hub.publish(Events.NewTask, { task, file });
    hub.publish(Events.StoreTask, { task, file });
  }

  #clearInputs(taskInput, fileInput) {
    taskInput.value = '';
    fileInput.value = '';
  }
}

import { EventHub } from '../../eventhub/EventHub.js';
import { Events } from '../../eventhub/Events.js';
import { BaseComponent } from '../BaseComponent/BaseComponent.js';
import { TaskComponent } from '../TaskComponent/TaskComponent.js';

export class TaskListComponent extends BaseComponent {
  #container = null; // Private variable to store the container element

  constructor() {
    super();
    this.loadCSS('TaskListComponent');
  }

  // Renders the component and returns the container element
  render() {
    if (this.#container) {
      return this.#container;
    }
    
    this.#createContainer();
    this.#setupContainerContent();
    this.#attachEventListeners();

    return this.#container;
  }

  // Creates the container element and applies the necessary classes
  #createContainer() {
    this.#container = document.createElement('div');
    this.#container.classList.add('task-list');
  }

  // Sets up the inner HTML of the container
  #setupContainerContent() {
    this.#container.innerHTML = `
      <h2>Task List</h2>
      <ul id="taskList"></ul>
      <button id="clearTasksBtn">Clear All Tasks</button>
    `;
  }

  // Attaches the event listeners for the component
  #attachEventListeners() {
    const hub = EventHub.getInstance();

    // Subscribe to the 'NewTask' event to add a new task
    hub.subscribe('NewTask', taskData => this.#addTaskToList(taskData));

    // Attach event listener for clearing tasks
    const clearTasksBtn = this.#container.querySelector('#clearTasksBtn');
    clearTasksBtn.addEventListener('click', () => this.#clearTasks());

    // Subscribe to 'UnStoreTasksSuccess' to clear the task list
    hub.subscribe(Events.UnStoreTasksSuccess, () => this.#clearTaskList());
  }

  // Adds a task to the task list
  #addTaskToList(taskData) {
    const taskList = this.#getTaskListElement();
    const taskContainer = document.createElement('li');

    // Create a new TaskComponent for each task
    const task = new TaskComponent(taskData);
    taskList.appendChild(task.render());
  }

  // Retrieves the task list <ul> element
  #getTaskListElement() {
    return this.#container.querySelector('#taskList');
  }

  // Clears the tasks from the task list and publishes an event
  #clearTasks() {
    console.log('Clearing tasks');
    const hub = EventHub.getInstance();
    hub.publish(Events.UnStoreTasks, null);
  }

  // Clears the task list content when tasks are removed successfully
  #clearTaskList() {
    const taskList = this.#getTaskListElement();
    taskList.innerHTML = '';
  }

  getContainer() {
    return this.#container;
  }
}

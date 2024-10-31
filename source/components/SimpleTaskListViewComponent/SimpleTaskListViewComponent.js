import { BaseComponent } from '../BaseComponent/BaseComponent.js';
import { EventHub } from '../../eventhub/EventHub.js';
import { Events } from '../../eventhub/Events.js';
import { TaskComponent } from '../TaskComponent/TaskComponent.js';

export class SimpleTaskListViewComponent extends BaseComponent {
  #container = null; // Private variable to store the container element
  #tasks = []; // To store task data

  constructor() {
    super();
    this.loadCSS('SimpleTaskListViewComponent');
  }

  // Method to render the component and return the container
  render() {
    if (this.#container) {
      return this.#container;
    }

    this.#createContainer();
    this.#setupContainerContent();
    this.#attachEventListeners();

    return this.#container;
  }

  // Method to set the list of tasks to display
  setTasks(tasks) {
    this.#tasks = tasks;
    this.#renderTasks();
  }

  // Creates the container element for the component
  #createContainer() {
    this.#container = document.createElement('div');
    this.#container.classList.add('simple-task-list-view');
  }

  // Sets up the basic HTML structure of the component
  #setupContainerContent() {
    this.#container.innerHTML = `
      <h2>Simple Task List</h2>
      <ul id="simpleTaskList"></ul>      
    `;
  }

  // Renders the tasks in the list
  #renderTasks() {
    const taskList = this.#container.querySelector('#simpleTaskList');
    taskList.innerHTML = ''; // Clear existing content

    this.#tasks.forEach(taskData => {
      const taskContainer = document.createElement('li');
      taskContainer.classList.add('task-item');
      
      // Create a new TaskComponent for each task
      const task = new TaskComponent(taskData);
      taskContainer.appendChild(task.render());
      taskList.appendChild(taskContainer);
    });
  }

  // Attaches the event listeners to the component
  #attachEventListeners() {
    const backToMainViewBtn = this.#container.querySelector('#backToMainViewBtn');

    const hub = EventHub.getInstance();
    hub.subscribe(Events.NewTask, (taskData) => {
      this.#tasks.push(taskData);      
      this.#renderTasks();
    });

    hub.subscribe(Events.UnStoreTasks, () => {
      this.#tasks = [];
      this.#renderTasks();
    });
  }
}

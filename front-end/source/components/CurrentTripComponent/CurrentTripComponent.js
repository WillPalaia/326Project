import { BaseComponent } from '../BaseComponent/BaseComponent.js';
import { EmergencyContactsInputComponent } from '../EmergencyContactsInputComponent/EmergencyContactsInputComponent.js';
import { EmergencyContactsListComponent } from '../EmergencyContactsListComponent/EmergencyContactsListComponent.js';
import { EmergencyContactsService } from '../../services/EmergencyContactsService.js';
import { TaskRepositoryService } from '../../services/TaskRepositoryService.js';

// send email in case of emergency
const triggerSendEmail = async (trail, contacts) => {
  try {
    const res = await fetch('http://localhost:3000/v1/api/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'John',
        from: trail.from,
        to: trail.to,
        contacts: contacts,
      }),
    });
  } catch (e) {}
};

triggerSendEmail();
let first_load = true; // check if this component is loaded for the first time

// info about the current trip
const currentTrip = {
  timeRemaining: 0,
  from: '',
  to: '',
  id: 0,
};

export class CurrentTripComponent extends BaseComponent {
  constructor() {
    super();
    this.contacts = [];
    this.helpButton = document.createElement('button');
    this.endTripButton = document.createElement('button');
    this.countdown = document.createElement('div');
    this.tripText = document.createElement('div');
  }

  // update current trip info
  async getTripInfo() {
    const service = new TaskRepositoryService();
    const trails = await service.loadTasksFromDB();
    if (trails.length > 0) {
      if (
        currentTrip.from !== trails[0].fromLocation ||
        currentTrip.to !== trails[0].toLocation
      ) {
        this.endTripButton.style.display = 'block';
        this.helpButton.style.display = 'block';
        currentTrip.timeRemaining = 7200;
        currentTrip.from = trails[0].fromLocation;
        currentTrip.to = trails[0].toLocation;
        currentTrip.id = trails[0].id;

        this.tripText.textContent = `We're going from ${currentTrip.from} to ${currentTrip.to}`;
      }
    } else {
      currentTrip.timeRemaining = 0;
    }
  }

  // get emergency contacts
  async getContacts() {
    try {
      const service = new EmergencyContactsService();
      await service.initDB();
      //service.clearAllIndexedDBData();
      this.contacts = await service.loadContactsFromDB();
    } catch (e) {
      console.log(e.message);
    }
  }

  async render() {
    // Create or find a specific container for this component's content
    let container = document.getElementById('currentTripContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'currentTripContainer';
      container.style.fontFamily = 'Arial, sans-serif';
      container.style.margin = '0';
      container.style.padding = '0';
      container.style.overflow = 'hidden';
      container.style.height = '100vh';
      container.style.width = '100vw';
      container.style.position = 'relative';
      container.style.backgroundImage =
        "url('./components/CurrentTripComponent/hihi.jpg')";
      container.style.backgroundSize = 'cover';
      container.style.backgroundRepeat = 'no-repeat';
      container.style.backgroundPosition = 'center';
      document.body.appendChild(container);
    } else {
      container.innerHTML = ''; // Clear any previous content
    }

    // trip starting and ending locations
    this.tripText.textContent =
      currentTrip.timeRemaining > 0
        ? `We're going from ${currentTrip.from} to ${currentTrip.to}`
        : 'No Active Trip';
    this.tripText.style.position = 'absolute';
    this.tripText.style.top = '5%';
    this.tripText.style.left = '50%';
    this.tripText.style.transform = 'translateX(-50%)';
    this.tripText.style.fontSize = '30px';
    this.tripText.style.fontWeight = 'bold';
    this.tripText.style.color = '#a6a69c';
    this.tripText.style.textAlign = 'center';
    this.tripText.style.textShadow = '0 1px 3px rgba(0, 0, 0, 0.8)';
    container.appendChild(this.tripText);

    // countdown text
    this.countdown.id = 'countdown';
    this.countdown.style.position = 'absolute';
    this.countdown.style.top = '15%';
    this.countdown.style.left = '50%';
    this.countdown.style.transform = 'translateX(-50%)';
    this.countdown.style.display = 'flex';
    this.countdown.style.gap = '20px';
    this.countdown.style.background = 'rgba(0, 0, 0, 0.6)';
    this.countdown.style.borderRadius = '10px';
    this.countdown.style.padding = '20px';
    this.countdown.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.3)';

    // edit countdown button
    let isEditingCountdown = false;
    const editCountDownButton = document.createElement('button');
    editCountDownButton.id = 'editButton';
    editCountDownButton.textContent = 'Edit';
    editCountDownButton.style.position = 'absolute';
    editCountDownButton.style.top = '5px';
    editCountDownButton.style.left = '5px';
    editCountDownButton.style.background = 'rgba(255, 255, 255, 0.8)';
    editCountDownButton.style.border = 'none';
    editCountDownButton.style.borderRadius = '5px';
    editCountDownButton.style.padding = '5px 10px';
    editCountDownButton.style.cursor = 'pointer';
    editCountDownButton.style.fontSize = '14px';
    editCountDownButton.style.fontWeight = 'bold';
    editCountDownButton.addEventListener('click', () => {
      isEditingCountdown = true;
      editCountDownButton.style.display = 'none';
      saveEditCountdownButton.style.display = 'block';
      cancelEditCountdownButton.style.display = 'block';
      alert('Edit button clicked!');
    });
    this.countdown.appendChild(editCountDownButton);

    const updateCountdown = () => {
      const daysElement = document.getElementById('days');
      const hoursElement = document.getElementById('hours');
      const minutesElement = document.getElementById('minutes');
      const secondsElement = document.getElementById('seconds');

      if (currentTrip.timeRemaining == 1) {
        triggerSendEmail(currentTrip, this.contacts);
        this.countdown.style.display = 'none';
        if (this.helpButton) {
          this.helpButton.style.display = 'none';
        }
        if (this.endTripButton) {
          this.endTripButton.style.display = 'none';
        }
        alert('Called Emergency Contact!');
      }

      if (currentTrip.timeRemaining <= 0) {
        this.countdown.style.display = 'none';
        if (this.helpButton) {
          this.helpButton.style.display = 'none';
        }
        if (this.endTripButton) {
          this.endTripButton.style.display = 'none';
        }
        return;
      }

      this.countdown.style.display = 'flex';
      currentTrip.timeRemaining -= 1;

      const seconds = currentTrip.timeRemaining % 60;
      const minutes = Math.floor(currentTrip.timeRemaining / 60) % 60;
      const hours = Math.floor(currentTrip.timeRemaining / 3600) % 24;
      const days = Math.floor(currentTrip.timeRemaining / (3600 * 24)) % 24;

      if (!isEditingCountdown) {
        if (daysElement) {
          daysElement.textContent = String(days).padStart(2, '0');
        }
        if (hoursElement) {
          hoursElement.textContent = String(hours).padStart(2, '0');
        }
        if (minutesElement) {
          minutesElement.textContent = String(minutes).padStart(2, '0');
        }
        if (secondsElement) {
          secondsElement.textContent = String(seconds).padStart(2, '0');
        }
      }
    };

    // countdown box
    const createInteractiveTimeBox = (id, label) => {
      const timeBox = document.createElement('div');
      timeBox.className = 'time-box';
      timeBox.style.textAlign = 'center';
      timeBox.style.color = 'white';
      timeBox.style.position = 'relative';

      const timeValue = document.createElement('span');
      timeValue.id = id;
      timeValue.className = 'time-value';
      timeValue.style.fontSize = '48px';
      timeValue.style.fontWeight = 'bold';
      timeValue.textContent = '00';

      const timeLabel = document.createElement('span');
      timeLabel.className = 'time-label';
      timeLabel.style.fontSize = '14px';
      timeLabel.style.textTransform = 'uppercase';
      timeLabel.style.opacity = '0.8';
      timeLabel.textContent = label;

      // Create up arrow
      const upArrow = document.createElement('div');
      upArrow.textContent = '▲';
      upArrow.style.position = 'absolute';
      upArrow.style.top = '-20px';
      upArrow.style.left = '50%';
      upArrow.style.transform = 'translateX(-50%)';
      upArrow.style.cursor = 'pointer';
      upArrow.style.fontSize = '14px';
      upArrow.style.display = 'none';

      // Create down arrow
      const downArrow = document.createElement('div');
      downArrow.textContent = '▼';
      downArrow.style.position = 'absolute';
      downArrow.style.bottom = '-20px';
      downArrow.style.left = '50%';
      downArrow.style.transform = 'translateX(-50%)';
      downArrow.style.cursor = 'pointer';
      downArrow.style.fontSize = '14px';
      downArrow.style.display = 'none';

      // Show arrows on hover
      timeBox.addEventListener('mouseover', () => {
        if (isEditingCountdown) {
          upArrow.style.display = 'block';
          downArrow.style.display = 'block';
        }
      });

      // Hide arrows on mouse out
      timeBox.addEventListener('mouseout', () => {
        upArrow.style.display = 'none';
        downArrow.style.display = 'none';
      });

      // Increase the value
      upArrow.addEventListener('click', () => {
        const currentValue = parseInt(timeValue.textContent, 10);
        let changedValue = currentValue + 1;
        if (id == 'days') {
          changedValue = Math.min(changedValue, 99);
        } else if (id == 'hours') {
          changedValue = Math.min(changedValue, 23);
        } else {
          changedValue = Math.min(changedValue, 59);
        }
        timeValue.textContent = String(changedValue).padStart(2, '0');
      });

      // Decrease the value
      downArrow.addEventListener('click', () => {
        const currentValue = parseInt(timeValue.textContent, 10);
        if (currentValue > 0) {
          timeValue.textContent = String(currentValue - 1).padStart(2, '0');
        }
      });

      timeBox.appendChild(upArrow);
      timeBox.appendChild(timeValue);
      timeBox.appendChild(downArrow);
      timeBox.appendChild(document.createElement('br'));
      timeBox.appendChild(timeLabel);

      return timeBox;
    };

    this.countdown.appendChild(createInteractiveTimeBox('days', 'DAYS'));
    this.countdown.appendChild(createInteractiveTimeBox('hours', 'HOURS'));
    this.countdown.appendChild(createInteractiveTimeBox('minutes', 'MINUTES'));
    this.countdown.appendChild(createInteractiveTimeBox('seconds', 'SECONDS'));
    container.appendChild(this.countdown);

    if (first_load) {
      first_load = false;
      updateCountdown();
      this.getTripInfo();
      setInterval(() => updateCountdown(), 1000);
      setInterval(() => this.getTripInfo(), 1000);
    }

    // button container
    const editingCountdownButtons = document.createElement('div');
    editingCountdownButtons.style.position = 'absolute';
    editingCountdownButtons.style.top = 'calc(20% + 110px)'; // Position below the countdown box
    editingCountdownButtons.style.right = '39%';
    editingCountdownButtons.style.display = 'flex';
    editingCountdownButtons.style.gap = '10px'; // Space between buttons

    // cancel countdown button
    const cancelEditCountdownButton = document.createElement('button');
    cancelEditCountdownButton.textContent = 'Cancel';
    cancelEditCountdownButton.style.top = '8px';
    cancelEditCountdownButton.style.right = '10px';
    cancelEditCountdownButton.style.background = '#87888a';
    cancelEditCountdownButton.style.border = '0px solid #ccc';
    cancelEditCountdownButton.style.borderRadius = '5px';
    cancelEditCountdownButton.style.padding = '5px 12px';
    cancelEditCountdownButton.style.cursor = 'pointer';
    cancelEditCountdownButton.style.fontSize = '12px';
    cancelEditCountdownButton.style.fontWeight = 'bold';
    cancelEditCountdownButton.style.display = 'none';
    cancelEditCountdownButton.addEventListener('click', () => {
      isEditingCountdown = false;
      editCountDownButton.style.display = 'block';
      saveEditCountdownButton.style.display = 'none';
      cancelEditCountdownButton.style.display = 'none';
    });

    // save countdown button
    const saveEditCountdownButton = document.createElement('button');
    saveEditCountdownButton.textContent = 'Save';
    saveEditCountdownButton.style.top = '8px';
    saveEditCountdownButton.style.right = '10px';
    saveEditCountdownButton.style.background = '#2447e3';
    saveEditCountdownButton.style.border = '0px solid #ccc';
    saveEditCountdownButton.style.borderRadius = '5px';
    saveEditCountdownButton.style.padding = '5px 15px';
    saveEditCountdownButton.style.cursor = 'pointer';
    saveEditCountdownButton.style.fontSize = '12px';
    saveEditCountdownButton.style.fontWeight = 'bold';
    saveEditCountdownButton.style.display = 'none';
    saveEditCountdownButton.addEventListener('click', () => {
      isEditingCountdown = false;
      editCountDownButton.style.display = 'block';

      const days = Number(document.getElementById('days').textContent);
      const hours = Number(document.getElementById('hours').textContent);
      const minutes = Number(document.getElementById('minutes').textContent);
      const seconds = Number(document.getElementById('seconds').textContent);

      currentTrip.timeRemaining =
        days * 24 * 3600 + hours * 3600 + minutes * 60 + seconds;

      saveEditCountdownButton.style.display = 'none';
      cancelEditCountdownButton.style.display = 'none';
    });

    editingCountdownButtons.appendChild(cancelEditCountdownButton);
    editingCountdownButtons.appendChild(saveEditCountdownButton);

    container.appendChild(editingCountdownButtons);

    // end trip button
    this.endTripButton.id = 'endTripButton';
    this.endTripButton.textContent = 'End Trip';
    this.endTripButton.style.position = 'absolute';
    this.endTripButton.style.top = 'calc(20% + 150px)';
    this.endTripButton.style.left = '55%';
    this.endTripButton.style.transform = 'translateX(-50%)';
    this.endTripButton.style.background = 'blue';
    this.endTripButton.style.color = 'white';
    this.endTripButton.style.border = 'none';
    this.endTripButton.style.borderRadius = '50%';
    this.endTripButton.style.width = '80px';
    this.endTripButton.style.height = '80px';
    this.endTripButton.style.fontSize = '16px';
    this.endTripButton.style.fontWeight = 'bold';
    this.endTripButton.style.cursor = 'pointer';
    this.endTripButton.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.3)';
    this.endTripButton.style.display =
      currentTrip.timeRemaining <= 0 ? 'none' : 'block';
    this.endTripButton.addEventListener('click', () => {
      currentTrip.timeRemaining = 0;
      const service = new TaskRepositoryService();
      service.deleteTask(currentTrip.id);
      alert('Trip Ended!');
    });

    container.appendChild(this.endTripButton);

    // HELP button
    this.helpButton.id = 'helpButton';
    this.helpButton.textContent = 'HELP';
    this.helpButton.style.position = 'absolute';
    this.helpButton.style.top = 'calc(20% + 150px)';
    this.helpButton.style.left = '45%';
    this.helpButton.style.transform = 'translateX(-50%)';
    this.helpButton.style.background = 'red';
    this.helpButton.style.color = 'white';
    this.helpButton.style.border = 'none';
    this.helpButton.style.borderRadius = '50%';
    this.helpButton.style.width = '80px';
    this.helpButton.style.height = '80px';
    this.helpButton.style.fontSize = '16px';
    this.helpButton.style.fontWeight = 'bold';
    this.helpButton.style.cursor = 'pointer';
    this.helpButton.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.3)';
    this.helpButton.style.display =
      currentTrip.timeRemaining <= 0 ? 'none' : 'block';
    this.helpButton.addEventListener('click', () => {
      triggerSendEmail(currentTrip, this.contacts);
      alert('Called Emergency Contact!');
    });

    container.appendChild(this.helpButton);

    // emergency contact list
    const emergencyBox = document.createElement('div');
    emergencyBox.style.position = 'absolute';
    emergencyBox.style.top = 'calc(20% + 300px)';
    emergencyBox.style.left = '50%';
    emergencyBox.style.transform = 'translateX(-50%)';
    emergencyBox.style.backgroundColor = '#aeb5b0';
    emergencyBox.style.padding = '15px';
    emergencyBox.style.borderRadius = '10px';
    emergencyBox.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.3)';
    emergencyBox.style.width = '350px';
    emergencyBox.style.textAlign = 'center';

    // edit emergency button
    const editEmergencyButton = document.createElement('button');
    editEmergencyButton.textContent = 'Edit';
    editEmergencyButton.style.position = 'absolute';
    editEmergencyButton.style.top = '10px';
    editEmergencyButton.style.right = '10px';
    editEmergencyButton.style.background = '#2447e3';
    editEmergencyButton.style.border = '1px solid #ccc';
    editEmergencyButton.style.borderRadius = '5px';
    editEmergencyButton.style.padding = '5px 10px';
    editEmergencyButton.style.cursor = 'pointer';
    editEmergencyButton.style.fontSize = '12px';
    editEmergencyButton.style.fontWeight = 'bold';
    editEmergencyButton.addEventListener('click', () => {
      container.style.backgroundImage = 'none';
      // Clears container all content from container element
      container.innerHTML = '';

      // Create and render input component
      const inputComponent = new EmergencyContactsInputComponent();
      container.appendChild(inputComponent.render());

      // Create and render list component
      const listComponent = new EmergencyContactsListComponent();
      container.appendChild(listComponent.render());
    });
    emergencyBox.appendChild(editEmergencyButton);

    // emergency title
    const emergencyTitle = document.createElement('h4');
    emergencyTitle.textContent = 'Emergency Contact';
    emergencyTitle.style.margin = '0 0 10px';
    emergencyBox.appendChild(emergencyTitle);

    // emergency list
    const emergencyList = document.createElement('ul');
    emergencyList.style.listStyleType = 'none';
    emergencyList.style.padding = '0';

    emergencyBox.appendChild(emergencyList);
    container.appendChild(emergencyBox);

    await this.getContacts();

    // add contact to list
    this.contacts.forEach(({ firstName, lastName, email }) => {
      const li = document.createElement('li');
      li.style.display = 'flex';
      li.style.justifyContent = 'space-between';
      li.style.marginBottom = '10px';
      li.style.fontSize = '14px';
      li.style.color = '#333';

      // left column: Name
      const nameCol = document.createElement('div');
      nameCol.textContent = firstName + ' ' + lastName;
      nameCol.style.textAlign = 'left';
      nameCol.style.flex = '1';
      li.appendChild(nameCol);

      // right column: Email
      const emailCol = document.createElement('div');
      emailCol.textContent = email;
      emailCol.style.textAlign = 'right';
      emailCol.style.flex = '1';
      li.appendChild(emailCol);

      emergencyList.appendChild(li);
    });

    container.appendChild(this.helpButton);

    return container;
  }
}

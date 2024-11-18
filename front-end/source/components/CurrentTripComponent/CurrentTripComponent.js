import { BaseComponent } from '../BaseComponent/BaseComponent.js';
import { EmergencyContactsInputComponent } from '../EmergencyContactsInputComponent/EmergencyContactsInputComponent.js';
import { EmergencyContactsListComponent } from '../EmergencyContactsListComponent/EmergencyContactsListComponent.js';
import { EventHub } from '../../eventhub/EventHub.js';

export class CurrentTripComponent extends BaseComponent {
  constructor() {
    super();
    this.loadCSS('CurrentTripComponent');
    this.hub = EventHub.getInstance();
  }

  render() {
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
    const tripText = document.createElement('div');
    tripText.textContent = "We're going from Amherst to Boston";
    tripText.style.position = 'absolute';
    tripText.style.top = '5%';
    tripText.style.left = '50%';
    tripText.style.transform = 'translateX(-50%)';
    tripText.style.fontSize = '30px';
    tripText.style.fontWeight = 'bold';
    tripText.style.color = '#a6a69c';
    tripText.style.textAlign = 'center';
    tripText.style.textShadow = '0 1px 3px rgba(0, 0, 0, 0.8)';
    container.appendChild(tripText);

    // countdown text
    const countdown = document.createElement('div');
    countdown.id = 'countdown';
    countdown.style.position = 'absolute';
    countdown.style.top = '15%';
    countdown.style.left = '50%';
    countdown.style.transform = 'translateX(-50%)';
    countdown.style.display = 'flex';
    countdown.style.gap = '20px';
    countdown.style.background = 'rgba(0, 0, 0, 0.6)';
    countdown.style.borderRadius = '10px';
    countdown.style.padding = '20px';
    countdown.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.3)';

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
    countdown.appendChild(editCountDownButton);

    let timeRemaining = 7200;

    const updateCountdown = () => {
      const daysElement = document.getElementById('days');
      const hoursElement = document.getElementById('hours');
      const minutesElement = document.getElementById('minutes');
      const secondsElement = document.getElementById('seconds');

      timeRemaining -= 1;

      const seconds = timeRemaining % 60;
      const minutes = Math.floor(timeRemaining / 60) % 60;
      const hours = Math.floor(timeRemaining / 3600) % 24;
      const days = Math.floor(timeRemaining / (3600 * 24)) % 24;

      if (!isEditingCountdown) {
        if (daysElement) {daysElement.textContent = String(days).padStart(2, '0')};
        if (hoursElement) {hoursElement.textContent = String(hours).padStart(2, '0')};
        if (minutesElement) {minutesElement.textContent = String(minutes).padStart(2, '0')};
        if (secondsElement) {secondsElement.textContent = String(seconds).padStart(2, '0')};
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

    countdown.appendChild(createInteractiveTimeBox('days', 'DAYS'));
    countdown.appendChild(createInteractiveTimeBox('hours', 'HOURS'));
    countdown.appendChild(createInteractiveTimeBox('minutes', 'MINUTES'));
    countdown.appendChild(createInteractiveTimeBox('seconds', 'SECONDS'));
    container.appendChild(countdown);

    updateCountdown();
    setInterval(() => updateCountdown(), 1000);

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
      alert('Save button clicked!');
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

      timeRemaining = days * 24 * 3600 + hours * 3600 + minutes * 60 + seconds;

      saveEditCountdownButton.style.display = 'none';
      cancelEditCountdownButton.style.display = 'none';
      alert('Save button clicked!');
    });

    editingCountdownButtons.appendChild(cancelEditCountdownButton);
    editingCountdownButtons.appendChild(saveEditCountdownButton);

    container.appendChild(editingCountdownButtons);

    // HELP button
    const helpButton = document.createElement('button');
    helpButton.id = 'helpButton';
    helpButton.textContent = 'HELP';
    helpButton.style.position = 'absolute';
    helpButton.style.top = 'calc(20% + 150px)';
    helpButton.style.left = '50%';
    helpButton.style.transform = 'translateX(-50%)';
    helpButton.style.background = 'red';
    helpButton.style.color = 'white';
    helpButton.style.border = 'none';
    helpButton.style.borderRadius = '50%';
    helpButton.style.width = '80px';
    helpButton.style.height = '80px';
    helpButton.style.fontSize = '16px';
    helpButton.style.fontWeight = 'bold';
    helpButton.style.cursor = 'pointer';
    helpButton.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.3)';
    helpButton.addEventListener('click', () => {
      alert('Called Emergency Contact!');
    });

    container.appendChild(helpButton);

    // emergency contact list
    const emergencyBox = document.createElement('div');
    emergencyBox.style.position = 'absolute';
    emergencyBox.style.top = 'calc(20% + 300px)';
    emergencyBox.style.left = '50%';
    emergencyBox.style.transform = 'translateX(-50%)';
    emergencyBox.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
    emergencyBox.style.padding = '15px';
    emergencyBox.style.borderRadius = '10px';
    emergencyBox.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.3)';
    emergencyBox.style.width = '350px';
    emergencyBox.style.textAlign = 'center';

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
      container.style.backgroundImage = 'none'
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

    const contacts = [
      { name: 'Contact 1', phone: '123-456-7890' },
      { name: 'Contact 2', phone: '123-456-7890' },
      { name: 'Contact 3', phone: '123-456-7890' },
    ];

    // add contact to list
    contacts.forEach(({ name, phone }) => {
      const li = document.createElement('li');
      li.style.display = 'flex';
      li.style.justifyContent = 'space-between';
      li.style.marginBottom = '10px';
      li.style.fontSize = '14px';
      li.style.color = '#333';

      // left column: Name
      const nameCol = document.createElement('div');
      nameCol.textContent = name;
      nameCol.style.textAlign = 'left';
      nameCol.style.flex = '1';
      li.appendChild(nameCol);

      // right column: Phone
      const phoneCol = document.createElement('div');
      phoneCol.textContent = phone;
      phoneCol.style.textAlign = 'right';
      phoneCol.style.flex = '1';
      li.appendChild(phoneCol);

      emergencyList.appendChild(li);
    });

    emergencyBox.appendChild(emergencyList);
    container.appendChild(emergencyBox);

    container.appendChild(helpButton);

    return container;
  }
}

import { BaseComponent } from '../BaseComponent/BaseComponent.js';
import { EventHub } from '../../eventhub/EventHub.js';
import { BeginTrailComponent } from '../BeginTrailComponent/BeginTrailComponent.js';
import { AddNewTrailComponent } from '../AddNewTrailComponent/AddNewTrailComponent.js';
import { AboutPageComponent } from '../AboutPageComponent/AboutPageComponent.js';
import { EmergencyContactsInputComponent } from '../EmergencyContactsInputComponent/EmergencyContactsInputComponent.js';
import { EmergencyContactsListComponent } from '../EmergencyContactsListComponent/EmergencyContactsListComponent.js';



export class MainPageComponent extends BaseComponent {
  
  constructor() {
    super();
    this.loadCSS('MainPageComponent');
    this.hub = EventHub.getInstance();
  }

  render() {
    // Create or find a specific container for this component's content
    let container = document.getElementById('mainPageContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'mainPageContainer';
      document.body.appendChild(container);
    } else {
      container.innerHTML = ''; // Clear any previous content in the container
    }

    // Create and add the title
    const title = document.createElement("h1");
    title.id = "title";
    title.textContent = "TrailSafe";
    container.appendChild(title);

    // Create and add the "Add New Trail" button
    const addTrailBtn = document.createElement("button");
    addTrailBtn.id = "trailBtn";
    addTrailBtn.textContent = "Add New Trail";
    container.appendChild(addTrailBtn);


    // Create and add the "Add New Trail" button
    const beginTrailBtn = document.createElement("button");
    beginTrailBtn.id = "beginBtn";
    beginTrailBtn.textContent = "Begin Trail";
    container.appendChild(beginTrailBtn);

    
    // Create and add the "About" button
    const aboutPageBtn = document.createElement("button");
    aboutPageBtn.id = "aboutBtn";
    aboutPageBtn.textContent = "About TrailSafe";
    container.appendChild(aboutPageBtn);


     // Emergency Contact button 
     const emergencyContactsBtn = document.createElement("button"); // creates button 
     emergencyContactsBtn.id = "emergencyContactsBtn"; // sets the HTML id of the element
     emergencyContactsBtn.textContent = "Emergency Contacts"; //sets text for button 
     container.appendChild(emergencyContactsBtn); // appends button to "container" variable which is assigned on line 21 
     //Event Listeners 
    

    // adding event listener to " Begin Trail"
    beginTrailBtn.addEventListener('click', () => {
      const pageComponent = new BeginTrailComponent();
      pageComponent.render();
    })

    addTrailBtn.addEventListener('click', () => {
      const pageComponent = new AddNewTrailComponent();
      pageComponent.render();
    })

    aboutPageBtn.addEventListener('click', () => {
      const pageComponent = new AboutPageComponent();
      console.log("rendering About")
      pageComponent.render();
    })


    // In your Event Listeners 
    //When button is clicked execute the function below 
    emergencyContactsBtn.addEventListener('click', () => {
      
      // Clears container all content from container element 
      container.innerHTML = '';

      // Create title for the emergency contacts page
      const pageTitle = document.createElement("h2");
      pageTitle.textContent = "Emergency Contacts";
      container.appendChild(pageTitle);

      
      /*Temporary Code I do not know where to put this*/
      //is this the only way I can do it because I am rendering multiple folders? 
      // Create and render input component

      /*Lines 99-104: Add inputComponent and listComponent to container and then later container is rendered */
      const inputComponent = new EmergencyContactsInputComponent();
      container.appendChild(inputComponent.render()); 

      // Create and render list component
      const listComponent = new EmergencyContactsListComponent();
      container.appendChild(listComponent.render());

      //"Back to Main" button: re-renders main page 
      const backButton = document.createElement("button");
      backButton.id = "backToMainBtn";
      backButton.textContent = "Back to Main";
      backButton.addEventListener('click', () => {
          // Re-render main page
          this.render();
      });
      container.appendChild(backButton);
    });


    return container;
  }
}
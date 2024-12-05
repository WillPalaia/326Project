import { BaseComponent } from '../BaseComponent/BaseComponent.js';
import { EventHub } from '../../eventhub/EventHub.js';

export class LoginPageComponent extends BaseComponent {
  constructor() {
    super();
    this.loadCSS('LoginPageComponent');
    this.hub = EventHub.getInstance();
  }

  render() {
    // Create or find a specific container for this component's content
    let container = document.getElementById('LoginPageContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'LoginPageContainer';
      document.body.appendChild(container);
    } else {
      container.innerHTML = ''; // Clear any previous content in the container
    }
    
    //Title for Auth
    const title = document.createElement("h1");
    title.textContent = "TrailSafe Login";
    container.appendChild(title);

    //Enter Username
    const usernameInput = document.createElement("input");
    usernameInput.type = "text";
    usernameInput.id = "username";
    usernameInput.placeholder = "Username";
    container.appendChild(usernameInput);

    //Enter Password
    const passwordInput = document.createElement("input");
    passwordInput.type = "password";
    passwordInput.id = "password";
    passwordInput.placeholder = "Password";
    container.appendChild(passwordInput);

    //Register Button
    const registerBtn = document.createElement("button");
    registerBtn.id = "registerBtn";
    registerBtn.className = "component-box";
    container.appendChild(registerBtn);

    //Login Button
    const loginBtn = document.createElement("button");
    loginBtn.id = "loginBtn";
    loginBtn.className = "component-box";
    container.appendChild(loginBtn);

    //Logout Button 
    const logoutBtn = document.createElement("button");
    logoutBtn.id = "logoutBtn";
    logoutBtn.className = "component-box";
    container.appendChild(logoutBtn);

    //TODO: Add Google Login Button (will)
    //TODO: Add Admin, add forgot password, add delete button?

    return container;
  }

  async register() {

  }

  async login() {
  //TODO: For Will
  }
  
  async logout() {
    //TODO: For Will
  }

  
}
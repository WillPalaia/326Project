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
    registerBtn.textContent = "Register";
    container.appendChild(registerBtn);

    //Login Button
    const loginBtn = document.createElement("button");
    loginBtn.id = "loginBtn";
    loginBtn.textContent = "Login";
    container.appendChild(loginBtn);

    //Logout Button 
    const logoutBtn = document.createElement("button");
    logoutBtn.id = "logoutBtn";
    logoutBtn.textContent = "Logout";
    container.appendChild(logoutBtn);

    //Google Button
    const googleBtn = document.createElement("button");
    googleBtn.id = "googleBtn";
    googleBtn.textContent = "Login with Google";
    container.appendChild(googleBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.id = "deleteBtn";
    deleteBtn.textContent = "Delete Account";
    container.appendChild(deleteBtn);

    //Event Listeners
    registerBtn.addEventListener('click', () => this.register());
    loginBtn.addEventListener('click', () => this.login());
    logoutBtn.addEventListener('click', () => this.logout());
    googleBtn.addEventListener('click', () => this.loginGoogle());
    deleteBtn.addEventListener('click', () => this.deleteAccount());

 
    


    //TODO: Add Admin, add forgot password, add delete button?
    //TODO: Add more user feedback for different scenarios, such as username taken. 

    return container;
  }
  
  // Helper function to validate inputs
  validateInputs(username, password) {
    if (!username || !password) {
      alert("Username and password are required.");
      return false;
    }
    return true;
  }

  async register() {
    const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        //TODO: Verify API endpoints are correct
        const response = await fetch("/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        });
        const data = await response.json();
        console.log(JSON.stringify(data, null, 2));
        alert(data.message);
  }

  async login() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!this.validateInputs(username, password)) return;

    const loginBtn = document.getElementById("loginBtn");
    loginBtn.disabled = true;
    loginBtn.textContent = "Logging in...";

    try {
      const response = await fetch(`/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error(`Login failed: ${response.statusText}`);
      }

      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error("Error during login:", error);
      alert("Login failed. Please try again.");
    } finally {
      loginBtn.disabled = false;
      loginBtn.textContent = "Login";
    }
  }
  
  async logout() {
    const logoutBtn = document.getElementById("logoutBtn");
    logoutBtn.disabled = true;
    logoutBtn.textContent = "Logging out...";

    try {
      const response = await fetch(`/logout`);

      if (!response.ok) {
        throw new Error(`Logout failed: ${response.statusText}`);
      }

      const data = await response.json();
      alert(data.message);

      // Clear inputs
      document.getElementById("loginPage-username").value = "";
      document.getElementById("loginPage-password").value = "";
    } catch (error) {
      console.error("Error during logout:", error);
      alert("Logout failed. Please try again.");
    } finally {
      logoutBtn.disabled = false;
      logoutBtn.textContent = "Logout";
    }
  }
  
  async loginGoogle() {
    window.location.href = "/auth/google";
    }

  //Method for account deletion
  async deleteAccount() {
    //TODO: Make user verify password before deletion permission is granted
      const username = document.getElementById("username").value;
      const response = await fetch("/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });
      const data = await response.json();
      alert(data.message);
  }

  
}
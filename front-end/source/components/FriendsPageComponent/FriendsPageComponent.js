import { BaseComponent } from '../BaseComponent/BaseComponent.js';
import { EventHub } from '../../eventhub/EventHub.js';
import { Events } from '../../eventhub/Events.js';

export class FriendsPageComponent extends BaseComponent {
    constructor() {
      super();
      this.loadCSS('FriendsPageComponent');
      this.hub = EventHub.getInstance();
      this.userId = `user-${Math.floor(Math.random() * 10000)}`; 
      this.friendList = []; 
  }

  render() {
    let container = document.getElementById('friendPageContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'friendPageContainer';
      document.body.appendChild(container);
    } else {
      container.innerHTML = ''; // Clear previous content
    }

    // User ID Display
    const userIdDisplay = document.createElement('h1');
    userIdDisplay.textContent = `Your User ID: ${this.userId}`;
    container.appendChild(userIdDisplay);

    // Friend ID Input Section
    const inputSection = document.createElement('div');
    inputSection.classList.add('friendInputSection');
    container.appendChild(inputSection);
    inputSection.innerHTML = `
      <input type="text" id="friendInput" placeholder="Enter Friend User ID">
      <Button id="addFriendBtn">Add Friend</Button>
    `
    // Friend List Section
    const friendListSection = document.createElement('div');
    friendListSection.id = 'friendListSection';
    container.appendChild(friendListSection);
    friendListSection.innerHTML = `
      <h2>Friend List</h2>
      <ul id="friendList"></ul>
    `
    // Add Friend Event Listener
    const addFriendBtn = document.getElementById('addFriendBtn')
    const friendInput = document.getElementById('friendInput')
    addFriendBtn.addEventListener('click', () => {
      const friendId = friendInput.value.trim();
      if (friendId) {
        this.addFriend(friendId);
        this.hub.publish(Events.NewFriend, friendId)
        this.hub.publish(Events.StoreFriend, friendId)
        friendInput.value = ''; // Clear input field
      }
    });
    return container;
  }

  // Adds a friend to the list and updates the DOM
  addFriend(friendId) {
    if (!this.friendList.includes(friendId)) {
      this.friendList.push(friendId);
      const friendList = document.getElementById('friendList');
      const listItem = document.createElement('li');
      listItem.textContent = friendId;
      friendList.appendChild(listItem);
    } else {
      alert('Friend already added!');
    }
  }
}
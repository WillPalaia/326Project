import { BaseComponent } from '../BaseComponent/BaseComponent.js';
import { EventHub } from '../../eventhub/EventHub.js';

export class FriendsPageComponent extends BaseComponent {
    constructor() {
      super();
      this.loadCSS('FriendsPageComponent');
      this.hub = EventHub.getInstance();
      this.userId = `user-${Math.floor(Math.random() * 10000)}`; // Generate a random user ID
    this.friendList = []; // Store the list of friend IDs
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
    inputSection.id = 'friendInputSection';
    container.appendChild(inputSection);

    const friendInput = document.createElement('input');
    friendInput.type = 'text';
    friendInput.placeholder = 'Enter Friend User ID';
    friendInput.id = 'friendInput';
    inputSection.appendChild(friendInput);

    const addFriendBtn = document.createElement('button');
    addFriendBtn.textContent = 'Add Friend';
    addFriendBtn.id = 'addFriendBtn';
    inputSection.appendChild(addFriendBtn);

    // Friend List Section
    const friendListSection = document.createElement('div');
    friendListSection.id = 'friendListSection';
    container.appendChild(friendListSection);

    const friendListTitle = document.createElement('h2');
    friendListTitle.textContent = 'Friend List';
    friendListSection.appendChild(friendListTitle);

    const friendList = document.createElement('ul');
    friendList.id = 'friendList';
    friendListSection.appendChild(friendList);

    // Add Friend Event Listener
    addFriendBtn.addEventListener('click', () => {
      const friendId = friendInput.value.trim();
      if (friendId) {
        this.addFriend(friendId);
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
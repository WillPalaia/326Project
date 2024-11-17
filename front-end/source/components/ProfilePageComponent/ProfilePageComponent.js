import { BaseComponent } from '../BaseComponent/BaseComponent.js';
import { EventHub } from '../../eventhub/EventHub.js';

export class ProfilePageComponent extends BaseComponent {
    constructor() {
      super();
      this.loadCSS('ProfilePageComponent');
      this.hub = EventHub.getInstance();
    }
  
  
      render() {
        let container = document.getElementById('profilePageContainer');
        if (!container) {
          container = document.createElement('div');
          container.id = 'profilePageContainer';
          document.body.appendChild(container);
        } else {
          container.innerHTML = '';
        }
    
        // Title
        const title = document.createElement('h1');
        title.textContent = 'Your Profile';
        container.appendChild(title);
    
        // Profile Picture Section
        const profilePictureSection = document.createElement('div');
        profilePictureSection.id = 'profilePictureSection';
        container.appendChild(profilePictureSection);
    
        const profileImage = document.createElement('img');
        profileImage.id = 'profileImage';
        profileImage.src = 'https://via.placeholder.com/150'; // Placeholder image
        profileImage.alt = 'Profile Picture';
        profileImage.style.width = '150px';
        profileImage.style.height = '150px';
        profileImage.style.borderRadius = '50%'; // Circular image
        profileImage.style.border = '2px solid #ccc';
        profilePictureSection.appendChild(profileImage);
    
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*'; // Only allow image uploads
        fileInput.id = 'profilePictureInput';
        profilePictureSection.appendChild(fileInput);
    
        // Event Listener to Update Profile Image
        fileInput.addEventListener('change', (event) => {
          const file = event.target.files[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
              profileImage.src = e.target.result; // Update image src with the uploaded file
            };
            reader.readAsDataURL(file);
          }
        });
    
        return container;
      }
    }
    
import { BaseComponent } from '../BaseComponent/BaseComponent.js';
import { EventHub } from '../../eventhub/EventHub.js';
import { TrailLogService } from '../../services/TrailLogService.js';
import { MainPageComponent } from '../MainPageComponent/MainPageComponent.js'; 
import { Events } from '../../eventhub/Events.js'; 

export class AddNewTrailComponent extends BaseComponent {
    constructor() {
        super();
        this.loadCSS('AddNewTrailComponent');
        this.hub = EventHub.getInstance();
        this.trailLogService = new TrailLogService();
        this.trailData = [];
        this.trailImageUrl = '';
        this.mapImageContainer = null; // Store reference to the map container
    }

    render() {
        let container = document.getElementById('mainPageContainer');
        if (!container) {
            container = document.createElement('div');
            container.id = 'mainPageContainer';
            document.body.appendChild(container);
        } else {
            container.innerHTML = '';
        }
    
        container.classList.add('add-new-trail-container');
    
        // Header Section
        const header = document.createElement('div');
        header.className = 'header';
    
        const headerTitle = document.createElement('h2');
        headerTitle.className = 'header-title';
        headerTitle.textContent = 'Add Your New Trail';
    
        header.appendChild(headerTitle);
        container.appendChild(header);
    
        // Trail Name Input
        const trailNameDiv = document.createElement('div');
        trailNameDiv.className = 'trail-name';
        trailNameDiv.textContent = 'Trail Name:';
        container.appendChild(trailNameDiv);
    
        this.trailNameInput = document.createElement('input');
        this.trailNameInput.type = 'text';
        this.trailNameInput.placeholder = 'Enter trail name';
        container.appendChild(this.trailNameInput);
    
        // Add Trail Button
        const addTrailButton = document.createElement('button');
        addTrailButton.textContent = 'Add Trail';
        addTrailButton.className = 'add-trail-button';
        addTrailButton.addEventListener('click', this.addTrail.bind(this));
        container.appendChild(addTrailButton);

        // Success or Error Message Display
        this.successMessage = document.createElement('div');
        this.successMessage.className = 'success-message';
        this.successMessage.style.display = 'none';
        container.appendChild(this.successMessage);

        // Trail Results Display
        this.trailResultsContainer = document.createElement('div');
        this.trailResultsContainer.className = 'trail-results-container';
        container.appendChild(this.trailResultsContainer);
    
        return container;
    }
    

    navigateToMainPage() {
        this.hideMapImage();
        const mainPageComponent = new MainPageComponent();
        mainPageComponent.render();
    }

    async addTrail() {
        const trailName = this.trailNameInput.value.trim();
        if (!trailName) {
          this.showErrorMessage("Please enter a trail name to search.");
          return;
        }
    
        try {
          const response = await fetch(`/v1/places/search?query=${encodeURIComponent(trailName)}`);
          if (response.ok) {
            const trails = await response.json();
            if (trails.length === 0) {
              this.showErrorMessage("No trails found. Please try a different name.");
            } else {
              // Display the first trail result
              const trail1 = trails[0];
              this.displayTrailResult(trail1);
            }
          } else {
            this.showErrorMessage("Failed to fetch trail information. Please try again.");
          }
        } catch (error) {
          console.error('Error fetching trail:', error);
          this.showErrorMessage("An error occurred. Please try again.");
        }
      }

    displayTrailResult(trail) {
        // Clear previous results
        this.trailResultsContainer.innerHTML = '';
    
        const trailInfo = document.createElement('div');
        trailInfo.className = 'trail-info';
    
        trailInfo.innerHTML = `
            <h3>${trail.name}</h3>
            <p><strong>Rating:</strong> ${trail.rating || 'N/A'}</p>
            <p><strong>Top Review:</strong> ${trail.topReview || 'No reviews available'}</p>
        `;
    
        this.trailResultsContainer.appendChild(trailInfo);
    }

    showErrorMessage(message) {
        if (!this.successMessage) {
          // Create the element if it doesn't exist
          this.successMessage = document.createElement('div');
          this.successMessage.className = 'success-message';
          this.successMessage.style.display = 'none';
          // Append to container or an appropriate parent element
          const container = document.getElementById('mainPageContainer');
          container.appendChild(this.successMessage);
        }
        this.successMessage.textContent = message;
        this.successMessage.style.display = 'block';
        setTimeout(() => {
          this.successMessage.style.display = 'none';
        }, 3000);
      }

    clearForm() {
        this.trailNameInput.value = '';
        this.fromLocationInput.value = '';
        this.toLocationInput.value = '';
        this.trailImageInput.value = '';
        this.trailImagePreview.src = '';
        this.distanceDisplay.textContent = '';
        this.trailImageUrl = '';
    }
}
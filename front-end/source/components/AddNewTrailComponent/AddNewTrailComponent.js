// AddNewTrailComponent.js

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
        this.mapImageContainer = null;
        this.trailNameInput = null;
        this.trailResultsContainer = null;
        this.trailListContainer = null;
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

        // Trail Results Display (For displaying the detailed info of the added trail)
        this.trailResultsContainer = document.createElement('div');
        this.trailResultsContainer.className = 'trail-results-container';
        container.appendChild(this.trailResultsContainer);

        // Container for the list of added trails
        const trailListHeader = document.createElement('h3');
        trailListHeader.textContent = 'Your Added Trails';
        trailListHeader.style.marginRight = '100px'; 
        container.appendChild(trailListHeader);

        this.trailListContainer = document.createElement('div');
        this.trailListContainer.className = 'trail-list-container';
        container.appendChild(this.trailListContainer);

        this.fetchAndDisplayTrails();

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
                    this.fetchAndDisplayTrails();
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
        this.trailResultsContainer.innerHTML = '';
        const trailInfo = document.createElement('div');
        trailInfo.className = 'trail-info';
    
        trailInfo.innerHTML = `
            <h3>${trail.name}</h3>
            <p><strong>Editorial Summary:</strong> ${trail.editorial_summary || 'N/A'}</p>
            <p><strong>Rating:</strong> ${trail.rating || 'N/A'}</p>
            <p><strong>Top Review:</strong> ${trail.topReview || 'No reviews available'}</p>
            <p><strong>Address:</strong> ${trail.formatted_address || 'N/A'}</p>
            <p><strong>Website:</strong> <a href="${trail.website}" target="_blank">${trail.website}</a></p>
            <hr>
        `;
        this.trailResultsContainer.appendChild(trailInfo);
    }

    async fetchAndDisplayTrails() {
        try {
            const response = await fetch('/v1/trails');
            if (response.ok) {
                const trails = await response.json();
                this.displayTrailList(trails);
            } else {
                console.error('Failed to fetch trails.');
            }
        } catch (error) {
            console.error('Error fetching trails:', error);
        }
    }

    displayTrailList(trails) {
        this.trailListContainer.innerHTML = '';
        // Check if there are any trails
        if (trails.length === 0) {
          const noTrailsMessage = document.createElement('p');
          noTrailsMessage.textContent = 'No trails added yet.';
          this.trailListContainer.appendChild(noTrailsMessage);
          return;
        }
        // Display each trail in descending order of rating
        trails.forEach(trail => {
          const trailItem = document.createElement('div');
          trailItem.className = 'trail-item';
          trailItem.innerHTML = `
            <h4>${trail.name}</h4>
            <p><strong>Rating:</strong> ${trail.rating}</p>
            <p><strong>Website:</strong> <a href="${trail.website}" target="_blank">${trail.website}</a></p>
          `;
          // delete button
          const deleteButton = document.createElement('button');
          deleteButton.textContent = 'Delete';
          deleteButton.className = 'delete-button';
          deleteButton.addEventListener('click', () => this.deleteTrail(trail.trailId));
          trailItem.appendChild(deleteButton);
          this.trailListContainer.appendChild(trailItem);
        });
      }

      async deleteTrail(trailId) {
        try {
          const response = await fetch(`/v1/trails/${trailId}`, {
            method: 'DELETE',
          });
          if (response.ok) {
            this.fetchAndDisplayTrails();
          } else {
            console.error('Failed to delete trail.');
          }
        } catch (error) {
          console.error('Error deleting trail:', error);
        }
      }

    showErrorMessage(message) {
        this.successMessage.textContent = message;
        this.successMessage.style.display = 'block';
        setTimeout(() => {
            this.successMessage.style.display = 'none';
        }, 3000);
    }

    clearForm() {
        this.trailNameInput.value = '';
        this.trailResultsContainer.innerHTML = '';
    }
}
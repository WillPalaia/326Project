import { BaseComponent } from '../BaseComponent/BaseComponent.js';
import { EventHub } from '../../eventhub/EventHub.js';

export class AboutPageComponent extends BaseComponent {
    constructor() {
        super();
        this.loadCSS('AboutPageComponent');
        this.hub = EventHub.getInstance();
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

        container.classList.add('about-page-container');

        //main Header
        const header = document.createElement('header');
        const title = document.createElement('h1');
        title.textContent = 'About TrailSafe';
        title.className = 'about-title';
        header.appendChild(title);
        container.appendChild(header);

        //mission Section
        const missionSection = document.createElement('section');
        missionSection.className = 'mission-section';
        
        const missionTitle = document.createElement('h2');
        missionTitle.textContent = 'Our Mission';
        
        const missionText = document.createElement('p');
        missionText.textContent = 'TrailSafe is dedicated to making outdoor adventures safer and more accessible. We provide tools and resources to help hikers plan, track, and safely complete their trail experiences.';
        
        missionSection.appendChild(missionTitle);
        missionSection.appendChild(missionText);
        container.appendChild(missionSection);

        //features Section
        const featuresSection = document.createElement('section');
        featuresSection.className = 'features-section';
        
        const featuresTitle = document.createElement('h2');
        featuresTitle.textContent = 'Key Features';
        
        const featuresGrid = document.createElement('div');
        featuresGrid.className = 'features-grid';

        //create feature cards
        const features = [
            {
                title: 'Trail Logging',
                description: 'Log your hiking routes with map and location information.'
            },
            {
                title: 'SOS Feature',
                description: 'Notify emergency services in the event of emergency'
            },
            {
                title: 'TrailSafe Insights',
                description: 'Get insights based on your previous hikes and trail activity'
            }
        ];

        features.forEach(feature => {
            const featureCard = document.createElement('article');
            featureCard.className = 'feature-card';
            
            const featureTitle = document.createElement('h3');
            featureTitle.textContent = feature.title;
            
            const featureDesc = document.createElement('p');
            featureDesc.textContent = feature.description;
            
            featureCard.appendChild(featureTitle);
            featureCard.appendChild(featureDesc);
            featuresGrid.appendChild(featureCard);
        });

        featuresSection.appendChild(featuresTitle);
        featuresSection.appendChild(featuresGrid);
        container.appendChild(featuresSection);

        // Contact Section
        const contactSection = document.createElement('section');
        contactSection.className = 'contact-section';
        
        const contactTitle = document.createElement('h2');
        contactTitle.textContent = 'Contact Us';
        
        const contactInfo = document.createElement('p');
        contactInfo.textContent = 'Have questions or suggestions? Reach out to us at support@trailsafe.com';
        
        contactSection.appendChild(contactTitle);
        contactSection.appendChild(contactInfo);
        container.appendChild(contactSection);
    }
}
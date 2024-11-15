import { BaseComponent } from '../BaseComponent/BaseComponent.js';
import { Events } from '../../eventhub/Events.js';
import { EventHub } from '../../eventhub/EventHub.js';
import { TrailLogService } from '../../services/TrailLogService.js';

export class InsightsComponent extends BaseComponent{
    constructor() {
        super();
        this.loadCSS('InsightsComponent');
        this.hub = EventHub.getInstance();
        this.trailService = new TrailLogService();
        this.trails = [];

        //subscribe to new trail events 
        this.hub.subscribe(Events.NewTrail, (trail) => {
            this.trails.push(trail);
            this.updateInsights();
        });

        

}
        render(){
            //update view
            let container = document.getElementById('mainPageContainer');
            if (!container) {
                container = document.createElement('div');
                container.id = 'mainPageContainer';
                document.body.appendChild(container);
            } else {
                container.innerHTML = '';
            }
            container.classList.add('insights-container');

            const header = document.createElement('header');
            const title = document.createElement('h1');
            title.textContent = 'Trail Insights';
            title.className = 'insights-title';
            header.appendChild(title);
            container.appendChild(header);


            //create container for various insights
            const statsSection = document.createElement('section');
            statsSection.className = 'stats-section';

            this.totalDistanceElement = document.createElement('div');
            this.totalDistanceElement.className = 'total-distance';
            statsSection.appendChild(this.totalDistanceElement);

            this.trailCountElement = document.createElement('div');
            this.trailCountElement.className = 'trail-count';
            statsSection.appendChild(this.trailCountElement);
            
            //add to container 
            container.appendChild(statsSection);

            this.loadTrailData();
        }

        async loadTrailData(){
            try {
                const trails = await this.trailService.loadTrailsFromDB();
                this.trails = trails;
                this.updateInsights();
            }
            catch(error){
                console.error("Error loading trails from DB",error);
            }

        }

        updateInsights(){
            //update insights based on info 
            const totalDistance = this.trails.reduce((sum,trail)=>sum+trail.distance,0)
            this.totalDistanceElement.textContent = `Total Mileage Hiked: ${totalDistance.toFixed(1)} miles`;

            this.trailCountElement.textContent = `Number of Trails Completed: ${this.trails.length}`;
        }
}

//Test Data 
const testTrails = [
    {
        trailName: "Mount Monadnock",
        distance: 4.2
    },
    {
        trailName: "Purgatory Chasm",
        distance: 2.7
    },
    {
        trailName: "Mount Wachusett",
        distance: 3.3
    },
    {
        trailName: "Middlesex Fells Loop",
        distance: 6.5
    },
    {
        trailName: "Blue Hills Skyline Trail",
        distance: 8.8
    }
];

// Get service and add trails
const trailService = new TrailLogService();
testTrails.forEach(trail => trailService.storeTrail(trail));
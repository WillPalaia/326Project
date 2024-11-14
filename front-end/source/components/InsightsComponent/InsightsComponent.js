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
            //create container for various insights
            const container = document.createElement('div');
            container.className = 'insights-container';

            this.totalDistanceElem = document.createElement('div');
            this.totalDistanceElement.className = 'total-distance';

            this.trailCountElement = document.createElement('div');
            this.trailCountElement.className = 'trail-count';
            
            //add to container 
            container.appendChild(this.totalDistanceElement);
            container.appendChild(this.trailCountElement);

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
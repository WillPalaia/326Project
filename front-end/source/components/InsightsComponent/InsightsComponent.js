import { BaseComponent } from '../BaseComponent/BaseComponent.js';
import { Events } from '../../eventhub/Events.js';
import { EventHub } from '../../eventhub/EventHub.js';
import { TrailLogService } from '../services/TrailLogService.js';

export class InsightsComponent extends BaseComponent{
    constructor() {
        super();
        this.loadCSS('InsightsComponent');
        this.hub = EventHub.getInstance();
        this.trails = [];

        //subscribe to new trail events 
        this.hub.subscribe(Events.NewTrail, (trail) => {
            this.trails.push(trail);
            this.updateInsights();
        });

        

}
        render(){
            const container = document.createElement('div');
            container.className = 'insights-container';

            this.totalDistanceElem = document.createElement('div');
            this.totalDistanceElement.className = 'total-distance';

        }

        async loadTrailData(){

        }

        updateInsights(){

        }
}
import { BaseComponent } from '../BaseComponent/BaseComponent.js';
import { Events } from '../../eventhub/Events.js';
import { EventHub } from '../../eventhub/EventHub.js';

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
}
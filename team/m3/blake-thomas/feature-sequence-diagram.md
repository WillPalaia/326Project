## Feature: TrailSafe Insights

This feature retrieves trail data on the hikers previous saved trails using indexedDB. It uses this data 
to create a visualization dashboard that shows insights to the hiker. Relevant fields show insights such as
"total mileage hiked" and "trails completed. 

```mermaid
sequenceDiagram
    participant User
    participant InsightsComponent
    participant EventHub
    participant TrailLogService
    participant IndexedDB
    
    User->>InsightsComponent: Views Insights Page
    InsightsComponent->>TrailLogService: Creates new instance
    TrailLogService->>IndexedDB: initDB()
    IndexedDB-->>TrailLogService: DB Ready
    TrailLogService->>EventHub: Publish(StoreTrailSuccess)
    EventHub->>TrailLogService: loadTrailData()
    TrailLogService->>IndexedDB: loadTrailsFromDB()
    IndexedDB-->>TrailLogService: Return Trails
    TrailLogService->>EventHub: Publish(NewTrail)
    EventHub->>InsightsComponent: Notify of new trails
    InsightsComponent->>InsightsComponent: updateInsights()
    InsightsComponent->>User: Display total distance and trail count
```

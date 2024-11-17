## Feature: Add New Trails Page

The Add New Trails feature allows users to add and save details about their favorite trails. Users can input the trail name, start and end locations, upload an image, and calculate the distance between locations. All data is validated before being saved, ensuring accurate and organized trail information.

# Sequence Diagram
```mermaid
sequenceDiagram
    participant User
    participant AddNewTrailComponent
    participant TrailLogService
    participant EventHub
    participant MainPageComponent

    User->>AddNewTrailComponent: Open Add Trail Page
    AddNewTrailComponent->>User: Render form fields (Trail Name, From, To, etc.)
    
    User->>AddNewTrailComponent: Fill out form and upload image
    AddNewTrailComponent->>AddNewTrailComponent: Preview image on form

    User->>AddNewTrailComponent: Click "Calculate Distance"
    AddNewTrailComponent->>AddNewTrailComponent: Validate From and To fields
    AddNewTrailComponent->>AddNewTrailComponent: Calculate distance (mocked as 10km)
    AddNewTrailComponent->>User: Display calculated distance

    User->>AddNewTrailComponent: Click "Add Trail"
    AddNewTrailComponent->>AddNewTrailComponent: Validate all fields
    AddNewTrailComponent->>TrailLogService: Save trail data (Trail Name, Distance, etc.)
    TrailLogService-->>AddNewTrailComponent: Return success confirmation

    AddNewTrailComponent->>EventHub: Publish "StoreTrail" event with trail data
    EventHub-->>Listeners: Notify other components of new trail

    AddNewTrailComponent->>User: Show success message
    AddNewTrailComponent->>AddNewTrailComponent: Clear form fields

    User->>AddNewTrailComponent: Click "Back to Main Page"
    AddNewTrailComponent->>MainPageComponent: Render Main Page
```

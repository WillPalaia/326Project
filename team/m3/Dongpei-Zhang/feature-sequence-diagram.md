## Feature: Gear Recommendation

This feature grabs from weather currently a fake api (will implement with real one in milestone 4) 
with a given location that is provided and displays it on the screen. This feature also takes the average of the
low and high temperatures and recommends gear that the user should bring.

# Sequence Diagram
```mermaid
sequenceDiagram
    participant User as User
    participant Component as GearRecComponent
    participant EventHub as EventHub
    participant API as Weather API

    User->>Component: Open page
    Component->>Component: Load CSS and initialize EventHub
    Component->>Component: Create and render elements (title, input, button)
    User->>Component: Enter location and click 'Search'
    Component->>API: Fetch weather data
    API->>Component: Return weather data
    Component->>Component: Process and display forecast
    Component->>User: Display forecast and gear recommendation
    User->>Component: Enter new location and click 'Search'
    Component->>API: Fetch new weather data
    API->>Component: Return new weather data
    Component->>Component: Update and display new forecast and gear recommendation
```

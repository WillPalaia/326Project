## Feature: Gear Recommendation

This feature grabs from weather currently a fake api (will implement with real one in milestone 4) 
with a given location that is provided and displays it on the screen. This feature also takes the average of the
low and high temperatures and recommends gear that the user should bring.

# Sequence Diagram
```mermaid
sequenceDiagram
    participant A as User
    participant B as GearRecComponent
    participant C as API
    participant D as DOM

    A->>B: Load Page
    B->>D: Check/Create #mainPageContainer
    B->>D: Add GearRecTitle to #mainPageContainer
    B->>C: Fetch Weather Data
    C-->>B: Return Weather Data (JSON)
    B->>D: Create forecastContainer and append to #mainPageContainer
    B->>D: Display Location
    loop For each day in forecast
        B->>B: Calculate avgTemp
        B->>B: Generate Gear Recommendation
        B->>D: Create forecast-day element
        B->>D: Append forecast-day to forecastContainer
    end
    C-->>B: Return Error 
    B->>D: Display Error Message
```
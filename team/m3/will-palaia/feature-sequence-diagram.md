# Feature: Dark Mode Toggle

## Feature Description
The dark mode toggle allows users to personalize their TrailSafe profile, by choosing if they want their webpage to be in "dark mode" or not. While in dark mode, every component of our site has their colors swapped, making the app more visually appealing to those who enjoy the contrast of dark mode.

1. The user clicks the sidebar toggle button.
2. DarkModeToggleComponent checks if the dark-mode class is present on the DocumentBody.
3. If dark mode is toggled on, DarkModeToggleComponent publishes a "DarkModeToggled" event via EventHub with the state checked, and color is updated to white.
4. If dark mode is turned off, DarkModeToggleComponent publishes a "DarkModeToggled" event via EventHub with the state unchecked, and color is updated to black.
5. DarkModeToggleComponent applies the appropriate styles based on the toggled state.

## Sequence Diagram
```mermaid
sequenceDiagram
    participant User
    participant DarkModeToggleComponent
    participant EventHub
    participant DocumentBody

    User->>DarkModeToggleComponent: Click toggle button
    DarkModeToggleComponent->>DocumentBody: Check if 'dark-mode' class is present
    alt Dark mode is on
        DocumentBody->>DarkModeToggleComponent: Add 'dark-mode' class
        DarkModeToggleComponent->>EventHub: Publish "DarkModeToggled" event with state 'checked'
        DarkModeToggleComponent->>DarkModeToggleComponent: Update label color to white
    else Dark mode is off
        DocumentBody->>DarkModeToggleComponent: Remove 'dark-mode' class
        DarkModeToggleComponent->>EventHub: Publish "DarkModeToggled" event with state 'unchecked'
        DarkModeToggleComponent->>DarkModeToggleComponent: Update label color to black
    end
    DarkModeToggleComponent->>DocumentBody: Apply changes (styles)

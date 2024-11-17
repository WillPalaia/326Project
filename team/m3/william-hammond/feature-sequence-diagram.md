# Feature: Dynamic Sidebar

## Feature Description
The dynamic sidebar enables the user to navigate between different pages. Users can open and close the sidebar by clicking the toggle button, and select a page by clicking on one of the page buttons. The flow of events goes like this:
1. The user clicks the sidebar toggle button, and the sidebar toggles its visibility.
2. The user selects a page by clicking one of the page buttons.
3. The sidebar publishes an event to the `EventHub` with the name of the page.
4. The `AppControllerComponent` listens for the event, determines the page, and updates the view.
5. The sidebar closes after a navigation button is clicked.

## Sequence Diagram
```mermaid
sequenceDiagram
    autonumber
    User->>DynamicSidebarComponent: Click toggle button
    DynamicSidebarComponent->>DynamicSidebarComponent: Toggle sidebar visibility
    User->>DynamicSidebarComponent: Click navigation button (e.g., "Profile")
    DynamicSidebarComponent->>EventHub: Publish "NavigateToPage" event with page name
    EventHub-->>AppControllerComponent: Event received
    AppControllerComponent->>AppControllerComponent: Identify the page
    AppControllerComponent->>AppControllerComponent: Render "Profile" page
    DynamicSidebarComponent->>DynamicSidebarComponent: Close sidebar
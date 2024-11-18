## Feature: Current Trip Information

Acknowledge user about the remaining time they aim to reach the destination. Users can edit the remaining time, edit the contact list and press "HELP" button to immediately email emergency contact.

```mermaid
sequenceDiagram
    participant User
    participant currentTripComponent
    participant emergencyContactInputComponent
    participant CountdownService
    participant EmailService

    User->>currentTripComponent: Press "Contact Edit"
    currentTripComponent->>emergencyContactInputComponent: Redirect to Emergency Contact Input

    User->>currentTripComponent: Press "Countdown Edit"
    currentTripComponent->>CountdownService: Update Countdown

    User->>currentTripComponent: Press "Help"
    currentTripComponent->>EmailService: Send Help Email to Contacts
```

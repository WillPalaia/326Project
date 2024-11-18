## Feature: Add Emergency Contact

This feature takes in a user's emergency contact information through three prompts on the webpage 

Note: 
decision node = {}

```mermaid
graph TD
    subgraph EmergencyContactsInputComponent
        A[User Inputs Contact Data]
        B{Validate Input}
        B -- Yes --> C[Create contactData Object]
        B -- No --> J[Show Validation Error]
        C --> D[Publish 'EmergencyContact:new' Event]
    end

    subgraph EmergencyContactsService
        D --> E[Listen for 'EmergencyContact:new']
        E --> F[StoreContact Adds ContactData to IndexedDB]
        F --> K[Handle Storage Errors if Any]
    end

    subgraph EmergencyContactsListComponent
        D --> G[Listen for 'EmergencyContact:new']
        G --> H[Push ContactData into #contacts]
        H --> I[Render Updated Contacts List on UI]
    end
'''

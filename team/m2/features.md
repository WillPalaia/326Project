# Application Features

## Google Maps Integration
This feature utilizes the Google Maps API to source and display hiking trails. Users can search or select a trail from a map interface to begin their journey. This integration provides a user-friendly way for hikers to discover and plan their routes, ensuring they have accurate and up-to-date trail information before setting out on their adventure. In addition, the API also provides the closet shelters in case of any emergency (e.g landslide, flood, etc.)
**Assigned to**: 

## Cellular Coverage Data
This feature integrates an API that provides cellular network coverage and signal strength data for specific locations. It displays this data along the selected trail, showing where users will have cellular signal and where they may lose coverage. The feature also calculates and displays the percentage of the trail with cellular coverage and identifies the longest continuous section without coverage. This information is crucial for hikers to plan their communication strategy and safety measures.
**Assigned to**: 

## SOS Feature
The SOS feature allows hikers to submit a trail itinerary and timeline for their trip, along with an emergency contact. There are 3 parts of this feature:
- There is a dedicated SOS button, so that when the user presses it, it'll immediately call emergency contact and find the nearest shelter.
- There is also a speedtracker using Google Maps, whenever the user moves faster than some threshold (which is a sign of emergency from which the user has to run away), make a beeping sound, if after some time, the user doesn't turn it off, call emergency contact.
- If the hiker does not arrive back within their intended trip window, the contact mechanism will be similar to the 2nd part. There will also be a way for the user to extend stay period.

**Assigned to**: 

## Gear Recommendation
This feature uses a weather API based on location data to recommend a packing list of gear. For example, if the forecast predicts snow and cold weather, it provides the hiker with a cold weather packing list fit for those conditions. This helps ensure that hikers are properly equipped for the conditions they'll encounter, enhancing both comfort and safety.
**Assigned to**: 

## Wildlife Safety
The wildlife safety feature uses location data to pull from wildlife APIs in the area and inform the user of potentially dangerous wildlife they might encounter. It provides tips on how to stay safe around these animals. For example, if bears are present in the area, it recommends storing food away from the campsite and carrying bear spray. This information helps hikers prepare for and safely navigate potential wildlife encounters.
**Assigned to**: 

## Social Features
This feature allows users to connect with other hikers by sending friend requests, reviewing and logging trails. Users can also post about trail-specific hazards or features they encountered, such as water sources and campsites. This community-driven aspect of the app enhances the hiking experience by allowing users to share valuable, up-to-date information about trail conditions and points of interest.
**Assigned to**: 

## Multi-Device Access
The multi-device access feature ensures that the application is accessible on both desktop and mobile devices. This allows users to access trail information, submit trip plans, and utilize all other features of the app whether they're planning at home or already on the trail. The flexibility of multi-device access enhances the app's usability and ensures hikers can stay informed and safe throughout their journey.
**Assigned to**:

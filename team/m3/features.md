# Application Features

## Feature: TrailSafe Insights

This feature retrieves trail data on the hikers previous saved trails using indexedDB. It uses this data 
to create a visualization dashboard that shows insights to the hiker. This is used to give the hiker data on such as 
total mileage hiked, longest hike, and total hikes. This feature is fully integrated with the TrailLogService
to utilize indexDB for persistence. 
**Point Value**: 4 
**Completed By**: Blake Thomas

## Feature: TrailLogService

This feature uses IndexedDB to create a service to log trail data to preserve hiker history. It includes methods
to load, save, delete, and add, data on trails that the user has added, in a way that is aligned with 
the asynchronous examples given in class. It will be integrated into the Insights component and add trail component. 
**Point Value**: 5 
**Completed By**: Blake Thomas

## Feature: About Page 

An about page that provides information on the application and its core features. It will be integrated into 
the home page and bring the user into a separate page when clicked. It can include data on user amounts, 
location, and demographic. 
**Point Value**: 2 
**Completed By**: Blake Thomas

## Home Page
This is a page that contains all the buttons for our application.
**Point Value**: 1
**Completed By**: Will H and Will P 

## Google Maps Integration
This feature utilizes the Google Maps API to source and display hiking trails. Users can search or select a trail 
from a map interface to begin their journey. This integration provides a user-friendly way for hikers to discover and
 plan their routes, ensuring they have accurate and up-to-date trail information before setting out on their adventure. 
 In addition, the API also provides the closet shelters in case of any emergency (e.g landslide, flood, etc.)
**Point Value**: 3
**Completed By**: Will P

## SOS Feature
The SOS feature allows hikers to submit a trail itinerary and timeline for their trip, along with an emergency contact. There are 3 parts 
of this feature: There is a dedicated SOS button, so that when the user presses it, it'll immediately call emergency contact and find the nearest shelter.
There is also a speed tracker using Google Maps, whenever the user moves faster than some threshold (which is a sign of emergency from 
which the user has to run away), make a beeping sound, if after some time, the user doesn't turn it off, call emergency contact.
If the hiker does not arrive back within their intended trip window, the contact mechanism will be similar to the 2nd part. 
There will also be a way for the user to extend stay period.
**Point Value**: 
**Completed By**: Ben and Tri

## Add Start New Trail
The Add New Trails feature allows users to create and save detailed trail information for their backpacking adventures. This includes specifying the trail name, start and end locations, and uploading a relevant image for the trail. It also calculates the distance between locations (currently using a mocked value) and ensures all data is validated before being saved. This feature integrates seamlessly with the application's trail management system to store and display user-added trails.
**Point Value**: 3
**Completed By**: Nhan Daon

## Gear Recommendation
This feature uses a weather API based on location data to recommend a packing list of gear. For example, 
if the forecast predicts snow and cold weather, it provides the hiker with a cold weather packing list fit 
for those conditions. This helps ensure that hikers are properly equipped for the conditions they'll encounter, 
enhancing both comfort and safety.
**Point Value**: 3
**Completed By**: Dongpei Zhang

## Social Features
This feature allows users to connect with other hikers by sending friend requests, reviewing and logging trails. 
Users can also post about trail-specific hazards or features they encountered, such as water sources and campsites. 
This community-driven aspect of the app enhances the hiking experience by allowing users to share valuable, up-to-date 
information about trail conditions and points of interest.
**Point Value**: 3
**Completed By**: Will Hammond











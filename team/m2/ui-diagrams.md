# UI Diagrams

## Main Dashboard Screen

The **Main Dashboard** is the first screen users see after logging into the TrailSafe web application. Before starting a trail, it is a central hub for all the essential information hikers need. The dashboard provides quick access to trail details, weather conditions, friends, and safety features, ensuring that users have everything they need at a glance. The layout is designed to be straightforward and intuitive, allowing users to easily navigate through various features, such as adding new trails, checking weather updates, and tracking their hiking progress.

![Front Page](https://github.com/WillPalaia/326Project/blob/main/team/UI%20diagram/Front%20page.png?raw=true)

Key Elements:

1. **Add New Trails**: A button at the top of the dashboard that lets users add new trails by entering details such as the name, time, and distance.
2. **Begin Trail**: A prominent button that starts the tracking of an existing trail. Once clicked, the user is taken to the trail details page, where they can see current weather and prepare for the hike.
3. **Friends List**: This section displays the user’s friends with options to send messages, check statuses, and invite friends to join a hike.
4. **Trails List**: Provides a list of available trails, displaying key information such as trail location, weather, distance, and the user’s progress. This allows hikers to quickly select a trail and decide which one suits their needs for the day.

**Use Case**:

A hiker logs into TrailSafe to prepare for a hike the next day. From the Main Dashboard, they can check their saved trails, look at the weather forecast, and decide which trail to take. They see that one of their friends is available and send them a message inviting them to the hike. They review the trail list to compare the distances and select a trail that fits within their time frame for the day. If they plan a new trail, they can click "Add New Trails" and input the necessary details. The dashboard allows them to manage all aspects of their hike in one place efficiently.

## Begin Trail Screen

The **Begin Trail Screen** is the core feature of TrailSafe that allows users to start tracking their hike officially. This screen provides all necessary information before heading out on a trail, ensuring that hikers are well-prepared and safe. The interface presents important data such as the current weather, start time, trail name, useful message and items that should be packed. The inclusion of a checklist for hiking essentials ensures that users don’t forget important gear. Before beginning the hike, users are also prompted to confirm their emergency contact information, adding an extra layer of safety.

![Begin Trail](https://github.com/WillPalaia/326Project/blob/main/team/UI%20diagram/Function%202.png?raw=true)

Key Elements:

1. **Trail Name**: This dropdown menu allows users to select the trail they wish to hike. It could be a pre-existing trail or one they have added themselves.
2. **Current Time**: The current time is automatically displayed, allowing users to track the start time of their hike. They can adjust this if needed.
3. **Current Weather**: Displays the real-time weather for the selected trail location. This helps the hiker determine if it's safe or advisable to proceed.
4. **Items Checklist**: A list of essential items (e.g., water, first aid kit, GPS device) is provided to remind users what they need to bring. The user can check these off as they pack.
5. **Message**: A list of safety recommendations before starting the journey is provided to ensure users are fully prepared.
6. **Emergency Contact**: Before starting, the user is asked to confirm or update their emergency contact information, ensuring someone is notified if they do not return as planned.

**Use Case**:

A hiker is ready to start their planned trail for the day. From the Begin Trail Screen, they select the trail from the dropdown and review the weather forecast to ensure it’s safe to proceed. They go through the checklist to confirm they have packed all necessary items, such as water and a first aid kit. Finally, they verify their emergency contact information to ensure someone will be alerted if they don’t return by the estimated time. After confirming everything, they click “Start” to track their hike and enjoy a safe, well-prepared trail experience.

## Add New Trails Screen

The **Add New Trails Screen** allows hikers to input a new trail they plan to hike. This feature allows users to customize their hiking experience by adding new routes, whether a popular trail they’ve recently discovered or a personal route. The screen is designed to simplify the process, with input fields for the trail name, start and end times, total distance, and weather information. It also allows the user to set key points such as the starting location and destination, helping them plan their hike in detail before heading out.

![Begin Trail](https://github.com/WillPalaia/326Project/blob/main/team/UI%20diagram/Function%201.png?raw=true)

Key Elements:

1. **Trail Name**: Users enter a custom name for the new trail they plan to hike.
2. **Trail Time**: Users select the start and end times of the hike. This helps with planning and ensures they know the total time needed.
3. **Weather on Selected Day**: Displays the weather forecast for the day the trail is planned, helping hikers prepare for potential weather changes.
4. **Total Distance**: The app calculates and displays the total distance between the start and destination points of the trail. This ensures hikers have an idea of how much time they’ll need to complete the hike.

**Use Case**:

A hiker is planning a new trail for the weekend and wants to save the details in TrailSafe for reference. They go to the Add New Trails Screen and enter the trail name, select the start time, and input the estimated end time. They also check the weather forecast for that day to determine what gear they might need. After entering the starting point and destination, the app calculates the total distance, helping the hiker estimate how long the trail will take. Once all the details are entered, they save the new trail and will use it to guide their hike when the weekend arrives.


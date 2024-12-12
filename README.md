# TrailSafe

TrailSafe is your ultimate hiking companion, designed to ensure your safety while exploring trails. With features like trail information, weather updates, gear recommendations, and an SOS emergency timer, TrailSafe helps you hike smarter and safer.

## Features

1. **Trail Search**: Search for trails and get detailed information about your selected trail.
2. **Weather and Gear Recommendations**: View the weather for your chosen trail and receive tailored gear recommendations for that location.
3. **SOS Timer and Emergency Contact**:
- Set an SOS timer for your hike.
- If the timer reaches zero before you finish the trail, your emergency contact will be notified via email.

## Prerequisites

Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (latest stable version recommended)
- [Git](https://git-scm.com/)

## Installation

Follow these steps to set up and run TrailSafe on your local machine:

1. Clone the GitHub repository:

```bash
git clone https://github.com/WillPalaia/TrailSafe.git
```

2. Navigate into the project directory:

```bash
cd trailSafe
```

3. Install dependencies:

```bash
npm install
```

4. Navigate to the backend folder:

```bash
cd back-end
```

5. Start the backend server:

```bash
npm start
```

## Usage

1. **Search for Trails**:

- Use the app interface to search for your desired trail.
- View trail details and select a trail for your hike.

2. **Get Weather and Gear Recommendations**:

- Check the weather conditions for your selected trail.
- Receive customized gear recommendations based on the trail's conditions.

3. **Set Up the SOS Feature**:

- Enter an emergency contact's email address.
- Set a timer for your hike duration.
- If the timer expires and you haven't finished the trail, your contact will be alerted.

## License

TrailSafe is open-source software licensed under the [MIT License](LICENSE).

Happy Hiking with TrailSafe!

NOTE: If you git clone this repo, it may not have the API key for Google Places API in the .env file. If the "Add New Trail" button is acting different from what is shown in the demo video, email wpalaia@umass.edu.

(There is a chance it may not work because there is no .env file with the Client ID/Secret. I am not sure how to include it without leaking my data. If there is a way to use another client ID/Secret, please add them into a .env and add that .env into the backend folder)

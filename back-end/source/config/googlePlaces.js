// Import required dependencies
import { Client } from "@googlemaps/google-maps-services-js";
import dotenv from 'dotenv';

dotenv.config();

// create configuration object
const config = {
   //sets up TrailSafe specific API settings
   apiKey: process.env.GOOGLE_PLACES_API_KEY,
   
   // place type filters for hiking trails and parks
   placeTypes: ['park', 'natural_feature', 'point_of_interest'],
   
   //request parameters: 
   defaultParams: {
       language: 'en',
       fields: [
           'name',
           'rating',
           'formatted_address',
           'photos',
           'reviews',
           'types',
           'opening_hours'
       ]
   }
};

// Initialize Google Places client: allows you to communicate with google's apis 
const client = new Client({
    config: {
        apiKey: config.apiKey,
        timeout: 5000, // request timeout in ms
        //possibly include "retryOption:"
    }
});

// export configuration and client
export {
   config,
   client
};
import { config, client } from "../config/googlePlaces.js";

class PlaceController {

    // search for places by general name (white mount, etc)
    async searchPlaces(req, res) {
        try {
            // get search query from request - points to placeRoute.js
            const { query } = req.query;

            if (!query) {
                return res.status(400).json({ 
                    error: "search query is empty" 
                });
            }

            // make request to google places api
            const response = await client.textSearch({
                params: {
                    query: query,
                    type: config.placeTypes.join('|'),
                    language: config.defaultParams.language,
                    key: config.apiKey
                }
            });

            // Send back the search results
            if (response.data.results.length === 0) {
                return res.json([]);
            }

            // Get the first result
            const place = response.data.results[0];
            const placeId = place.place_id;

            // Get place details to retrieve reviews
            const detailsResponse = await client.placeDetails({
                params: {
                    place_id: placeId,
                    key: config.apiKey,
                    fields: ['name', 'rating', 'reviews']
                }
            });

            const details = detailsResponse.data.result;

            // Extract necessary information
            const placeData = {
                name: details.name || 'Unnamed Trail',
                rating: details.rating || 'N/A',
                topReview: details.reviews && details.reviews.length > 0
                    ? details.reviews[0].text
                    : ''
            };

            res.json([placeData]);

        } catch (error) {
            console.error('error searching places:', error);
            res.status(500).json({ 
                error: "failed to find places" 
            });
        }
    }
}

export default new PlaceController();
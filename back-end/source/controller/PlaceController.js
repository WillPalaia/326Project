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
                    type: config.placeTypes,
                    language: config.defaultParams.language,
                    key: config.apiKey
                }
            });

            // Send back the search results
            res.json(response.data.results);

        } catch (error) {
            console.error('error searching places:', error);
            res.status(500).json({ 
                error: "failed to find places" 
            });
        }
    }
}

export default new PlaceController();
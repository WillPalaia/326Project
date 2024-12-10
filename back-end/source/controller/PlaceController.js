import { config, client } from "../config/googlePlaces.js";
import Trail from '../model/TrailModel.js';

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

            const place = response.data.results[0];
            const placeId = place.place_id;

            // Get place details to retrieve reviews
            const detailsResponse = await client.placeDetails({
                params: {
                    place_id: placeId,
                    key: config.apiKey,
                    fields: [
                        'name',
                        'rating',
                        'reviews',
                        'editorial_summary',
                        'website',
                        'formatted_address'
                      ],
                }
            });
            const details = detailsResponse.data.result;
            // Fields for the main trail being added
            const trailInfo = {
                name: details.name || 'Unnamed Trail',
                rating: details.rating || 'N/A',
                topReview: details.reviews?.[0]?.text || 'No reviews available',
                editorial_summary: details.editorial_summary?.overview || 'N/A',
                formatted_address: details.formatted_address || 'N/A',
                website: details.website || 'No website available',
              };
        
            // Fields to be stored in the database
            const placeData = {
            name: trailInfo.name,
            rating: details.rating || 0,
            website: details.website || '',
            };
            await Trail.create(placeData);
            res.json([trailInfo]);
            
        } catch (error) {
            console.error('error searching places:', error);
            res.status(500).json({ 
                error: "failed to find places" 
            });
        }
    }
    async getAllTrails(req, res) {
        try {
          const trails = await Trail.findAll({
            attributes: ['trailId', 'name', 'rating', 'website'],
            order: [['rating', 'DESC']],
          });
          res.json(trails);
        } catch (error) {
          console.error('Error fetching trails:', error.message);
          res.status(500).json({ error: 'Internal server error' });
        }
      }
    
    async deleteTrail(req, res) {
    const trailId = req.params.id;
    try {
        const result = await Trail.destroy({ where: { trailId } });
        if (result === 1) {
        res.status(200).json({ message: 'Trail deleted successfully.' });
        } else {
        res.status(404).json({ error: 'Trail not found.' });
        }
    } catch (error) {
        console.error('Error deleting trail:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
    }
}

export default new PlaceController();
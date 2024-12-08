import express from "express";
import PlaceController from "../controller/PlaceController.js";


// Create router instance
const router = express.Router();

router.get('/places/search', async (req, res) => { //figure out what goes in //places/search
    await PlaceController.searchPlaces(req, res);
});

export default router;
import express from "express";
import PlaceController from "../controller/PlaceController.js";


// Create router instance
const router = express.Router();

router.get('/places/search', PlaceController.searchPlaces);

router.get('/trails', PlaceController.getAllTrails);
router.delete('/trails/:id', PlaceController.deleteTrail);

export default router;
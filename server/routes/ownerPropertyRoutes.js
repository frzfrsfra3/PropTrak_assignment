import express from "express";
const router = express.Router();
import {
  postRealEstate,
  getActiveRealEstates,
  getSingleProperty,
  updatePropertyDetails,
  deleteProperty,
  toggleArchiveProperty,
  getArchivedRealEstates
} from "../controllers/ownerPropertyController.js";
import upload from "../middleware/multerImageMiddleware.js";

/**
 * @description Post real estate
 * @route POST /api/owner/real-estate
 */
router.post(
  "/",
  upload.array("realEstateImages", 10),
  postRealEstate
);

/**
 * @description Get Owner's personal real estates
 * @route GET /api/owner/real-estate
 */
router.get("/", getActiveRealEstates);

router.get("/archived", getArchivedRealEstates);

/**
 * @description Get single property
 * @route GET /api/owner/real-estate/:slug
 */
router.get("/:slug", getSingleProperty);

/**
 * @description Archive or Unarchive Property
 * @route PATCH /api/owner/real-estate/archive/:slug
 */
 router.patch("/archive/:slug", toggleArchiveProperty);

/**
 * @description Update Property Details
 * @route PATCH /api/owner/real-estate/update/:slug
 */
router.patch("/update/:slug", updatePropertyDetails);

/**
 * @description Delete Property
 * @route DELETE /api/owner/real-estate/delete/:slug
 */
router.delete("/delete/:slug", deleteProperty);

export default router;

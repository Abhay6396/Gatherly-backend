import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { checkRole } from "../middleware/checkRole.js";
import {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  getMyEvents,
  toggleLike,
  incrementView,
  getEnrolledUsersForEvent
} from "../controllers/eventController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post(
  "/create",
  authMiddleware,
  checkRole(["organizer", "admin"]),
  upload.single("image"),
  createEvent
);
router.get("/", getAllEvents);
router.get("/my-events", authMiddleware, checkRole(["organizer"]), getMyEvents);
router.get("/:id", getEventById);
router.put(
  "/:id",
  authMiddleware,
  checkRole(["organizer", "admin"]),
  updateEvent
);
router.delete(
  "/:id",
  authMiddleware,
  checkRole(["organizer", "admin"]),
  deleteEvent
);
// routes/eventRoutes.js
router.put("/:eventId/view", authMiddleware, incrementView); // Increment view count
router.put("/:eventId/like", authMiddleware, toggleLike); // Increment like count
router.get(
  "/:eventId/enrolled-users",
  authMiddleware,
  checkRole(["organizer"]),
  getEnrolledUsersForEvent
);

export default router;

import { Router } from "express";
import { createRsvp, listGuests } from "../controllers/guestController.js";

const router = Router();

router.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

router.post("/rsvp", createRsvp);
router.get("/guests", listGuests);

export default router;

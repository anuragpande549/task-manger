import { Router } from "express";
import {
  createLead,
  getLeads,
  getLeadById,
  updateLead,
  deleteLead,
} from "../controllers/lead.controller";
import { verifyAdmin } from "../middlewares/auth.middleware";

const router = Router();

router.post("/", verifyAdmin, createLead);
router.get("/", verifyAdmin, getLeads);
router.get("/:id", verifyAdmin, getLeadById);
router.put("/:id", verifyAdmin, updateLead);
router.delete("/:id", verifyAdmin, deleteLead);

export default router;

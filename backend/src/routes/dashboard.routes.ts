import { Router } from "express";
import {
  getDashboardStats,
  leadsByStatus,
  leadsPerEmployee,
} from "../controllers/dashboard.controller";
import { verifyAdmin } from "../middlewares/auth.middleware";

const router = Router();

router.get("/stats", verifyAdmin, getDashboardStats);
router.get("/leads-by-status", verifyAdmin, leadsByStatus);
router.get("/leads-per-employee", verifyAdmin, leadsPerEmployee);

export default router;

import { Router } from "express";
import {
  createEmployee,
  getEmployees,
  getEmployeeById,

  updateEmployee,
  deleteEmployee,
} from "../controllers/employee.controller";

import { verifyAdmin } from "../middlewares/auth.middleware";

const router = Router();
//create employee
router.post("/", verifyAdmin, createEmployee);

//admin route
router.get("/", verifyAdmin, getEmployees);

router.get("/:id", verifyAdmin, getEmployeeById);

router.put("/:id", verifyAdmin, updateEmployee);
router.delete("/:id", verifyAdmin, deleteEmployee);

export default router;

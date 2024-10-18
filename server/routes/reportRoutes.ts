import express from "express";
import {
  createReport,
  deleteReportFromDatabase,
  deleteReport,
  getReportById,
  getReports,
  updateReport,
} from "../controllers/reportController";
import { isAuthenticated } from "../middlewares/isAuthenticated";

const router = express.Router();

router.post("/create", isAuthenticated, createReport);

router.get("/my-reports", isAuthenticated, getReports);

router.get("/:id", isAuthenticated, getReportById);

router.put("/:id", isAuthenticated, updateReport);

// Delete
router.put("/delete/:id", isAuthenticated, deleteReport);

// Perma Delete
router.delete("/:id", isAuthenticated, deleteReportFromDatabase);

export default router;

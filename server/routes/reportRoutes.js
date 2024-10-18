"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const reportController_1 = require("../controllers/reportController");
const isAuthenticated_1 = require("../middlewares/isAuthenticated");
const router = express_1.default.Router();
router.post("/create", isAuthenticated_1.isAuthenticated, reportController_1.createReport);
router.get("/my-reports", isAuthenticated_1.isAuthenticated, reportController_1.getReports);
router.get("/:id", isAuthenticated_1.isAuthenticated, reportController_1.getReportById);
router.put("/:id", isAuthenticated_1.isAuthenticated, reportController_1.updateReport);
// Delete
router.put("/delete/:id", isAuthenticated_1.isAuthenticated, reportController_1.deleteReport);
// Perma Delete
router.delete("/:id", isAuthenticated_1.isAuthenticated, reportController_1.deleteReportFromDatabase);
exports.default = router;

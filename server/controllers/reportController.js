"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReportFromDatabase = exports.deleteReport = exports.updateReport = exports.getReports = exports.getReportById = exports.createReport = void 0;
const Report_1 = __importDefault(require("../models/Report"));
const generateUniqueId_1 = require("../utils/generateUniqueId");
// CREATE NEW REPORT
const createReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { patientFirstName, patientLastName, patientTcNo, diagnosisTitle, diagnosisDetails, } = req.body;
        //  7 digits unique file number
        const fileNumber = yield (0, generateUniqueId_1.generateUniqueId)(7);
        const reportDate = new Date();
        const user = req.user;
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const { laborantInfo } = user;
        const newReport = new Report_1.default({
            fileNumber,
            patient: {
                firstName: patientFirstName,
                lastName: patientLastName,
                tcNo: patientTcNo,
            },
            diagnosisTitle,
            diagnosisDetails,
            reportDate,
            laborant: laborantInfo,
            createdBy: user.id,
        });
        yield newReport.save();
        res.status(201).json({
            message: "Rapor başarıyla oluşturuldu.",
            report: newReport,
        });
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Sunucu hatası", error: error.message });
    }
});
exports.createReport = createReport;
// GET REPORT
const getReportById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const report = yield Report_1.default.findById(id);
        if (!report) {
            res.status(404).json({ message: "Rapor Bulunamadı" });
        }
        return res.status(200).json(report);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Sunucu Hatası", error });
    }
});
exports.getReportById = getReportById;
// GET REPORTS
const getReports = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const reports = yield Report_1.default.find({ createdBy: user.id, isAlive: true });
        if (reports.length === 0) {
            return res.status(404).json({ message: "No reports found." });
        }
        return res.status(200).json(reports);
    }
    catch (error) {
        return res.status(500).json({ message: "Server Error" });
    }
});
exports.getReports = getReports;
// UPDATE AN EXISTING REPORT
const updateReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updateData = req.body;
    try {
        const updatedReport = yield Report_1.default.findByIdAndUpdate(id, updateData, {
            new: true,
        });
        if (!exports.updateReport) {
            return res.status(400).json({ message: "Rapor Bulunamadı" });
        }
        return res
            .status(200)
            .json({ message: "Rapor Güncellendi", updatedReport });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Sunucu Hatası" });
    }
});
exports.updateReport = updateReport;
// DELETE A REPORT - CHANGES STATUS "isAlive" to false
const deleteReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const report = yield Report_1.default.findById(id);
        if (!report) {
            return res.status(404).json({ message: "Report not found" });
        }
        const deletedReport = yield Report_1.default.findByIdAndUpdate(id, {
            isAlive: false,
        }, { new: true });
        return res.status(200).json({ message: "Report deleted", deletedReport });
    }
    catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});
exports.deleteReport = deleteReport;
// DELETE A REPORT - PERMANENT -
const deleteReportFromDatabase = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedReport = yield Report_1.default.findByIdAndDelete(id);
        if (!deletedReport) {
            return res.status(400).json({ message: "Rapor Bulunamadı" });
        }
        res.status(200).json({ message: "Rapor Silindi" });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Sunucu Hatası" });
    }
});
exports.deleteReportFromDatabase = deleteReportFromDatabase;

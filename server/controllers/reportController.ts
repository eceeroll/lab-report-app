import { Response, Request } from "express";
import Report from "../models/Report";
import { generateUniqueId } from "../utils/generateUniqueId";

interface User {
  id: string;
  email: string;
  role: string;
  laborantInfo?: { id: String; firstName: String; lastName: String };
}

// CREATE NEW REPORT
export const createReport = async (req: Request, res: Response) => {
  try {
    const {
      patientFirstName,
      patientLastName,
      patientTcNo,
      diagnosisTitle,
      diagnosisDetails,
    } = req.body;

    //  7 digits unique file number
    const fileNumber = await generateUniqueId(7);

    const reportDate = new Date();

    const user = req.user as User | undefined;

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { laborantInfo } = user;

    const newReport = new Report({
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

    await newReport.save();

    res.status(201).json({
      message: "Rapor başarıyla oluşturuldu.",
      report: newReport,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Sunucu hatası", error: (error as Error).message });
  }
};

// GET REPORT
export const getReportById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const report = await Report.findById(id);

    if (!report) {
      res.status(404).json({ message: "Rapor Bulunamadı" });
    }

    return res.status(200).json(report);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Sunucu Hatası", error });
  }
};

// GET REPORTS
export const getReports = async (req: Request, res: Response) => {
  try {
    const user = req.user as User | undefined;

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const reports = await Report.find({ createdBy: user.id, isAlive: true });

    if (reports.length === 0) {
      return res.status(404).json({ message: "No reports found." });
    }

    return res.status(200).json(reports);
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

// UPDATE AN EXISTING REPORT
export const updateReport = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedReport = await Report.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!updateReport) {
      return res.status(400).json({ message: "Rapor Bulunamadı" });
    }

    return res
      .status(200)
      .json({ message: "Rapor Güncellendi", updatedReport });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Sunucu Hatası" });
  }
};

// DELETE A REPORT - CHANGES STATUS "isAlive" to false
export const deleteReport = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const report = await Report.findById(id);

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    const deletedReport = await Report.findByIdAndUpdate(
      id,
      {
        isAlive: false,
      },
      { new: true }
    );

    return res.status(200).json({ message: "Report deleted", deletedReport });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// DELETE A REPORT - PERMANENT -
export const deleteReportFromDatabase = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedReport = await Report.findByIdAndDelete(id);
    if (!deletedReport) {
      return res.status(400).json({ message: "Rapor Bulunamadı" });
    }

    res.status(200).json({ message: "Rapor Silindi" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Sunucu Hatası" });
  }
};

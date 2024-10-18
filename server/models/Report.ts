import mongoose, { Schema, Types } from "mongoose";
import patientSchema from "./Patient";

interface IPatient {
  firstName: string;
  lastName: string;
  tcNo: string;
}

interface IReport {
  fileNumber: string;
  patient: IPatient;
  diagnosisTitle: string;
  diagnosisDetails: string;
  reportDate: Date;
  createdBy: Types.ObjectId;
  isAlive: boolean;
}

const reportSchema = new Schema({
  fileNumber: { type: String, required: true, unique: true },
  patient: { type: patientSchema, required: true },
  diagnosisTitle: { type: String, required: true },
  diagnosisDetails: { type: String, required: true },
  reportDate: { type: Date, required: true },
  laborant: {
    type: { id: String, firstName: String, lastName: String },
    required: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  isAlive: {
    type: Boolean,
    default: true,
  },
});

const Report = mongoose.model<IReport>("Report", reportSchema);

export default Report;

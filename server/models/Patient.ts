import mongoose, { Schema } from "mongoose";

const patientSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  tcNo: { type: String, required: true },
});

export default patientSchema;

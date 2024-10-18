import mongoose, { Document, Schema } from "mongoose";

interface IRole extends Document {
  name: string;
  permissions: string[];
  _id: Schema.Types.ObjectId;
}

const roleSchema = new Schema({
  name: { type: String, required: true, unique: true },
  permissions: [{ type: String }],
});

const Role = mongoose.model<IRole>("Role", roleSchema);

export default Role;

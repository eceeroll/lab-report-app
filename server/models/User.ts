import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  tc_no: string;
  password: string;
  role: Schema.Types.ObjectId;
  laborantId?: string;
}

const userSchema = new Schema<IUser>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  tc_no: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
  laborantId: { type: String, unique: true },
});

const User = mongoose.model<IUser>("User", userSchema);
export default User;

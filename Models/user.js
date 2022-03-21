import mongoose from "mongoose";

const User = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  isActivated: { type: Boolean, default: false },
  activationLink: { type: String },
  roles: [{ type: String, ref: "role" }],
  successfullPaymnet: { type: Boolean, default: false },
  paymentId: { type: String, default: "" },
  city: { type: String, default: "" },
  phoneNumber: { type: String, default: "" },
  birthday: { type: String, default: "" },
  linkFacebook: { type: String, default: "" },
  linkLinkedIn: { type: String, default: "" },
  linkInstagram: { type: String, default: "" },
});
export default mongoose.model("user", User);

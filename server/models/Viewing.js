import mongoose from "mongoose";

const ViewingSchema = new mongoose.Schema({
  property: {
    type: mongoose.Types.ObjectId,
    ref: "RealEstate",
    required: true
  },
  tenant: { // تغيير من client إلى tenant
    type: mongoose.Types.ObjectId,
    ref: "TenantUser",
    required: true
  },
  owner: { // تغيير من agent إلى owner
    type: mongoose.Types.ObjectId,
    ref: "OwnerUser",
    required: true
  },
  scheduledTime: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ["scheduled", "completed", "canceled", "no-show"],
    default: "scheduled"
  },
  notes: String,
  feedback: String
}, { timestamps: true });

export default mongoose.model("Viewing", ViewingSchema);
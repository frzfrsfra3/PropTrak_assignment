import mongoose from "mongoose";

const ClientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide client name"],
    trim: true
  },
  email: {
    type: String,
    required: [true, "Please provide client email"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please provide a valid email"
    ]
  },
  phone: {
    type: String,
    required: [true, "Please provide client phone number"]
  },
  interestedIn: {
    type: mongoose.Types.ObjectId,
    ref: "RealEstate",
    required: true
  },
  status: {
    type: String,
    enum: ["new", "contacted", "viewing", "closed"],
    default: "new"
  },
  notes: String,
  source: {
    type: String,
    enum: ["website", "referral", "walk-in", "other"],
    default: "website"
  }
}, { timestamps: true });

export default mongoose.model("Client", ClientSchema);
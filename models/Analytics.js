import mongoose from "mongoose";

const analyticsSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true,
  },

  linkId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lynko",
    default: null,
    index: true,
  },

  eventType: {
    type: String,
    required: true,
    enum: ["link_click", "page_view"],
    index: true,
  },

  metadata: {
    referrer: { type: String, default: "" },
    country: { type: String, default: "" },
    device: { type: String, default: "" },
  },

  timestamp: {
    type: Date,
    default: Date.now,
    index: true,
  },
});

analyticsSchema.index({ userId: 1, linkId: 1, timestamp: -1 });
analyticsSchema.index({ userId: 1, eventType: 1, timestamp: -1 });
// Auto-delete events older than 90 days
analyticsSchema.index({ timestamp: 1 }, { expireAfterSeconds: 7776000 });

export default mongoose.models.Analytics || mongoose.model("Analytics", analyticsSchema);

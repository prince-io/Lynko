import mongoose from "mongoose";

const designSchema = new mongoose.Schema(
  {
    clerkUserId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    customization: {
      type: mongoose.Schema.Types.Mixed,
      default: {
        theme: "lemonade",
        font: "inter",

        size: 2,
        radius: 2,
        border: "none",

        avatar: "rounded-xl",
        background: "bg-primary",

        buttonStyle: "btn",
        buttonRadius: "rounded",
      },
    },
  },
  { timestamps: true },
);

export default mongoose.models.Design || mongoose.model("Design", designSchema);

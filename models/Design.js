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

        size: [
          "md:text-lg text-sm",
          "md:text-base text-xs",
          "md:text-sm text-xs",
          "text-xs",
        ],
        radius: "rounded-none",
        border: "",

        avatar: "",
        background: "bg-primary",

        buttonStyle: "btn btn btn-accent",
        buttonRadius: "rounded-none",
      },
    },
  },
  { timestamps: true },
);

export default mongoose.models.Design || mongoose.model("Design", designSchema);

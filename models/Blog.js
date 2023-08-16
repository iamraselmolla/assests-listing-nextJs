import mongoose from "mongoose";
const UserSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Blog || mongoose.model("Blog", UserSchema);

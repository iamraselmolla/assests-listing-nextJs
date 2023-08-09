import mongoose, { Schema } from "mongoose";

const propertySchema = mongoose.Schema(
  {
    motive: {
      type: String,
      required: true,
      enum: ["sale", "rent"],
    },
    property: {
      type: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      format: {
        type: String,
        required: true,
      },
    },
    owner: {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      mobile1: {
        type: String,
        required: true,
      },
      mobile2: {
        type: String,
      },
    },
    img: {
      type: String,
      required: true,
    },
    activity: {
      active: {
        type: Boolean,
        required: true,
        default: false,
      },
      accepted: {
        type: Boolean,
        required: true,
        default: false,
      },
      featured: {
        type: Boolean,
        required: true,
        default: false,
      },
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Property ||
  mongoose.model("Property", propertySchema);

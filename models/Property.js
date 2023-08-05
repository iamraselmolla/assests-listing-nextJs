import mongoose from "mongoose";

const propertySchema = mongoose.Schema({
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
});

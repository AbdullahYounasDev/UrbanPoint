/** @format */

const { default: mongoose } = require("mongoose");

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  imagePublicId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Available", "Sold"],
    required: "true",
  },
  propertyType: {
    type: String,
    required: "true",
  },
  bathrooms: {
    type: Number,
    required: true,
  },
  bedrooms: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

const Property =
  mongoose.models.properties || mongoose.model("properties", propertySchema);
export default Property;

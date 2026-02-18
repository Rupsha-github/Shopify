import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    slug: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    categories: [
      {
        id: Number,
        name: String,
        slug: String,
        image: String,
      },
    ],
    images: [String],
    quantity: { type: Number, required: true, default: 0 },
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true },
);

const Product = mongoose.model("Product", productSchema);
export default Product;

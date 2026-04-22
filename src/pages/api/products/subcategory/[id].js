import connectDB from "../../../../../lib/db";
import { getSubcategoryProducts } from "../../../../../controllers/productController";

export default async function handler(req, res) {
  await connectDB();

  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const products = await getSubcategoryProducts(id);
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}
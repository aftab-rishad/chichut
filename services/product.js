import { db } from "@/lib/db";
import jwt from "jsonwebtoken";

class ProductService {
  constructor() {
    this.db = db;
  }
  async createProduct({
    token,
    name,
    size,
    color,
    description,
    category,
    subCategory,
    stock,
    discount,
    isFeatured,
    price,
    images,
  }) {
    try {
      const userId = jwt.verify(token, process.env.JWT_SECRET)?.id;
      const brand = await this.db.brand.findUnique({
        where: { userId: Number(userId) },
      });
      if (!brand) {
        throw new Error("Brand not found");
      }
      const product = await this.db.product.create({
        data: {
          name,
          brand: brand?.name,
          size,
          color,
          description,
          category,
          subCategory,
          stock: Number(stock),
          discount: Number(discount || 0),
          price: Number(price),
          isFeatured: isFeatured || false,
          images,
        },
      });
      return product;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async products({
    priceStart = 0,
    priceEnd = 10000000,
    category,
    subCategory,
  }) {
    try {
      const products = await this.db.product.findMany({
        where: {
          price: {
            gte: Number(priceStart),
            lte: Number(priceEnd),
          },
          category,
          subCategory,
        },
      });
      return products;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async product({ id }) {
    try {
      const product = await this.db.product.findUnique({
        where: { id: Number(id) },
      });
      return product;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async deleteProduct({ token, id }) {
    try {
      const userId = jwt.verify(token, process.env.JWT_SECRET)?.id;
      const brand = await this.db.brand.findUnique({
        where: { userId: Number(userId) },
      });
      if (!brand) {
        throw new Error("Brand not found");
      }
      const product = await this.db.product.findUnique({
        where: { id: Number(id) },
      });
      if (!product) {
        throw new Error("Product not found");
      }
      if (product.brand !== brand.name) {
        throw new Error("You are not authorized to delete this product");
      } else {
        await this.db.product.delete({
          where: { id: Number(id) },
        });
        return true;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default ProductService;

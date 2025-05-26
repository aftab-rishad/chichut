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
  async editProduct({
    token,
    id,
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
      const product = await this.db.product.findUnique({
        where: { id: Number(id) },
      });

      if (!product || product.brand !== brand.name) {
        throw Error("You are not authorized to edit this product");
      } else {
        const updatedProduct = await this.db.product.update({
          where: { id: Number(id) },
          data: {
            name,
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
        return updatedProduct;
      }
    } catch (error) {
      throw new Error(error);
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
  async addToCart({ token, productId, quantity, color, size }) {
    try {
      const userId = jwt.verify(token, process.env.JWT_SECRET)?.id;
      const product = await this.db.product.findUnique({
        where: { id: Number(productId) },
      });
      if (!product) {
        throw new Error("Product not found");
      }
      const brand = await this.db.brand.findUnique({
        where: { name: product.brand },
      });
      if (Number(brand?.userId) === Number(userId)) {
        throw new Error("You cannot add your own product to the cart.");
      }
      if (Number(quantity) > product.stock) {
        throw new Error("Quantity exceeds available stock");
      }
      const existingCartItem = await this.db.cart.findFirst({
        where: {
          userId: Number(userId),
          productId: Number(productId),
        },
      });
      if (existingCartItem) {
        if (existingCartItem.quantity + Number(quantity) > product.stock) {
          throw new Error("Quantity exceeds available stock");
        }
        const updatedCartItem = await this.db.cart.update({
          where: { id: existingCartItem?.id },
          data: {
            quantity: existingCartItem?.quantity + Number(quantity),
            color: color || existingCartItem?.color || product.color[0],
            size: size || existingCartItem?.size || product.size[0],
          },
        });
        return updatedCartItem;
      }
      const cartItem = await this.db.cart.create({
        data: {
          userId: Number(userId),
          brandId: Number(brand?.id),
          productId: Number(productId),
          quantity: Number(quantity),
          color: color || product.color[0],
          size: size || product.size[0],
        },
      });
      return cartItem;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async carts({ token }) {
    try {
      const userId = jwt.verify(token, process.env.JWT_SECRET)?.id;
      const carts = await this.db.cart.findMany({
        where: { userId: Number(userId) },
      });
      return carts;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async removeFromCart({ token, id }) {
    try {
      const userId = jwt.verify(token, process.env.JWT_SECRET)?.id;
      const cartItem = await this.db.cart.findUnique({
        where: { id: Number(id) },
      });
      if (!cartItem || cartItem.userId !== Number(userId)) {
        throw new Error("Cart item not found or you are not authorized");
      }
      await this.db.cart.delete({
        where: { id: Number(id) },
      });
      return true;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async updateCart({ token, id, quantity }) {
    try {
      const userId = jwt.verify(token, process.env.JWT_SECRET)?.id;
      const cartItem = await this.db.cart.findUnique({
        where: { id: Number(id) },
      });
      if (!cartItem || cartItem.userId !== Number(userId)) {
        throw new Error("Cart item not found or you are not authorized");
      }
      const product = await this.db.product.findUnique({
        where: { id: Number(cartItem.productId) },
      });
      if (!product) {
        throw new Error("Product not found");
      }
      if (Number(quantity) > product.stock) {
        throw new Error("Quantity exceeds available stock");
      }
      const updatedCartItem = await this.db.cart.update({
        where: { id: Number(id) },
        data: { quantity: Number(quantity) },
      });
      return updatedCartItem;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default ProductService;

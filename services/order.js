import { db } from "@/lib/db";
import jwt from "jsonwebtoken";

class OrderService {
  constructor() {
    this.db = db;
  }
  async createOrder(
    {
      address,
      amount,
      city,
      country,
      countryCode,
      email,
      firstName,
      lastName,
      paymentMethod,
      phone,
      brand,
      postalCode,
      shippingMethod,
      product,
    },
    { token }
  ) {
    try {
      const userId = await jwt.verify(token, process.env.JWT_SECRET);

      const findProduct = await this.db.product.findUnique({
        where: {
          id: Number(product?.id),
        },
      });

      if (!findProduct) {
        throw new Error(`Product with ID ${product?.id} not found!`);
      } else if (Number(findProduct?.stock) < Number(product?.quantity)) {
        throw new Error(
          `Product with ID ${product?.id} stock is less then ${product?.quantity}`
        );
      }

      const data = await this.db.order.create({
        data: {
          address,
          userId: userId?.id,
          amount: Number(amount) * 0.07 + Number(amount),
          city,
          country,
          brand,
          countryCode,
          email,
          firstName,
          lastName,
          paymentMethod,
          paymentStatus: false,
          status: "Processing",
          phone,
          postalCode,
          shippingMethod,
          product,
        },
      });
      return data;
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  }
  async orders() {
    try {
      const orders = await this.db.order.findMany({});
      return orders;
    } catch (error) {
      console.log(error.message);
      throw new Error(error.message);
    }
  }
}

export default OrderService;

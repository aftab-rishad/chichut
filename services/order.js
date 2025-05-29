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
      postalCode,
      shippingMethod,
      products,
    },
    { token }
  ) {
    try {
      const userId = await jwt.verify(token, process.env.JWT_SECRET);
      for (const product of products) {
        const findProduct = await this.db.product.findUnique({
          where: { id: Number(product?.id) },
        });

        if (!findProduct) {
          throw new Error(`Product with ID ${product?.id} not found!`);
        } else if (Number(findProduct?.stock) < Number(product?.quantity)) {
          throw new Error(
            `Product with ID ${product?.id} stock is less then ${product?.quantity}`
          );
        }
      }
      const data = await this.db.order.create({
        data: {
          address,
          userId: userId?.id,
          amount,
          city,
          country,
          countryCode,
          email,
          firstName,
          lastName,
          paymentMethod,
          paymentStatus: false,
          status: "pending",
          phone,
          postalCode,
          shippingMethod,
          products,
        },
      });
      if (data) {
        const emptyCart = await this.db.cart.deleteMany({
          where: { userId: Number(userId?.id) },
        });
      }

      return data;
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  }
}

export default OrderService;

"use server";

import { db } from "@/lib/db";

const clearCart = async ({ id }) => {
  try {
    await db.cart.deleteMany({
      where: {
        userId: Number(id),
      },
    });
  } catch (error) {
    console.log(error);
    return {};
  }
};

export default clearCart;

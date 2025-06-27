"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

const updateOrder = async ({ id, status }) => {
  try {
    const updatedOrder = await db.order.update({
      where: {
        id: Number(id),
      },
      data: {
        status,
      },
    });
    revalidatePath("/", "layout");
    if (updatedOrder?.status === status) {
      return { success: true };
    } else {
      return { success: false };
    }
  } catch (error) {
    console.log(error);
    return { success: true };
  }
};

export default updateOrder;

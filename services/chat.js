"use server";

import { db } from "@/lib/db";
import jwt from "jsonwebtoken";

class ChatService {
  constructor() {
    this.db = db;
  }
  async createRoom({ token, vendorId }) {
    try {
      const userId = await jwt.verify(token, process.env.JWT_SECRET);
      const findBrand = await this.db.brand.findUnique({
        where: {
          id: Number(vendorId),
        },
      });
      const room = await this.db.room.findFirst({
        where: {
          clientId: Number(userId?.id),
          vendorId: Number(vendorId),
        },
      });

      if (!findBrand) {
        throw new Error(`Vendor with ID ${vendorId} could not be found.`);
      } else if (room) {
        throw new Error(
          `Unable to create multiple rooms with the same Vendor ID and Client ID.`
        );
      } else {
        const data = await this.db.room.create({
          data: {
            vendorId: Number(vendorId),
            clientId: Number(userId?.id),
          },
        });
        return data;
      }
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  }
  async rooms({ id, roomFor }) {
    try {
      if (roomFor === "vendor") {
        const vendor = await this.db.brand.findUnique({
          where: { id: Number(id) },
        });
        if (!vendor) {
          throw new Error(`Vendor with ID ${id} could not be found.`);
        } else {
          const data = await this.db.room.findMany({
            where: { vendorId: Number(id) },
            orderBy: {
              createdAt: "desc",
            },
          });
          return data;
        }
      } else if (roomFor === "client") {
        const user = await this.db.user.findUnique({
          where: { id: Number(id) },
        });
        if (!user) {
          throw new Error(`User with ID ${id} could not be found.`);
        } else {
          const data = await this.db.room.findMany({
            where: { clientId: Number(id) },
            orderBy: {
              createdAt: "desc",
            },
          });
          return data;
        }
      }
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  }
  async roomById({ id }) {
    try {
      const data = await this.db.room.findUnique({
        where: { id: Number(id) },
      });
      if (!data) {
        throw new Error(`Room with ID ${id} could not be found.`);
      }
      return data;
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  }
  async roomByIds({ vendorId, clientId }) {
    try {
      const data = await this.db.room.findFirst({
        where: { vendorId: Number(vendorId), clientId: Number(clientId) },
      });
      if (!data) {
        throw new Error(
          `Room with Vendor ID ${vendorId} and Client ID ${clientId} could not be found.`
        );
      }
      return data;
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  }
}

export default ChatService;

"use server";

import { db } from "@/lib/db";
import jwt from "jsonwebtoken";

class BrandService {
  constructor() {
    this.db = db;
  }
  async createBrand({ token, name, description, image, email, location }) {
    const userId = await jwt.verify(token, process.env.JWT_SECRET);
    const userIdInt = Number(userId?.id);
    try {
      const allBrands = await this.db.brand.findMany();

      const brandWithSameName = allBrands.find(
        (brand) => brand.name.toLowerCase() === name.toLowerCase()
      );
      const brandWithSameEmail = allBrands.find(
        (brand) => brand.email.toLowerCase() === email.toLowerCase()
      );
      if (brandWithSameName) {
        throw new Error("Brand name already exists");
      }
      if (brandWithSameEmail) {
        throw new Error("Brand email already exists");
      }

      if (!name || !description || !image || !email || !location) {
        throw new Error("All fields are required");
      }
      const user = await this.db.user.findUnique({
        where: { id: userIdInt },
      });
      if (!user) {
        throw new Error(`User not found with ${userId}`);
      }
      const brand = await this.db.brand.create({
        data: {
          userId: userIdInt,
          name,
          description,
          image,
          email,
          location,
        },
      });
      return brand;
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  }
  async brand({ id, userId, name }) {
    const idInt = Number(id);
    const userIdInt = Number(userId);
    try {
      if (!idInt && !userIdInt && !name) {
        throw new Error("Please provide id, userId or name");
      }
      if (idInt) {
        const brand = await this.db.brand.findUnique({
          where: { id: idInt },
        });
        if (!brand) {
          throw new Error(`Brand not found with ${id}`);
        }
        return brand;
      } else if (userIdInt) {
        const brand = await this.db.brand.findUnique({
          where: { userId: userIdInt },
        });
        if (!brand) {
          throw new Error(`Brand not found with ${userId}`);
        }
        return brand;
      } else {
        const brand = await this.db.brand.findUnique({
          where: { name: name },
        });
        if (!brand) {
          throw new Error(`Brand not found with ${name}`);
        }
        return brand;
      }
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  }
  async brands() {
    try {
      const brands = await this.db.brand.findMany();
      return brands;
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  }
}

export default BrandService;

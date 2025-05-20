import UserService from "@/services/user";
import BrandService from "@/services/brands";
import ProductService from "@/services/product";

export const resolvers = {
  Query: {
    me: async (_, { token }) => {
      const user = await new UserService().me({ token });
      return user;
    },
    isValidResetUrl: async (_, { token, tokenId }) => {
      const user = await new UserService().isValidResetUrl({
        token,
        tokenId,
      });
      return user;
    },
    isValidOtpUrl: async (_, { id }) => {
      const user = await new UserService().isValidOtpUrl({ id });
      return user;
    },
    brand: async (_, { id, userId }) => {
      const brand = await new BrandService().brand({ id, userId });
      return brand;
    },
    brands: async () => {
      const brands = await new BrandService().brands();
      return brands;
    },
    products: async (_, { priceStart, priceEnd, category, subCategory }) => {
      const products = await new ProductService().products({
        priceStart,
        priceEnd,
        category,
        subCategory,
      });
      return products;
    },
    product: async (_, { id }) => {
      const product = await new ProductService().product({ id });
      return product;
    },
  },
  Mutation: {
    login: async (_, { email, password }) => {
      const token = await new UserService().login({
        email,
        password,
      });

      return { token };
    },
    resetPasswordEmail: async (_, { email }) => {
      const resetPassword = await new UserService().resetPasswordEmail({
        email,
      });
      return resetPassword;
    },
    resetPassword: async (_, { token, tokenId, password }) => {
      const resetPassword = await new UserService().resetPassword({
        token,
        tokenId,
        password,
      });
      return resetPassword;
    },
    sendOtp: async (_, { firstName, lastName, email, password }) => {
      const otp = await new UserService().sendOtp({
        firstName,
        lastName,
        email,
        password,
      });
      return otp;
    },
    verifyOtp: async (_, { id, otp }) => {
      const createdOtp = await new UserService().verifyOtp({ id, otp });
      return createdOtp;
    },
    regenerateOtp: async (_, { id }) => {
      const otp = await new UserService().regenerateOtp({ id });
      return otp;
    },
    createBrand: async (
      _,
      { name, description, image, email, location },
      { token }
    ) => {
      await new UserService().isAuthenticated({ token });
      const createdBrand = await new BrandService().createBrand({
        token,
        name,
        description,
        image,
        email,
        location,
      });
      return createdBrand;
    },
    createProduct: async (
      _,
      {
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
      },
      { token }
    ) => {
      await new UserService().isAuthenticated({ token });
      const createdProduct = await new ProductService().createProduct({
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
      });
      return createdProduct;
    },
    deleteProduct: async (_, { id }, { token }) => {
      await new UserService().isAuthenticated({ token });
      const deletedProduct = await new ProductService().deleteProduct({
        token,
        id,
      });
      return deletedProduct;
    },
    editProduct: async (
      _,
      {
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
      },
      { token }
    ) => {
      await new UserService().isAuthenticated({ token });
      const editProduct = await new ProductService().editProduct({
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
      });
      return editProduct;
    },
  },
};

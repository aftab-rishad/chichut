import UserService from "@/services/user";
import BrandService from "@/services/brands";
import ProductService from "@/services/product";
import OrderService from "@/services/order";
import ChatService from "@/services/chat";

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
    brand: async (_, { id, userId, name }) => {
      const brand = await new BrandService().brand({ id, userId, name });
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
    carts: async (_, __, { token }) => {
      await new UserService().isAuthenticated({ token });
      const cart = await new ProductService().carts({ token });
      return cart;
    },
    getReviewByProduct: async (_, { id }) => {
      const data = await new ProductService().getReviewByProduct({ id });
      return data;
    },
    orders: async () => {
      const data = await new OrderService().orders();
      return data;
    },
    rooms: async (_, { id, roomFor }, { token }) => {
      await new UserService().isAuthenticated({ token });
      const data = await new ChatService().rooms({ id, roomFor });
      return data;
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
    addToCart: async (_, { productId, quantity, color, size }, { token }) => {
      await new UserService().isAuthenticated({ token });
      const addToCart = await new ProductService().addToCart({
        token,
        productId,
        quantity,
        color,
        size,
      });
      return addToCart;
    },
    removeFromCart: async (_, { id }, { token }) => {
      await new UserService().isAuthenticated({ token });
      const removeFromCart = await new ProductService().removeFromCart({
        token,
        id,
      });
      return removeFromCart;
    },
    updateCart: async (_, { id, quantity }, { token }) => {
      await new UserService().isAuthenticated({ token });
      const updateCart = await new ProductService().updateCart({
        token,
        id,
        quantity,
      });
      return updateCart;
    },
    createOrder: async (
      _,
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
    ) => {
      await new UserService().isAuthenticated({ token });
      const data = await new OrderService().createOrder(
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
      );
      return data;
    },
    createReview: async (_, { productId, comment, rating }, { token }) => {
      await new UserService().isAuthenticated({ token });
      const data = await new ProductService().reviewProduct(
        { productId, comment, rating },
        { token }
      );
      return data;
    },
    createRoom: async (_, { vendorId }, { token }) => {
      await new UserService().isAuthenticated({ token });
      const data = await new ChatService().createRoom({ token, vendorId });
      return data;
    },
  },
};

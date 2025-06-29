export const typeDefs = `#graphql
  type User {
    id: ID
    firstName: String
    lastName: String
    email: String
    createdAt: String
    updatedAt: String
  }

  type Token {
    token: String
  }

  type cart {
    id: ID
    userId: ID
    productId: ID
    brandId: ID
    color: String
    size: String
    quantity: Int
    createdAt: String
    updatedAt: String
  }

  enum sender {
    client
    vendor
  }

  type Room {
    id: ID!
    vendorId: ID!
    clientId: ID!
    unreadVendor: Int!
    unreadClient: Int!
    createdAt: String!
  }

  type ResetPasswordEmail {
    userId: ID
    token: String
  }

  type Brand {
    id: ID
    userId: ID
    name: String
    description: String
    image: String
    email: String
    location: String
    createdAt: String
    updatedAt: String
  }

  type Product {
    id: ID
    name: String
    brand: String
    size: [String!]
    color: [String!]
    description: String
    category: String
    subCategory: String
    stock: Int
    discount: Float
    price: Float!
    images: [String!]
    isFeatured: Boolean
    createdAt: String
    updatedAt: String
  }

  type ProductForOrder {
    brand: String!
    color: String!
    id: String!
    image: String!
    name: String!
    price: Float!
    quantity: Int!
    size: String!
  }

  type Review {
    id: ID!
    user: User!
    userId: ID!
    productId: ID!
    rating: Int!
    comment: String
    createdAt: String!
    updatedAt: String!
  }

  input ProductInput {
    brand: String!
    color: String!
    id: String!
    image: String!
    name: String!
    price: Float!
    quantity: Int!
    size: String!
  }

  type Order {
    id: ID!
    userId: ID!
    brand: String!
    address: String!
    amount: Float!
    city: String!
    country: String!
    countryCode: String!
    email: String!
    firstName: String!
    lastName: String!
    paymentMethod: String!
    paymentStatus: Boolean!
    phone: String!
    postalCode: String!
    shippingMethod: String!
    status: String!
    product: ProductForOrder!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    me(token: String!): User
    isValidResetUrl(token: String!, tokenId: String!): Boolean
    isValidOtpUrl(id: ID!): Boolean
    brand(id: ID, userId: ID, name: String): Brand
    brands: [Brand]
    products(
      priceStart: Int
      priceEnd: Int
      category: String
      subCategory: String
    ): [Product]
    product(id: ID!): Product
    carts: [cart]
    getReviewByProduct(id: ID!): [Review]
    orders: [Order]
    rooms(id: ID!, roomFor: sender!): [Room!]!
    roomById(id: ID!): Room!
    roomByIds(clientId: ID!, vendorId: ID!): Room!
    user(id: ID!): User!
  }

  type Mutation {
    login(email: String!, password: String!): Token
    resetPasswordEmail(email: String!): Boolean
    resetPassword(token: String!, tokenId: String!, password: String!): Boolean
    sendOtp(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): ID
    verifyOtp(id: ID!, otp: String!): Boolean
    regenerateOtp(id: ID!): ID
    createBrand(
      name: String!
      description: String!
      image: String!
      email: String!
      location: String!
    ): Brand!
    createProduct(
      name: String!
      size: [String!]!
      color: [String!]!
      description: String!
      category: String!
      subCategory: String!
      stock: Int!
      discount: Float
      price: Float!
      isFeatured: Boolean!
      images: [String!]!
    ): Product!
    deleteProduct(id: ID!): Boolean
    editProduct(
      id: ID!
      name: String!
      size: [String!]!
      color: [String!]!
      description: String!
      category: String!
      subCategory: String!
      stock: Int!
      discount: Float
      price: Float!
      isFeatured: Boolean!
      images: [String!]!
    ): Product!
    addToCart(productId: ID!, quantity: Int!, color: String!, size: String!): cart
    removeFromCart(id: ID!): Boolean
    updateCart(id: ID!, quantity: Int!): cart
    createOrder(
      address: String!
      brand: String!
      amount: Float!
      city: String!
      country: String!
      countryCode: String!
      email: String!
      firstName: String!
      lastName: String!
      paymentMethod: String!
      phone: String!
      postalCode: String!
      shippingMethod: String!
      product: ProductInput!
    ): Order!
    createReview(rating: Int!, comment: String!, productId: ID!): Review!
    createRoom(vendorId: ID!): Room!
  }
`;

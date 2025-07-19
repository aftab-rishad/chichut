# 🛍️ ChicHut

**ChicHut** is a modern multi-vendor e-commerce web application built with **Next.js**, **Prisma**, **GraphQL**, and **Socket.IO**. It enables seamless product browsing, vendor interactions, and real-time order management — all with a clean and responsive UI.

## 🔗 Live Demo

[https://chichut.aftabrishad.com](https://chichut.aftabrishad.com)

## 📂 GitHub Repository

[GitHub - aftab-rishad/chichut](https://github.com/aftab-rishad/chichut)

---

## 🚀 Tech Stack

* **Frontend:** Next.js (App Router)
* **Backend:** GraphQL (with Next.js)
* **Database ORM:** Prisma
* **Database:** PostgreSQL
* **Real-time:** Socket.IO
* **Authentication:** Role-based auth with secure cookies
* **AI-Powered Product Info:** Gemini AI
* **Styling:** Tailwind CSS and ShadCN
* **Image Handling:** Image upload & storage support

---

## 🔑 Core Features

### 1. Role-Based Authentication

* Secure login for **Vendor** and **Customer** roles.
* Protected routes and access control using server-side session management.

### 2. OTP Verification on Signup

* Users must verify their email using a **One-Time Password (OTP)** during registration for enhanced security.

### 3. Password Recovery

* Forgot password? Users can securely reset their password via email.

### 4. Product Management (CRUD)

* Vendors can **create**, **edit**, **delete**, and **manage** products with images.
* Vendors can generate smart product titles and descriptions using AI.

### 5. Shopping Cart & Checkout

* Add to cart, remove items, and update quantity.
* Checkout functionality with **Cash on Delivery (COD)** only.

### 6. Reviews & Ratings

* Customers can leave **reviews and star ratings** for products after purchase.
* Vendors can view feedback.

### 7. Real-Time Notifications

* Live updates for:

  * New orders
  * Order status changes
* Powered by **Socket.IO** for instant delivery.

### 8. Real-Time Chat with Vendor

* An in-app **chat system** between customers and vendors.
* Enables better communication for inquiries or order updates.

---

## 🧠 Architecture Highlights

* **GraphQL API** for flexible and scalable data querying.
* **Modular server components** for the separation of concerns.
* Uses **Prisma ORM** with PostgreSQL for efficient and type-safe DB operations.
* Implements **Socket.IO server** for real-time updates and messaging.

---

## 📌 Future Enhancements (Planned)

* Payment gateway integration (e.g., Stripe, SSLCommerz)

* Vendor-specific analytics and product insights

* Push notifications for order status

---

## 👨‍💻 Developed by

**Yasin Aftab Rishad**
[🌐 Portfolio](https://www.aftabrishad.com) | [🔗 LinkedIn](https://www.linkedin.com/in/aftab-rishad)

---

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

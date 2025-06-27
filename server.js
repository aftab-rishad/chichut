import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";
import { db } from "./lib/db.js";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer, {
    cors: {
      origin:
        process.env.NEXT_PUBLIC_SOCKET_URL || `http://${hostname}:${port}`,
      methods: ["GET", "POST"],
      allowedHeaders: ["Content-Type"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);
    socket.on("join-room", async ({ roomId }) => {
      try {
        socket.join(`room-${roomId}`);
      } catch (error) {
        console.error("Error joining room:", error);
        return;
      }
    });
    socket.on("typing", ({ roomId }) => {
      socket.to(`room-${roomId}`).emit("typing", true);
    });

    socket.on("old-messages", async ({ roomId }) => {
      try {
        const messages = await db.message.findMany({
          where: { roomId: Number(roomId) },
          orderBy: { createdAt: "asc" },
        });
        socket.emit("old-messages", messages);
      } catch (error) {
        console.error("Error fetching old messages:", error);
      }
    });

    socket.on("send-message", async ({ roomId, message, sender }) => {
      try {
        const newMessage = await db.message.create({
          data: {
            content: message,
            sender: sender,
            roomId: Number(roomId),
          },
        });
        const room = await db.room.findUnique({
          where: { id: Number(roomId) },
        });
        const updateFor = sender === "client" ? "unreadVendor" : "unreadClient";
        await db.room.update({
          where: { id: Number(roomId) },
          data: {
            [updateFor]: { increment: 1 },
          },
        });
        socket.to(`room-${roomId}`).emit("typing", false);
        socket
          .to(
            `room-${
              sender === "client"
                ? `${room?.vendorId}-vendor`
                : `${room?.clientId}-client`
            }`
          )
          .emit("unread-message", {
            id: roomId,
            unread: 1,
          });

        io.to(`room-${roomId}`).emit("new-message", newMessage);
      } catch (error) {
        console.error("Error sending message:", error);
      }
    });
    socket.on("old-unread", async ({ id, unreadFor }) => {
      try {
        const unreadMessages = await db.room.findMany({
          where: {
            [unreadFor]: Number(id),
          },
        });

        const allUnreadMessages = unreadMessages.reduce(
          (acc, room) => {
            if (unreadFor === "vendorId") {
              acc.unreadVendor += room.unreadVendor || 0;
            } else {
              acc.unreadClient += room.unreadClient || 0;
            }
            return acc;
          },
          { unreadVendor: 0, unreadClient: 0 }
        );

        socket.emit("old-unread", {
          unreadMessages: allUnreadMessages,
        });
      } catch (error) {
        console.error("Error fetching unread messages:", error);
      }
    });

    socket.on("clean-unread", async ({ roomId, unreadFor }) => {
      try {
        const room = await db.room.findUnique({
          where: { id: Number(roomId) },
        });
        await db.room.update({
          where: { id: Number(roomId) },
          data: {
            [unreadFor]: 0,
          },
        });

        io.to(
          `room-${
            unreadFor === "unreadVendor"
              ? `${room?.vendorId}-vendor`
              : `${room?.clientId}-client`
          }`
        ).emit("clean-unread", {
          unreadFor,
          prevUnread:
            unreadFor === "unreadVendor"
              ? room?.unreadVendor
              : room?.unreadClient,
        });
      } catch (error) {
        console.error("Error cleaning unread messages:", error);
      }
    });

    socket.on("old-unread-for-list", async ({ id }) => {
      try {
        const room = await db.room.findUnique({
          where: {
            id: Number(id),
          },
        });
        socket.emit("old-unread-for-list", {
          unreadVendor: room?.unreadVendor || 0,
          unreadClient: room?.unreadClient || 0,
          id: room?.id,
        });
      } catch (error) {
        console.error("Error fetching unread messages for list:", error);
      }
    });
    socket.on("send-notification", async ({ userId, title, message, url }) => {
      try {
        const notification = await db.notification.create({
          data: {
            userId: Number(userId),
            title,
            message,
            url,
          },
        });

        socket
          .to(`room-${userId}-client`)
          .emit("new-notification", notification);
      } catch (error) {
        console.error("Error sending notification:", error);
      }
    });

    socket.on("get-notifications", async ({ userId }) => {
      try {
        const notifications = await db.notification.findMany({
          where: { userId: Number(userId) },
          orderBy: { read: "asc" },
        });
        socket.emit("notifications", notifications);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    });

    socket.on("read-notification", async ({ id }) => {
      try {
        const notification = await db.notification.update({
          where: { id: Number(id) },
          data: { read: true },
        });
        socket.emit("read-notification", notification);
      } catch (error) {
        console.error("Error reading notification:", error);
      }
    });

    socket.on("clear-notifications", async ({ userId }) => {
      try {
        await db.notification.deleteMany({
          where: { userId: Number(userId) },
        });
        socket.emit("clear-notifications");
      } catch (error) {
        console.error("Error clearing notifications:", error);
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
    socket.on("error", (err) => {
      console.error("Socket error:", err);
    });
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`🚀 Ready on http://${hostname}:${port}`);
    });
});

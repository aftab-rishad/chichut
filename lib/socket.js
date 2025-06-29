"use client";

import { io } from "socket.io-client";

export const socket = io(
  process.env.NEXT_PUBLIC_SOCKET_URL ||
    "https://chichut-socket-server.onrender.com",
  {
    transports: ["websocket"],
  }
);

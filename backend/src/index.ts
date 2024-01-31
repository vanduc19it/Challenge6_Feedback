import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app";
import { Server } from "socket.io";
import http from "http";
import { saveMessageService } from "./services/messageService";

dotenv.config();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("joinChannel", (channelId) => {
    socket.join(channelId);
    socket.to(channelId).emit("userJoined", channelId);
  });

  socket.on("sendMessage", async ({ channelId, message }) => {
    io.to(channelId).emit("messageReceived", message);

    await saveMessageService(
      message.messageId,
      message.sender._id,
      message.content,
      message.date,
      channelId
    );
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

const port = process.env.PORT || 8080;
const mongodb_url = process.env.MONGODB_URL;

mongoose
  .connect(`${mongodb_url}`)
  .then(() => {
    console.log("[MongoDB]: Connected successfully");
    server.listen(port, () => {
      console.log(`[server]: Server is running at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error(`[MongoDB]: Connection error: ${error}`);
    process.exit(1);
  });

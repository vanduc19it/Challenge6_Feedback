"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app"));
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const messageService_1 = require("./services/messageService");
dotenv_1.default.config();
const server = http_1.default.createServer(app_1.default);
const io = new socket_io_1.Server(server, {
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
    socket.on("sendMessage", ({ channelId, message }) => __awaiter(void 0, void 0, void 0, function* () {
        io.to(channelId).emit("messageReceived", message);
        yield (0, messageService_1.saveMessageService)(message.messageId, message.sender._id, message.content, message.date, channelId);
    }));
    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });
});
const port = process.env.PORT || 8080;
const mongodb_url = process.env.MONGODB_URL;
mongoose_1.default
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

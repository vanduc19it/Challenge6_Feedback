import { useEffect, useRef, useState } from "react";
import { Button, Input, Typography } from "antd";
import Messages from "./Messages";
import { io, Socket } from "socket.io-client";
import styles from "./style.module.scss";
import { useSelector } from "react-redux";
import { AppDispatch, IRootState } from "../../redux/store";
import { User, MessagesProps, Channel } from "../../interfaces/interfaces";
import { v4 as uuidv4 } from "uuid";
import { getDataFromLocalStorage } from "../../utils/localStorage";
import { getMessageByChannel } from "../../redux/actions/chatActions";
import { useDispatch } from "react-redux";

function ChatScreen() {
  const URL_SERVER = import.meta.env.VITE_URL_SERVER;
  const containerRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<MessagesProps[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const socket = useRef<Socket | null>(null);

  const { messageChannel } =
    (useSelector((state: IRootState) => state.chatReducer) as {
      messageChannel: MessagesProps[];
    }) || null;

  const selectedChannelId: string =
    getDataFromLocalStorage("selectedChannelId");

  const useAppDispatch: () => AppDispatch = useDispatch;
  const dispatch = useAppDispatch();

  const { selectedChannel } =
    (useSelector((state: IRootState) => state.chatReducer) as {
      selectedChannel: Channel;
    }) || null;

  useEffect(() => {
    setMessages([]);
    dispatch(getMessageByChannel(selectedChannelId));
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
    setMessages(messageChannel);
    socket.current = io(`${URL_SERVER}`);

    socket.current.on("messageReceived", (message: MessagesProps) => {
      setMessages((prevMessages) => [...prevMessages, message]);

      if (containerRef.current) {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
      }
    });

    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, [selectedChannelId, selectedChannel]);

  const { user } =
    (useSelector((state: IRootState) => state.userReducer.userInfo) as {
      user?: User;
    }) || {};

  useEffect(() => {
    if (socket.current && selectedChannel) {
      socket.current.emit("joinChannel", selectedChannel.channelId);
    }
  }, [selectedChannel]);

  const handleSendMessage = () => {
    if (newMessage.trim() !== "" && user && selectedChannel) {
      const newMessageObject: MessagesProps = {
        channelId: selectedChannel.channelId,
        messageId: uuidv4(),
        sender: user,
        content: newMessage,
        date: new Date(),
      };
      if (socket.current) {
        socket.current.emit("sendMessage", {
          channelId: selectedChannel.channelId,
          message: newMessageObject,
        });
      }
      setNewMessage("");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Typography.Text className={styles["header-title"]}>
          {selectedChannel?.name != "welcome"
            ? selectedChannel?.name
            : "welcome channel"}
        </Typography.Text>
      </div>
      <div className={styles.messages} ref={containerRef}>
        {messages &&
          messages.map((message, index) => (
            <Messages key={index} message={message} />
          ))}
      </div>
      <div className={styles.footer}>
        {selectedChannel?.name != "welcome" && (
          <Input
            placeholder="Type a message here"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
            suffix={
              <Button
                className={styles["footer-btn-send"]}
                onClick={handleSendMessage}
              >
                <i className={`material-icons ${styles["footer-icon-send"]}`}>
                  send
                </i>
              </Button>
            }
            className={styles["footer-input"]}
          />
        )}
      </div>
    </div>
  );
}

export default ChatScreen;

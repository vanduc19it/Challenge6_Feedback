import styles from "./styles.module.scss";
import { Avatar, Image, Typography } from "antd";
import { MessagesProps } from "../../../interfaces/interfaces";
import { UserOutlined } from "@ant-design/icons";
import { formatDate } from "../../../utils/formatDate";

function Messages({ message }: { message: MessagesProps }) {
  return (
    <div className={styles["chat-container"]}>
      {message?.sender?.avatar != "" ? (
        <Image
          src={message?.sender?.avatar}
          style={{
            width: 42,
            height: 42,
          }}
          alt="user-avatar"
          preview={false}
          className={styles["chat-user-avatar"]}
        />
      ) : (
        <Avatar
          size={42}
          icon={<UserOutlined />}
          shape="square"
          className={styles["user-avatar-default"]}
        />
      )}
      <div className={styles["chat-group"]}>
        <div className={styles["chat-info"]}>
          <Typography className={styles["chat-user-name"]}>
            {message?.sender?.name}
          </Typography>
          <Typography className={styles["chat-time"]}>
            {formatDate(`${message?.date}`)}
          </Typography>
        </div>
        <Typography className={styles["chat-message"]}>
          {message?.content}
        </Typography>
      </div>
    </div>
  );
}

export default Messages;

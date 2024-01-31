import React, { useRef, useState } from "react";
import styles from "./style.module.scss";
import { Avatar, Button, Dropdown, Image, Input, Typography } from "antd";
import ModalCreateChannel from "../../ModalCreateChannel";
import { Link, useNavigate } from "react-router-dom";
import type { MenuProps } from "antd";
import { AppDispatch, IRootState } from "../../../redux/store";
import { useDispatch } from "react-redux";
import { joinChannel } from "../../../redux/actions/chatActions";
import { useSelector } from "react-redux";
import { Channel, User } from "../../../interfaces/interfaces";
import { getInitials } from "../../../utils/stringUtils";
import { UserOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { logout } from "../../../redux/actions/userActions";
import { setLocalStorageItem } from "../../../utils/localStorage";
import { io, Socket } from "socket.io-client";

interface AllChannelsProps {
  onNavigate: (channelId: string) => void;
}

function AllChannels({ onNavigate }: AllChannelsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const navigate = useNavigate();

  const handleLogoutUser = async () => {
    try {
      await dispatch(logout());
      toast.success("Logout successfully!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate("/login");
    } catch (error) {
      toast.error("Logout error!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Link to="/profile">
          <div className={styles["menu-item"]}>
            <i className={`material-icons ${styles["menu-user-icon"]}`}>
              account_circle
            </i>
            <Typography.Text className={styles["menu-user-text"]}>
              {" "}
              My Profile
            </Typography.Text>
          </div>
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <Link to="/chat">
          <div className={styles["menu-item"]}>
            <i className={`material-icons ${styles["menu-user-icon"]}`}>
              group
            </i>

            <Typography.Text className={styles["menu-user-text"]}>
              Tweeter
            </Typography.Text>
          </div>
        </Link>
      ),
    },

    {
      type: "divider",
    },
    {
      key: "4",
      label: (
        <>
          <div className={styles["menu-item"]} onClick={handleLogoutUser}>
            <i className={`material-icons ${styles["menu-icon-logout"]}`}>
              logout
            </i>
            <Typography.Text className={styles["menu-text-logout"]}>
              Logout
            </Typography.Text>
          </div>
        </>
      ),
    },
  ];

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleVisibleChange = (visible: boolean) => {
    setIsOpen(visible);
  };

  const arrowIcon: string = isOpen
    ? "keyboard_arrow_up"
    : "keyboard_arrow_down";

  const useAppDispatch: () => AppDispatch = useDispatch;
  const dispatch = useAppDispatch();

  const { channels } = (useSelector(
    (state: IRootState) => state.chatReducer
  ) as { channels: Channel[] }) || { channels: [] };

  const { user } =
    (useSelector((state: IRootState) => state.userReducer.userInfo) as {
      user?: User;
    }) || {};

  const socket = useRef<Socket | null>(null);
  socket.current = io("http://localhost:8080/");

  const handleChannelClick = (channel: Channel) => {
    if (user) {
      dispatch(joinChannel(channel.channelId, user._id));

      if (socket.current) {
        socket.current.emit("joinChannel", channel.channelId);
      }
      onNavigate(channel.channelId);
      navigate(`/chat/group/${channel.name}`);
      setLocalStorageItem("selectedChannelId", channel.channelId);
    }
  };

  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  if (!channels) {
    return null;
  }
  const filteredChannels = channels.filter((channel) =>
    channel.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <Typography.Text className={styles["header-title"]}>
            Channels
          </Typography.Text>
          <Button className={styles["header-add-channel"]} onClick={showModal}>
            <i className={`material-icons ${styles["header-add-icon"]}`}>add</i>
          </Button>
        </div>
        <div className={styles.body}>
          <div className={styles.channel}>
            <Input
              placeholder="Search"
              prefix={
                <i
                  className={`material-icons ${styles["channel-search-icon"]}`}
                >
                  search
                </i>
              }
              value={searchTerm}
              onChange={handleSearchChange}
              className={styles["channel-search-input"]}
            />
            {filteredChannels &&
              filteredChannels.map((channel: Channel) => (
                <div
                  className={styles["channel-container"]}
                  onClick={() => handleChannelClick(channel)}
                  key={channel.channelId}
                >
                  <div className={styles["channel-avatar"]}>
                    <Typography.Text className={styles["channel-text"]}>
                      {getInitials(channel?.name)}
                    </Typography.Text>
                  </div>
                  <Typography.Text className={styles["channel-name"]}>
                    {channel?.name}
                  </Typography.Text>
                </div>
              ))}
          </div>
        </div>
        <div className={styles.footer}>
          <div className={styles["user-info"]}>
            {user?.avatar != "" ? (
              <Image
                src={user?.avatar}
                style={{
                  width: 42,
                  height: 42,
                }}
                alt="user-avatar"
                preview={false}
                className={styles["user-avatar"]}
              />
            ) : (
              <Avatar
                size={42}
                icon={<UserOutlined />}
                shape="square"
                className={styles["user-avatar-default"]}
              />
            )}

            <Dropdown
              menu={{ items }}
              trigger={["click"]}
              open={isOpen}
              onOpenChange={handleVisibleChange}
              className={styles.dropdown}
            >
              <span className={styles["user-text"]}>
                <Typography.Text className={styles["user-name"]}>
                  {user?.name}
                </Typography.Text>

                <i className={`material-icons ${styles["user-icon"]}`}>
                  {arrowIcon}
                </i>
              </span>
            </Dropdown>
          </div>
        </div>
      </div>
      <ModalCreateChannel
        isModalOpen={isModalOpen}
        showModal={showModal}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
    </>
  );
}

export default AllChannels;

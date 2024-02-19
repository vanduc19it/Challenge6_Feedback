import { useEffect, useRef, useState } from "react";
import styles from "./style.module.scss";
import { Avatar, Dropdown, Image, Typography } from "antd";
import ModalCreateChannel from "../../ModalCreateChannel";
import { Link, useNavigate } from "react-router-dom";
import type { MenuProps } from "antd";
import { useSelector } from "react-redux";
import { AppDispatch, IRootState } from "../../../redux/store";
import { Channel, User } from "../../../interfaces/interfaces";
import { UserOutlined } from "@ant-design/icons";
import { getDataFromLocalStorage } from "../../../utils/localStorage";
import { useDispatch } from "react-redux";
import { getChannelById } from "../../../redux/actions/chatActions";
import { logout } from "../../../redux/actions/userActions";
import { toast } from "react-toastify";
import { Socket, io } from "socket.io-client";

interface NavigateProps {
  channelId: string;
}
function ChannelDetail({ channelId }: NavigateProps) {
  const URL_SERVER = import.meta.env.VITE_URL_SERVER;
  const navigate = useNavigate();
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
        <div className={styles["menu-item"]}>
          <i className={`material-icons ${styles["menu-user-icon"]}`}>
            account_circle
          </i>
          <Typography.Text className={styles["menu-user-text"]}>
            {" "}
            My Profile
          </Typography.Text>
        </div>
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

  const { user } =
    (useSelector((state: IRootState) => state.userReducer.userInfo) as {
      user?: User;
    }) || {};

  const selectedChannelId: string =
    getDataFromLocalStorage("selectedChannelId");

  const useAppDispatch: () => AppDispatch = useDispatch;
  const dispatch = useAppDispatch();

  const socket = useRef<Socket | null>(null);
  socket.current = io(`${URL_SERVER}`);

  useEffect(() => {
    dispatch(getChannelById(selectedChannelId));
  }, [dispatch, channelId, selectedChannelId]);

  const { selectedChannel } =
    (useSelector((state: IRootState) => state.chatReducer) as {
      selectedChannel: Channel;
    }) || null;

  const members = selectedChannel?.members?.slice().reverse() || [];

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <i
            className={`material-icons ${styles["header-back-arrow"]}`}
            onClick={() => navigate("/chat")}
          >
            arrow_back_ios_new
          </i>
          <Typography.Text
            className={styles["header-title"]}
            onClick={() => navigate("/chat")}
          >
            All channels
          </Typography.Text>
        </div>
        <div className={styles.body}>
          <div className={styles.channel}>
            <Typography.Text className={styles["channel-heading"]}>
              {selectedChannel?.name}
            </Typography.Text>
            <Typography.Text className={styles["channel-desc"]}>
              {selectedChannel?.description}
            </Typography.Text>
            <Typography.Text className={styles["channel-member"]}>
              {selectedChannel?.name != "welcome" && "Members"}
            </Typography.Text>
            {selectedChannel?.name != "welcome" &&
              members.map((member: User, index) => (
                <div className={styles["channel-container"]} key={index}>
                  <div className={styles["channel-avatar"]}>
                    {member?.avatar != "" ? (
                      <Image
                        src={member?.avatar}
                        style={{
                          width: 42,
                          height: 42,
                        }}
                        alt="user-avatar"
                        preview={false}
                        className={styles["channel-user-avatar"]}
                      />
                    ) : (
                      <Avatar
                        size={42}
                        icon={<UserOutlined />}
                        shape="square"
                        className={styles["user-avatar-default"]}
                      />
                    )}
                  </div>
                  <Typography.Text className={styles["channel-name"]}>
                    {member?.name}
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

export default ChannelDetail;

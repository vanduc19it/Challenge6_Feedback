import { useState } from "react";
import styles from "./style.module.scss";
import { Avatar, Dropdown, Image, Typography } from "antd";
import type { MenuProps } from "antd";
import logo from "../../assets/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { AppDispatch, IRootState } from "../../redux/store";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/actions/userActions";
import { User } from "../../interfaces/interfaces";
import { useSelector } from "react-redux";
import { UserOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

function Header() {
  const { user } =
    (useSelector((state: IRootState) => state.userReducer.userInfo) as {
      user?: User;
    }) || {};

  const navigate = useNavigate();
  const useAppDispatch: () => AppDispatch = useDispatch;
  const dispatch = useAppDispatch();
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
              Group Chat
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

  const arrowIcon: string = isOpen ? "arrow_drop_up" : "arrow_drop_down";
  return (
    <div className={styles.header}>
      <Image
        src={logo}
        style={{
          width: 130,
          height: 18,
        }}
        alt="logo"
        preview={false}
        className={styles["header-logo"]}
      />
      <div className={styles["user-info"]}>
        {user?.avatar != "" ? (
          <Image
            src={user?.avatar}
            style={{
              width: 32,
              height: 32,
            }}
            alt="user-avatar"
            preview={false}
            className={styles["user-avatar"]}
          />
        ) : (
          <Avatar
            size={32}
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
        >
          <span className={styles["user-name"]}>
            {user?.name}
            <i className={`material-icons ${styles["user-icon"]}`}>
              {arrowIcon}
            </i>
          </span>
        </Dropdown>
      </div>
    </div>
  );
}

export default Header;

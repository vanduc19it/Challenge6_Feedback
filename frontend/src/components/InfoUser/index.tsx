import styles from "./style.module.scss";
import { Avatar, Button, Divider, Image, Typography } from "antd";
import HelmetComponent from "../Helmet";
import { useSelector } from "react-redux";
import { IRootState } from "../../redux/store";
import { UserOutlined } from "@ant-design/icons";

interface InfoUserProps {
  onEdit: () => void;
}

interface User {
  avatar: string;
  bio: string;
  email: string;
  name: string;
  phone: string;
}
function InfoUser({ onEdit }: InfoUserProps) {
  const { user } =
    (useSelector((state: IRootState) => state.userReducer.userInfo) as {
      user?: User;
    }) || {};

  return (
    <>
      <HelmetComponent children="Profile" />
      <div className={styles.body}>
        <Typography.Text className={styles["profile-heading"]}>
          Personal info
        </Typography.Text>
        <Typography.Text className={styles["profile-desc"]}>
          Basic info, like your name and photo
        </Typography.Text>
        <div className={styles["profile-card"]}>
          <div className={styles["profile-container"]}>
            <div className={styles["profile-header"]}>
              <Typography.Text className={styles["profile-text"]}>
                Profile
              </Typography.Text>
              <Typography.Text className={styles["profile-content"]}>
                Some info may be visible to other people
              </Typography.Text>
            </div>
            <Button className={styles["profile-btn-edit"]} onClick={onEdit}>
              Edit
            </Button>
          </div>
          <Divider className={styles.divider} />
          <div className={styles["profile-group-image"]}>
            <Typography.Text className={styles["profile-title"]}>
              PHOTO
            </Typography.Text>
            <div className={styles["profile-image"]}>
              {user?.avatar != "" ? (
                <Image
                  src={user?.avatar}
                  style={{
                    width: 72,
                    height: 72,
                  }}
                  alt="profile image"
                  preview={false}
                />
              ) : (
                <Avatar
                  size={72}
                  icon={<UserOutlined />}
                  shape="square"
                  className={styles["user-avatar-default"]}
                />
              )}
            </div>
          </div>

          <div className={styles["profile-group"]}>
            <Typography.Text className={styles["profile-title"]}>
              NAME
            </Typography.Text>
            <Typography.Text className={styles["profile-info"]}>
              {user?.name}
            </Typography.Text>
          </div>

          <div className={styles["profile-group"]}>
            <Typography.Text className={styles["profile-title"]}>
              BIO
            </Typography.Text>
            <Typography.Text className={styles["profile-info"]}>
              {user?.bio}
            </Typography.Text>
          </div>

          <div className={styles["profile-group"]}>
            <Typography.Text className={styles["profile-title"]}>
              PHONE
            </Typography.Text>
            <Typography.Text className={styles["profile-info"]}>
              {user?.phone}
            </Typography.Text>
          </div>

          <div className={styles["profile-group"]}>
            <Typography.Text className={styles["profile-title"]}>
              EMAIL
            </Typography.Text>
            <Typography.Text className={styles["profile-info"]}>
              {user?.email}
            </Typography.Text>
          </div>

          <div className={styles["profile-group"]}>
            <Typography.Text className={styles["profile-title"]}>
              PASSWORD
            </Typography.Text>
            <Typography.Text className={styles["profile-info"]}>
              ************
            </Typography.Text>
          </div>
        </div>
      </div>
    </>
  );
}

export default InfoUser;

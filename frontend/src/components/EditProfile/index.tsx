import styles from "./style.module.scss";
import { Button, Image, Input, Typography, Upload } from "antd";
import HelmetComponent from "../Helmet";
import { useSelector } from "react-redux";
import { AppDispatch, IRootState } from "../../redux/store";
import { useState } from "react";
import {
  validateBio,
  validateEditProfilePassword,
  validateName,
  validatePhone,
} from "../../utils/validations";
import { toast } from "react-toastify";
import { editProfile } from "../../redux/actions/userActions";
import { useDispatch } from "react-redux";
import { UploadFile } from "antd/lib/upload/interface";
import { User } from "../../interfaces/interfaces";

interface InfoUserProps {
  onEdit: () => void;
}
function EditProfile({ onEdit }: InfoUserProps) {
  const { user } =
    (useSelector((state: IRootState) => state.userReducer.userInfo) as {
      user?: User;
    }) || {};

  const [name, setName] = useState<string>(user?.name || "");
  const [bio, setBio] = useState<string>(user?.bio || "");
  const [phone, setPhone] = useState<string>(user?.phone || "");
  const [password, setPassword] = useState<string>("");
  const [avatar, setAvatar] = useState<string>(user?.avatar || "");

  const [nameError, setNameError] = useState<string | null>(null);
  const [bioError, setBioError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  interface UploadChangeEvent {
    file: UploadFile;
  }

  const [file, setFile] = useState<File | null>(null);

  const handleUploadAvatar = async (event: UploadChangeEvent) => {
    const uploadedFile = event.file.originFileObj as File;
    if (uploadedFile) {
      const imageUrl = URL.createObjectURL(uploadedFile);
      setAvatar(imageUrl);
      setFile(uploadedFile);
    }
  };

  const useAppDispatch: () => AppDispatch = useDispatch;
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleEditProfile = async () => {
    setIsLoading(true);
    try {
      setNameError(null);
      setBioError(null);
      setPhoneError(null);
      setPasswordError(null);
      const nameValidationError = validateName(name);
      const bioValidationError = validateBio(bio);
      const phoneValidationError = validatePhone(phone);
      const passwordValidationError = validateEditProfilePassword(password);
      if (
        nameValidationError ||
        bioValidationError ||
        phoneValidationError ||
        passwordValidationError
      ) {
        setNameError(nameValidationError);
        setBioError(bioValidationError);
        setPhoneError(phoneValidationError);
        setPasswordError(passwordValidationError);
        return;
      }
      const formData = new FormData();
      let newAvatar: string = "";
      if (file) {
        formData.append("file", file);
        formData.append("upload_preset", "db1kgikl");
        const CLOUDINARY_URL: string = import.meta.env.VITE_CLOUDINARY_URL;
        try {
          const response = await fetch(CLOUDINARY_URL, {
            method: "POST",
            body: formData,
          });
          const data = await response.json();
          newAvatar = data.secure_url;
        } catch (error) {
          console.error("Error upload avatar:", error);
        }
      }
      const infoEdit = {
        avatar: newAvatar != "" ? newAvatar : user?.avatar || "",
        name,
        bio,
        phone,
        password,
      };

      await dispatch(editProfile(infoEdit));
      setIsLoading(false);
      toast.success("Edit profile successfully!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      onEdit();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const iconEye = showPassword ? "visibility" : "visibility_off";

  return (
    <>
      <HelmetComponent children="EditProfile" />
      <div className={styles.body}>
        <div className={styles.navigation} onClick={onEdit}>
          <i className={`material-icons ${styles["back-arrow"]}`}>
            arrow_back_ios_new
          </i>
          <Typography.Text className={styles["back-text"]}>
            Back
          </Typography.Text>
        </div>
        <div className={styles["profile-card"]}>
          <div className={styles["profile-container"]}>
            <div className={styles["profile-header"]}>
              <Typography.Text className={styles["profile-text"]}>
                Change Info
              </Typography.Text>
              <Typography.Text className={styles["profile-content"]}>
                Changes will be reflected to every services
              </Typography.Text>
            </div>
          </div>

          <div className={styles["profile-group-image"]}>
            <Upload
              accept="image/svg+xml,image/png,image/jpeg"
              showUploadList={false}
              multiple={false}
              onChange={handleUploadAvatar}
              customRequest={() => {}}
            >
              <div className={styles["profile-image"]}>
                {avatar != "" && (
                  <Image
                    src={avatar}
                    style={{
                      width: 72,
                      height: 72,
                    }}
                    alt="profile image"
                    preview={false}
                  />
                )}

                <i
                  className={`material-icons ${styles["profile-camera-icon"]}`}
                >
                  photo_camera
                </i>
              </div>
            </Upload>
            <Upload
              accept="image/svg+xml,image/png,image/jpeg"
              showUploadList={false}
              multiple={false}
              onChange={handleUploadAvatar}
            >
              <Typography.Text className={styles["profile-change-image"]}>
                CHANGE PHOTO
              </Typography.Text>
            </Upload>
          </div>

          <div className={styles["profile-group"]}>
            <Typography.Text className={styles["profile-title"]}>
              Name
            </Typography.Text>
            <Input
              placeholder="Enter your name..."
              className={styles["profile-input"]}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {nameError && (
              <Typography.Text className={styles["profile-text-error"]}>
                {nameError}
              </Typography.Text>
            )}
          </div>
          <div className={styles["profile-group"]}>
            <Typography.Text className={styles["profile-title"]}>
              Bio
            </Typography.Text>
            <Input
              placeholder="Enter your bio..."
              className={`${styles["profile-input"]} ${styles["profile-input-bio"]}`}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
            {bioError && (
              <Typography.Text className={styles["profile-text-error"]}>
                {bioError}
              </Typography.Text>
            )}
          </div>
          <div className={styles["profile-group"]}>
            <Typography.Text className={styles["profile-title"]}>
              Phone
            </Typography.Text>
            <Input
              placeholder="Enter your phone..."
              className={styles["profile-input"]}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            {phoneError && (
              <Typography.Text className={styles["profile-text-error"]}>
                {phoneError}
              </Typography.Text>
            )}
          </div>
          <div className={styles["profile-group"]}>
            <Typography.Text className={styles["profile-title"]}>
              Email
            </Typography.Text>
            <Input
              disabled
              placeholder="Enter your email..."
              className={styles["profile-input"]}
              value={user?.email}
            />
          </div>
          <div className={styles["profile-group"]}>
            <Typography.Text className={styles["profile-title"]}>
              Password
            </Typography.Text>
            <Input
              type={showPassword ? "text" : "password"}
              status={passwordError ? "error" : ""}
              placeholder="Enter your new password..."
              className={styles["profile-input"]}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              suffix={
                <i
                  className={`material-icons ${styles["profile-icon-eye"]}`}
                  onClick={handleShowPassword}
                  style={{ cursor: "pointer" }}
                >
                  {iconEye}
                </i>
              }
            />
            {passwordError && (
              <Typography.Text className={styles["profile-text-error"]}>
                {passwordError}
              </Typography.Text>
            )}
          </div>
          <div className={styles["profile-group"]}>
            <Button
              className={styles["profile-btn-save"]}
              onClick={handleEditProfile}
            >
              {isLoading ? "Saving" : "Save"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditProfile;

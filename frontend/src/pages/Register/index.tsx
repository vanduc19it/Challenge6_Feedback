import { Button, Image, Input, Typography } from "antd";
import { useState } from "react";
import styles from "./style.module.scss";
import logo from "../../assets/images/logo.png";
import {
  FacebookFilled,
  GithubFilled,
  GoogleOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import axios from "axios";

import { toast } from "react-toastify";
import HelmetComponent from "../../components/Helmet";
import {
  validateEmail,
  validateRegisterPassword,
} from "../../utils/validations";
import { EMAIL_ALREADY_EXISTS } from "../../utils/constants";
import { AppDispatch } from "../../redux/store";
import { useDispatch } from "react-redux";
import { register } from "../../redux/actions/userActions";

function RegisterPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const navigate = useNavigate();
  const useAppDispatch: () => AppDispatch = useDispatch;
  const dispatch = useAppDispatch();

  const handleRegisterUser = async () => {
    try {
      setEmailError(null);
      setPasswordError(null);
      const emailValidationError = validateEmail(email);
      const passwordValidationError = validateRegisterPassword(password);

      if (emailValidationError || passwordValidationError) {
        setEmailError(emailValidationError);
        setPasswordError(passwordValidationError);
        return;
      }

      await dispatch(register(email, password));

      toast.success("Registration successfully", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate("/profile", { state: { isEditingProfile: true } });
    } catch (error) {
      if (
        axios.isAxiosError(error) &&
        error.response &&
        error.response.status === 422
      ) {
        setEmailError(EMAIL_ALREADY_EXISTS);
      } else {
        toast.error("Registration error", {
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
    }
  };

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const iconEye = showPassword ? "visibility" : "visibility_off";

  return (
    <>
      <HelmetComponent children="Register" />
      <div className={styles.container}>
        <div className={styles.card}>
          <Image
            src={logo}
            style={{
              width: 130,
              height: 18,
            }}
            alt="card image"
            preview={false}
            className={styles["card-image"]}
          />
          <Typography.Text className={styles["card-title"]}>
            Join thousands of learners from around the world
          </Typography.Text>
          <Typography.Text className={styles["card-desc"]}>
            Master web development by making real-life projects. There are
            multiple paths for you to choose
          </Typography.Text>

          <Input
            placeholder="Email"
            status={emailError ? "error" : ""}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleRegisterUser();
              }
            }}
            prefix={
              <i className={`material-icons ${styles["card-icon-mail"]}`}>
                mail
              </i>
            }
            className={styles["card-input"]}
          />
          {emailError && (
            <Typography.Text className={styles["card-text-error"]}>
              {emailError}
            </Typography.Text>
          )}
          <Input
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            status={passwordError ? "error" : ""}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleRegisterUser();
              }
            }}
            prefix={
              <i className={`material-icons ${styles["card-icon-password"]}`}>
                lock
              </i>
            }
            suffix={
              <i
                className={`material-icons ${styles["card-icon-eye"]}`}
                onClick={handleShowPassword}
                style={{ cursor: "pointer" }}
              >
                {iconEye}
              </i>
            }
            className={styles["card-input"]}
          />
          {passwordError && (
            <Typography.Text className={styles["card-text-error"]}>
              {passwordError}
            </Typography.Text>
          )}
          <Button
            className={styles["card-button-register"]}
            onClick={handleRegisterUser}
          >
            Start coding now
          </Button>

          <Typography.Text className={styles["card-text"]}>
            or continue with these social profile
          </Typography.Text>

          <div className={styles["card-icon-group"]}>
            <div className={styles["card-icon-container"]}>
              <GoogleOutlined className={styles["card-icon-social"]} />
            </div>
            <div className={styles["card-icon-container"]}>
              <FacebookFilled className={styles["card-icon-social"]} />
            </div>
            <div className={styles["card-icon-container"]}>
              <TwitterOutlined
                width={30}
                height={30}
                className={styles["card-icon-social"]}
              />
            </div>
            <div className={styles["card-icon-container"]}>
              <GithubFilled className={styles["card-icon-social"]} />
            </div>
          </div>
          <div className={styles["card-text-group"]}>
            <Typography.Text className={styles["card-text"]}>
              Adready a member?{" "}
              <Link to="/login">
                <span className={styles["card-link"]}>Login</span>
              </Link>
            </Typography.Text>
          </div>
        </div>
        <div className={styles.footer}>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default RegisterPage;

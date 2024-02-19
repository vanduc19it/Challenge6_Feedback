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
import { validateEmail, validateLoginPassword } from "../../utils/validations";
import { toast } from "react-toastify";
import HelmetComponent from "../../components/Helmet";
import { EMAIL_NOT_FOUND, INCORRECT_PASSWORD } from "../../utils/constants";
import { login } from "../../redux/actions/userActions";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const navigate = useNavigate();

  const useAppDispatch: () => AppDispatch = useDispatch;
  const dispatch = useAppDispatch();

  const handleLoginUser = async () => {
    try {
      setEmailError(null);
      setPasswordError(null);
      const emailValidationError = validateEmail(email);
      const passwordValidationError = validateLoginPassword(password);

      if (emailValidationError || passwordValidationError) {
        setEmailError(emailValidationError);
        setPasswordError(passwordValidationError);
        return;
      }
      await dispatch(login(email, password));
      toast.success("Login successfully!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate("/profile");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 404) {
          setEmailError(EMAIL_NOT_FOUND);
        } else if (error.response.status === 400)
          setPasswordError(INCORRECT_PASSWORD);
      } else {
        toast.error("Login error!", {
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
      <HelmetComponent children="Login" />
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
            Login
          </Typography.Text>

          <Input
            placeholder="Email"
            status={emailError ? "error" : ""}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleLoginUser();
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
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleLoginUser();
              }
            }}
            onChange={(e) => setPassword(e.target.value)}
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
            onClick={handleLoginUser}
          >
            Login
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
              Don't have an account yet?{" "}
              <Link to="/register">
                <span className={styles["card-link"]}>Register</span>
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

export default LoginPage;

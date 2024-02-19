import styles from "./style.module.scss";
import { Typography } from "antd";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <div className={styles["footer-info"]}>
      <Typography.Text className={styles["footer-text"]}>
        created by{" "}
        <Link
          to="https://github.com/vanduc19it"
          className={styles["footer-author-link"]}
        >
          <span className={styles["footer-author"]}>vanduc19it </span>
        </Link>
      </Typography.Text>
      <Typography.Text className={styles["footer-text"]}>
        devChallenges.io
      </Typography.Text>
    </div>
  );
}

export default Footer;

import styles from "./style.module.scss";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import InfoUser from "../../components/InfoUser";
import EditProfile from "../../components/EditProfile";
import { useState } from "react";
import { useLocation } from "react-router-dom";

function ProfilePage() {
  const location = useLocation();
  const [isEditingProfile, setIsEditingProfile] = useState<boolean>(
    location.state?.isEditingProfile || false
  );

  const handleEditButtonClick = () => {
    setIsEditingProfile(true);
  };

  const handleSaveButtonClick = () => {
    setIsEditingProfile(false);
  };

  return (
    <div className={styles.container}>
      <Header />
      {isEditingProfile ? (
        <EditProfile onEdit={handleSaveButtonClick} />
      ) : (
        <InfoUser onEdit={handleEditButtonClick} />
      )}
      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
}

export default ProfilePage;

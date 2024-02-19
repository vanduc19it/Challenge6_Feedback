import styles from "./style.module.scss";
import SideBar from "../../components/Sidebar";
import ChatScreen from "../../components/ChatScreen";
import HelmetComponent from "../../components/Helmet";
import { AppDispatch } from "../../redux/store";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllUser } from "../../redux/actions/userActions";
function ChatRoom() {
  const useAppDispatch: () => AppDispatch = useDispatch;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllUser());
  }, []);

  return (
    <>
      <HelmetComponent children="Group chat" />
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <SideBar />
        </div>
        <div className={styles.message}>
          <ChatScreen />
        </div>
      </div>
    </>
  );
}

export default ChatRoom;

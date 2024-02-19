import { useEffect, useState } from "react";
import AllChannels from "./AllChannels";
import ChannelDetail from "./ChannelDetail";
import { useParams } from "react-router-dom";
import { AppDispatch } from "../../redux/store";
import { useDispatch } from "react-redux";
import { getAllChannels } from "../../redux/actions/chatActions";

function SideBar() {
  const { channelName } = useParams();
  const [selectedChannelId, setSelectedChannelId] = useState<string>("");

  const handleNavigateChannelDetail = (channelId: string) => {
    setSelectedChannelId(channelId);
  };

  const useAppDispatch: () => AppDispatch = useDispatch;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllChannels());
  }, [dispatch]);
  return (
    <>
      {!channelName ? (
        <AllChannels onNavigate={handleNavigateChannelDetail} />
      ) : (
        <ChannelDetail channelId={selectedChannelId} />
      )}
    </>
  );
}

export default SideBar;

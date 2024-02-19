import { Avatar, Button, Input, Modal, Select, Spin, Typography } from "antd";
import styles from "./style.module.scss";
import { useMemo, useState } from "react";
import { AppDispatch, IRootState } from "../../redux/store";
import { useDispatch } from "react-redux";
import { createChannel } from "../../redux/actions/chatActions";
import { toast } from "react-toastify";
import {
  validateChannelDesc,
  validateChannelName,
} from "../../utils/validations";
import axios from "axios";
import { CHANNEL_ALREADY_EXISTS } from "../../utils/constants";
import TextArea from "antd/es/input/TextArea";
import { useSelector } from "react-redux";
import { debounce } from "lodash";

interface ModalCreateChannelProps {
  isModalOpen: boolean;
  showModal: () => void;
  handleOk: () => void;
  handleCancel: () => void;
}

function ModalCreateChannel({
  isModalOpen,
  handleOk,
  handleCancel,
}: ModalCreateChannelProps) {
  const [nameChannel, setNameChannel] = useState<string>("");
  const [descChannel, setDescChannel] = useState<string>("");

  const [nameChannelError, setNameChannelError] = useState<string | null>(null);
  const [descChannelError, setDescChannelError] = useState<string | null>(null);

  const [inviteMember, setInviteMember] = useState<string[]>([]);

  const useAppDispatch: () => AppDispatch = useDispatch;
  const dispatch = useAppDispatch();
  const handleCreateChannel = async () => {
    try {
      setNameChannelError(null);
      setDescChannelError(null);
      const nameValidationError = validateChannelName(nameChannel);
      const descValidationError = validateChannelDesc(descChannel);
      if (nameValidationError || descValidationError) {
        setNameChannelError(nameValidationError);
        setDescChannelError(descValidationError);
        return;
      }
      await dispatch(createChannel(nameChannel, descChannel, inviteMember));
      handleCancel();
      toast.success("Create channel successfully!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setNameChannel("");
      setDescChannel("");
      setInviteMember([]);
    } catch (error) {
      if (
        axios.isAxiosError(error) &&
        error.response &&
        error.response.status === 422
      ) {
        setNameChannelError(CHANNEL_ALREADY_EXISTS);
      } else {
        toast.error("Create channel fail!", {
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

  const { user } =
    (useSelector((state: IRootState) => state.userReducer.userInfo) as {
      user?: User;
    }) || {};

  interface User {
    _id: string;
    name: string;
    avatar: string;
  }

  const { users } =
    (useSelector((state: IRootState) => state.userReducer) as {
      users?: User[];
    }) || [];

  const [options, setOptions] = useState<User[]>([]);
  const [fetching, setFetching] = useState(false);

  const debounceFetcher = useMemo(() => {
    return debounce((value: string) => {
      setFetching(true);

      if (users && user) {
        const listUser = users.filter((u) => u._id !== user?._id);
        const filteredUsers = listUser.filter((user) =>
          user.name.toLowerCase().includes(value.toLowerCase())
        );
        setOptions(filteredUsers);
        setFetching(false);
      } else {
        setOptions([]);
        setFetching(false);
      }
    }, 300);
  }, [users, user]);

  return (
    <>
      <Modal
        className={styles.modal}
        footer={null}
        closable={false}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Typography.Text className={styles["modal-title"]}>
          New Channel
        </Typography.Text>
        <Input
          placeholder="Channel name"
          status={nameChannelError ? "error" : ""}
          className={styles["modal-channel-name"]}
          value={nameChannel}
          onChange={(e) => setNameChannel(e.target.value)}
        />
        {nameChannelError && (
          <Typography.Text className={styles["modal-text-error"]}>
            {nameChannelError}
          </Typography.Text>
        )}
        <TextArea
          placeholder="Channel Description"
          status={descChannelError ? "error" : ""}
          className={styles["modal-channel-desc"]}
          value={descChannel}
          onChange={(e) => setDescChannel(e.target.value)}
        />
        {descChannelError && (
          <Typography.Text className={styles["modal-text-error"]}>
            {descChannelError}
          </Typography.Text>
        )}
        <Select
          mode="multiple"
          labelInValue
          showSearch
          filterOption={false}
          onSearch={debounceFetcher}
          notFoundContent={fetching ? <Spin size="small" /> : null}
          style={{ width: "100%" }}
          placeholder="Add Members"
          optionLabelProp="label"
          onSelect={(value) => {
            setInviteMember((prev) => [...prev, value.value]);
          }}
          className={styles["modal-select"]}
        >
          {options.map((opt) => (
            <Select.Option
              key={opt._id}
              value={opt._id}
              label={opt.name}
              className={styles["modal-select-option"]}
            >
              <Avatar size="small" src={opt.avatar} shape="square" />
              {` ${opt.name}`}
            </Select.Option>
          ))}
        </Select>
        <div className={styles["modal-btn-container"]}>
          <Button
            className={styles["modal-btn-save"]}
            onClick={handleCreateChannel}
          >
            Save
          </Button>
        </div>
      </Modal>
    </>
  );
}

export default ModalCreateChannel;

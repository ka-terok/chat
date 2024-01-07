import Stack from "@mui/material/Stack";
import Card from "./Card";
import {
  useGetCurrentRoomId,
  useGetSession,
  useGetShowAuthModal,
} from "reducer/info/selectors";
import { useGetUser } from "reducer/user/selectors";
import { useNavigate } from "react-router-dom";
import { useActions } from "hooks/useActions";
import ModalAuth from "features/ModalAuth";
import { rooms } from "lib/constants/rooms";
import { memo, useCallback } from "react";

const HomePage = () => {
  const { updateInfoField } = useActions();
  const session = useGetSession();
  const user = useGetUser();
  const navigate = useNavigate();
  const currentRoomId = useGetCurrentRoomId();
  const open = useGetShowAuthModal();

  const handleClickOnRoom = (id: number) => {
    if (session && user?.id) {
      return navigate(`/${id}`);
    }

    updateInfoField({ name: "currentRoomId", value: id });
    updateInfoField({ name: "showAuthModal", value: true });
  };

  const handleClose = useCallback(
    () => updateInfoField({ name: "showAuthModal", value: false }),
    [updateInfoField]
  );

  return (
    <div className="container__home">
      <ModalAuth
        open={open}
        handleClose={handleClose}
        currentRoomId={currentRoomId}
      />
      <div className="stack__title">Выберите комнату</div>
      <Stack spacing={2}>
        {rooms?.map((elem) => (
          <Card
            key={elem.id}
            elem={elem}
            handleClickOnRoom={handleClickOnRoom}
          />
        ))}
      </Stack>
    </div>
  );
};

export default memo(HomePage);

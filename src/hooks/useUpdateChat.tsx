import { useEffect, useRef } from "react";
import { useActions } from "./useActions";
import { useParams } from "react-router-dom";
import {
  clearRoomIsUpdatedUserIds,
  getRoom,
  updateRoomIsUpdatedUserIds,
} from "lib";
import { useScroll } from "./useScroll";
import { useGetUser } from "reducer/user/selectors";

export const useUpdateChat = () => {
  const { clearRoom, loadMessages } = useActions();
  const interval = useRef<null | number>(null);
  const { id } = useParams();
  const { scrollDown } = useScroll();
  const user = useGetUser();

  useEffect(() => {
    update(scrollDown, true);

    if (interval.current) {
      clearInterval(interval.current);
    }

    interval.current = window.setInterval(() => update(), 5000);

    return () => {
      clearRoom();
      clearInterval(interval.current);
      clearRoomIsUpdatedUserIds(Number(id));
    };
  }, []);

  const update = (callback?: () => void, isFirstLoad?: boolean) => {
    const room = getRoom(Number(id));
    const shoulUpdateList =
      isFirstLoad ?? (!!room && !room.isUpdatedUserIds.includes(user?.id));

    if (shoulUpdateList) {
      loadMessages(room.messages);
      updateRoomIsUpdatedUserIds(room.id, user?.id);
    }

    if (callback) {
      callback();
    }
  };
};

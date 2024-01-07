import { getRandomInt, getRooms, setItemLocalStorage } from "lib";
import { useEffect } from "react";
import { useActions } from "./useActions";
import { useGetSession } from "reducer/info/selectors";
import { InfoState } from "reducer/info/info.slice";
import { ROOMS, initialRooms } from "lib/constants/rooms";

export const useInitialApp = () => {
  const { updateInfoField } = useActions();
  const session = useGetSession();

  useEffect(() => {
    const id: number = getRandomInt();

    const sessionStorageId = session || id;

    const data: { name: keyof InfoState; value: InfoState[keyof InfoState] } = {
      name: "session",
      value: sessionStorageId,
    };

    sessionStorage.id = sessionStorageId;

    updateInfoField(data);
  }, [session, updateInfoField]);

  useEffect(() => {
    const initRooms = () => {
      const rooms = getRooms();

      if (
        initialRooms.every((room) => rooms.some((elem) => elem.id === room?.id))
      ) {
        return;
      }

      setItemLocalStorage(ROOMS, initialRooms);
    };

    initRooms();
  }, []);
};

import { ROOMS } from "lib/constants/rooms";
import { getItemLocalStorage, setItemLocalStorage } from "lib/helpers";
import { IMessage, IRoom } from "models/models";

export const getRooms = (): IRoom[] => {
  const localStorage = getItemLocalStorage(ROOMS);

  const rooms: IRoom[] =
    localStorage && Array.isArray(localStorage)
      ? (localStorage as IRoom[])
      : [];

  return rooms;
};

export const getRoom = (id: number): IRoom => {
  const rooms = getRooms();

  return rooms?.find((room: IRoom) => Number(room.id) === id) ?? null;
};

export const addMessage = (
  id: number,
  messages: IMessage[],
  message: IMessage
) => {
  const rooms = getRooms();

  const newRooms = rooms.map((room: IRoom) =>
    Number(id) === Number(room.id)
      ? {
          ...room,
          messages: [...messages, message],
        }
      : room
  );

  setItemLocalStorage(ROOMS, newRooms);
};

export const updateMessage = (
  id: number,
  messages: IMessage[],
  message: IMessage
) => {
  const rooms = getRooms();

  const newMessages = messages?.map((elem) =>
    Number(elem.id) === Number(message.id) ? { ...elem, ...message } : elem
  );

  const newRooms = rooms.map((room: IRoom) =>
    Number(id) === Number(room.id)
      ? {
          ...room,
          messages: newMessages,
        }
      : room
  );

  setItemLocalStorage(ROOMS, newRooms);
};

export const updateRoomIsUpdatedUserIds = (id: number, useId: number) => {
  const rooms = getRooms();

  const newRooms = rooms.map((room: IRoom) =>
    Number(id) === Number(room.id)
      ? {
          ...room,
          isUpdatedUserIds: Array.from(
            new Set(room.isUpdatedUserIds).add(useId)
          ),
        }
      : room
  );

  setItemLocalStorage(ROOMS, newRooms);
};

export const clearRoomIsUpdatedUserIds = (id: number) => {
  const rooms = getRooms();

  const newRooms = rooms.map((room: IRoom) =>
    Number(id) === Number(room.id)
      ? {
          ...room,
          isUpdatedUserIds: [],
        }
      : room
  );

  setItemLocalStorage(ROOMS, newRooms);
};

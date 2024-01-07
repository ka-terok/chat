import { IRoom, IShortRoom } from "models/models";

export const ROOMS = "rooms";

export const rooms: IShortRoom[] = [
  { id: 1, name: "Комната 1" },
  { id: 2, name: "Комната 2" },
  { id: 3, name: "Комната 3" },
  { id: 4, name: "Комната 4" },
  { id: 5, name: "Комната 5" },
  { id: 6, name: "Комната 6" },
];

export const initialRooms: IRoom[] = rooms?.map(({ id }) => ({
  id,
  messages: [],
  isUpdatedUserIds: [],
}));

import { useParams } from "react-router-dom";
import { useGetMessages } from "../reducer/room/selectors";
import { addMessage as add, clearRoomIsUpdatedUserIds } from "../lib";
import { IMessage } from "models/models";
import { useActions } from "./useActions";

export const useAddMessage = () => {
  const { addMessage: _add } = useActions();
  const { id } = useParams();
  const messages = useGetMessages();

  const addMessage = (message: IMessage) => {
    _add(message);
    add(Number(id), messages, message);
    clearRoomIsUpdatedUserIds(Number(id));
  };

  return addMessage;
};

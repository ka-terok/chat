import { shallowEqual, useSelector } from "react-redux";
import { RootState } from "../store";
import { IMessage } from "models/models";

export const useGetMessages = () =>
  useSelector((state: RootState) => state.room.messages, shallowEqual);

export const useGetParent = () =>
  useSelector((state: RootState) => state?.room?.parent);

export const getMessage = (
  messages: IMessage[],
  messageId: number
): IMessage | null =>
  messages?.find((elem) => Number(elem.id) === messageId) ?? null;

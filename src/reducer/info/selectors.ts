import { useSelector } from "react-redux";
import { RootState } from "../store";

export const useGetSession = () =>
  useSelector((state: RootState) => state?.info?.session);

export const useGetShowAuthModal = () =>
  useSelector((state: RootState) => state?.info?.showAuthModal);

export const useGetCurrentRoomId = () =>
  useSelector((state: RootState) => state?.info?.currentRoomId);

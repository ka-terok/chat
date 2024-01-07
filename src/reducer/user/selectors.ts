import { useSelector } from "react-redux";
import { RootState } from "../store";

export const useGetUser = () => useSelector((state: RootState) => state?.user);

import { useActions } from "./useActions";
import { useGetSession } from "../reducer/info/selectors";
import { useEffect } from "react";
import { useGetUser } from "../reducer/user/selectors";
import { useNavigate, useParams } from "react-router-dom";

export const useAuth = () => {
  const navigate = useNavigate();
  const { updateInfoField } = useActions();
  const session = useGetSession();
  const user = useGetUser();
  const { id } = useParams();

  useEffect(() => {
    const shouldAuth = (!session || !user?.id) && !!id;

    if (shouldAuth) {
      navigate("/");
      updateInfoField({ name: "currentRoomId", value: Number(id) });
      updateInfoField({ name: "showAuthModal", value: true });
    }
  }, [session, user, id]);
};

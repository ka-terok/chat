import { FC, FormEvent, memo, useMemo, useState } from "react";
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Modal,
  OutlinedInput,
  TextField,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useActions } from "hooks/useActions";
import { useNavigate } from "react-router-dom";
import { useGetUser } from "reducer/user/selectors";
import { isEmptyStr, getRandomInt } from "lib";

interface Component {
  open: boolean;
  handleClose: () => void;
  currentRoomId: number;
}

const ModalAuth: FC<Component> = ({ open, handleClose, currentRoomId }) => {
  const title = "Авторизация";
  const { updateUserFields } = useActions();
  const user = useGetUser();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [alias, setAlias] = useState<string>("");

  const disabled = useMemo(() => {
    const isEmptyLogin = isEmptyStr(login);
    const isEmptyPassword = isEmptyStr(password);
    const isEmptyAlias = isEmptyStr(alias);
    const isInvalidLogin = password?.length < 4;
    const isInvalidPassword = password?.length < 6;
    const isInvalidAlias = password?.length < 4;

    return (
      isEmptyLogin ||
      isEmptyPassword ||
      isEmptyAlias ||
      isInvalidLogin ||
      isInvalidPassword ||
      isInvalidAlias
    );
  }, [login, password, alias]);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const id: number = user?.id || getRandomInt();

    const data = { login, password, alias, id };

    if (!user?.id) {
      updateUserFields(data);
    }

    sessionStorage.user = JSON.stringify(data);

    handleClose();
    navigate(`/${currentRoomId}`);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div className="modal-container__body">
        <div className="modal-container__title">{title}</div>
        <form onSubmit={onSubmit}>
          <TextField
            required
            id="login"
            label="Логин"
            className="input"
            defaultValue={login}
            maxRows={150}
            onChange={(e) => setLogin(e.target.value)}
          />
          <TextField
            required
            id="alias"
            label="Ник"
            defaultValue={alias}
            maxRows={150}
            onChange={(e) => setAlias(e.target.value)}
            className="input"
          />
          <FormControl variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password" required>
              Пароль
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              maxRows={150}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              required
              defaultValue={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Пароль"
            />
          </FormControl>

          <Button
            className="btn-primary btn"
            type="submit"
            variant="contained"
            disabled={disabled}
          >
            Войти
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default memo(ModalAuth);

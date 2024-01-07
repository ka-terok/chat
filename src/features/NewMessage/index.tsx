import {
  useState,
  ChangeEvent,
  useRef,
  FormEvent,
  useEffect,
  useMemo,
  useCallback,
  memo,
} from "react";
import { useParams } from "react-router-dom";
import { useActions } from "hooks/useActions";
import { useGetUser } from "reducer/user/selectors";
import {
  getMessage,
  useGetMessages,
  useGetParent,
} from "reducer/room/selectors";
import { IMessage } from "../../models/models";
import { Stack } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { AddEmoji } from "..";
import { useAddMessage } from "hooks/useAddMessage";
import { getNumber, getRandomInt, replaceParagraph } from "lib";
import { useScroll } from "hooks/useScroll";
import CloseIcon from "@mui/icons-material/Close";

const NewMessage = () => {
  const { updateRoomId, updateParent } = useActions();
  const [text, setText] = useState("");
  const timeout = useRef<null | number>(null);
  const addMessage = useAddMessage();
  const user = useGetUser();
  const { id } = useParams();
  const parent = useGetParent();
  const messages = useGetMessages();
  const textarea = useRef<HTMLTextAreaElement | null>(null);
  const { scrollDown } = useScroll();

  const parentMessage: IMessage | null = useMemo(
    () => getMessage(messages, parent?.id),
    [parent?.id, messages]
  );

  const clearParent = () => updateParent(null);

  const handleChange = useCallback((e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;

    if (textarea.current) {
      const height = textarea.current.style.height
        ? textarea.current.style.height
        : "56px";

      const shouldUpHeight =
        textarea.current.scrollHeight > getNumber(height) + 16;

      if (shouldUpHeight) {
        textarea.current.style.height = `${Math.min(
          textarea.current?.scrollHeight,
          125
        )}px`;
      }
    }

    if (target.value.length < 1) {
      textarea.current.style.height = "56px";
    }

    setText(target.value);
  }, []);

  const { isEmpty, message }: { message: IMessage; isEmpty: boolean } = useMemo(
    () => ({
      message: {
        id: getRandomInt(),
        text: text,
        creatorId: user?.id,
        parent: parent ?? null,
        viewedIds: [],
        likes: [],
        creatorAlias: user?.alias,
        isRemoved: false,
      },
      isEmpty: replaceParagraph(text).length < 1,
    }),
    [text, user, parent]
  );

  const onSuccess = () => {
    setText("");
    timeout.current = window.setTimeout(() => scrollDown(), 0);
    updateParent(null);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateRoomId(Number(id));

    if (user?.id && id && !isEmpty) {
      addMessage(message);
    }

    onSuccess();
  };

  const handleClickEmoji = (value: string) => {
    setText((prev) => prev + value);
  };

  useEffect(() => {
    return () => {
      if (timeout?.current) clearTimeout(timeout.current);
    };
  }, []);

  return (
    <form className="message-form" onSubmit={onSubmit}>
      {parentMessage && (
        <Stack direction="row" className="message-form__source">
          <div className="message-form__source-text">
            {parentMessage?.creatorAlias}: {parentMessage?.text}
          </div>
          <div onClick={clearParent}>
            <CloseIcon />
          </div>
        </Stack>
      )}
      <textarea
        value={text}
        onChange={handleChange}
        ref={textarea}
        maxLength={1500}
      />
      <Stack direction="column" className="buttons">
        <AddEmoji handleClickEmoji={handleClickEmoji} />
        <button>
          <SendIcon />
        </button>
      </Stack>
    </form>
  );
};

export default memo(NewMessage);

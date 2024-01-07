import { FC, MouseEvent, memo } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useActions } from "hooks/useActions";
import { clearRoomIsUpdatedUserIds, updateMessage } from "lib";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { getMessage, useGetMessages } from "reducer/room/selectors";

interface Component {
  messageId: number;
  className: string;
}

export const DeleteMessage: FC<Component> = memo(({ messageId, className }) => {
  const { updateMessage: _updateMessage } = useActions();
  const messages = useGetMessages();
  const { id } = useParams();
  const DELETED_MESSAGE_TEXT = "Сообщение удалено";

  const message = useMemo(() => {
    return getMessage(messages, messageId);
  }, [messages, messageId]);

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    const newMessage = {
      ...message,
      text: DELETED_MESSAGE_TEXT,
      isRemoved: true,
    };

    if (message) {
      updateMessage(Number(id), messages, newMessage);
      _updateMessage(newMessage);
      clearRoomIsUpdatedUserIds(Number(id));
    }
  };

  return (
    <div onClick={handleClick} className={className}>
      <DeleteIcon />
    </div>
  );
});

DeleteMessage.displayName = "DeleteMessage";

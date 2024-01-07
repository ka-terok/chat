import { FC, MouseEvent, memo, useMemo } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useParams } from "react-router-dom";
import { getMessage, useGetMessages } from "reducer/room/selectors";
import { useGetUser } from "reducer/user/selectors";
import { useActions } from "hooks/useActions";
import classNames from "classnames";
import { clearRoomIsUpdatedUserIds, updateMessage } from "lib";

interface Component {
  messageId: number;
  className: string;
  activeClassName: string;
}

export const Like: FC<Component> = memo(
  ({ messageId, className, activeClassName }) => {
    const { updateMessage: _updateMessage } = useActions();
    const messages = useGetMessages();
    const { id } = useParams();
    const user = useGetUser();

    const { message, isActive } = useMemo(() => {
      const message = getMessage(messages, messageId);

      const isActive = message?.likes?.some((elem) => elem.id === user?.id);

      return {
        message,
        isActive,
      };
    }, [messages, messageId, user]);

    const handleClick = (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      const like = message.likes?.find((elem) => elem.id === user.id);

      const newMessage = {
        ...message,
        likes: like
          ? message.likes?.filter((elem) => elem.id !== user.id)
          : message.likes.concat({
              id: user.id,
              alias: user.alias,
            }),
      };

      if (message) {
        updateMessage(Number(id), messages, newMessage);
        _updateMessage(newMessage);
        clearRoomIsUpdatedUserIds(Number(id));
      }
    };

    return (
      <div
        onClick={handleClick}
        className={classNames(className, {
          [activeClassName]: isActive,
        })}
      >
        <FavoriteIcon />
      </div>
    );
  }
);

Like.displayName = "Like";

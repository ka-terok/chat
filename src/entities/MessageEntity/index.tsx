import classNames from "classnames";
import { ParentMessage, Like } from "features";
import { IMessage, IUser } from "models/models";
import { FC, FormEvent, ReactNode, memo } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { DeleteMessage } from "features/DeleteMessage";

interface Props {
  showUsersStyle: boolean;
  parentMessage: IMessage | null;
  handleClickOnParentMessage: (e: FormEvent, value: IMessage) => void;
  creatorAlias: string;
  text: ReactNode[] | null;
  id: number;
  handleClickOnMessage: (message: IMessage, id: IUser['id']) => void;
  countLikes: number;
  isRemoved: boolean;
  message: IMessage;
  userId: IUser["id"];
}

export const MessageEntity: FC<Props> = memo(
  ({
    showUsersStyle,
    parentMessage,
    handleClickOnParentMessage,
    creatorAlias,
    text,
    id,
    handleClickOnMessage,
    countLikes,
    isRemoved,
    message,
    userId,
  }) => {
    return (
      <div className="list__item">
        <div
          className={classNames("list__item-container", {
            list__item: showUsersStyle,
            "list__item-users": !showUsersStyle,
            "list__item-with-parent": !!parentMessage,
          })}
          onClick={() => handleClickOnMessage(message, userId)}
          id={`message-${id}`}
        >
          <ParentMessage
            parentMessage={parentMessage}
            handleClickOnParentMessage={(e) =>
              handleClickOnParentMessage(e, parentMessage)
            }
          />
          <div className="list__item-name">{creatorAlias}</div>
          <div
            className={classNames("list__item-text", {
              "list__item-text__removed": isRemoved,
            })}
          >
            {text}
          </div>
          {countLikes > 0 && (
            <div className="list__item-count">
              {countLikes}
              <FavoriteIcon fontSize="small" />
            </div>
          )}
          {!showUsersStyle && (
            <Like
              messageId={id}
              className="list__item-like"
              activeClassName="list__item-like__active"
            />
          )}
          {showUsersStyle && !isRemoved && (
            <DeleteMessage messageId={id} className="list__item-remove" />
          )}
        </div>
      </div>
    );
  }
);

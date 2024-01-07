import { FC, FormEvent, memo, useCallback, useMemo } from "react";
import { IMessage, IUser } from "models/models";
import { getMessage, useGetMessages } from "reducer/room/selectors";
import { useGetUser } from "reducer/user/selectors";
import { useActions } from "hooks/useActions";
import { useScroll } from "hooks/useScroll";
import { getNodeWithBr } from "lib";
import { MessageEntity } from "entities/MessageEntity";

interface Component {
  message: IMessage;
}

const Message: FC<Component> = ({ message }) => {
  const { updateParent } = useActions();
  const user = useGetUser();
  const messages = useGetMessages();
  const { scrollToMessage } = useScroll();
  const { creatorAlias } = message;

  const parentMessage: IMessage | null = useMemo(
    () => getMessage(messages, message?.parent?.id),
    [messages, message]
  );

  const { isMy, text } = useMemo(
    () => ({
      isMy: user?.id === message.creatorId,
      text: getNodeWithBr(message?.text) || null,
    }),
    [message, user?.id]
  );

  const handleClickOnParentMessage = (
    e: FormEvent,
    parentMessage: IMessage
  ) => {
    e.stopPropagation();

    if (parentMessage?.id) {
      scrollToMessage(parentMessage.id);
    }
  };

  const handleClickOnMessage = useCallback(
    (message: IMessage, id: IUser["id"]) => {
      if (message.creatorId !== id)
        updateParent({
          id: message.id,
          alias: message.creatorAlias,
        });
    },
    [updateParent]
  );

  return (
    <MessageEntity
      creatorAlias={creatorAlias}
      handleClickOnMessage={handleClickOnMessage}
      handleClickOnParentMessage={handleClickOnParentMessage}
      showUsersStyle={isMy}
      parentMessage={parentMessage}
      text={text}
      id={message.id}
      countLikes={message.likes.length}
      isRemoved={message.isRemoved}
      message={message}
      userId={user.id}
    />
  );
};

export default memo(Message);

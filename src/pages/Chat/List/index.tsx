import Message from "../../../features/Message";
import { IMessage } from "../../../models/models";
import { useUpdateChat } from "hooks/useUpdateChat";
import { memo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "reducer/store";

const List = () => {
  const messages: IMessage[] = useSelector(
    (state: RootState) => state?.room?.messages
  );
  useUpdateChat();

  return (
    <div className="list">
      {messages.map((message: IMessage) => (
        <Message message={message} key={message.id} />
      ))}
    </div>
  );
};

export default memo(List);

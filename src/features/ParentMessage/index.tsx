import { FC, FormEvent, memo } from "react";
import { getNodeWithBr } from "lib";
import { IMessage } from "models/models";

interface Props {
  parentMessage: IMessage;
  handleClickOnParentMessage: (e: FormEvent) => void;
}

export const ParentMessage: FC<Props> = memo(
  ({ parentMessage, handleClickOnParentMessage }) => {
    const parentMessageText = getNodeWithBr(parentMessage?.text) ?? "";

    if (!parentMessage) {
      return null;
    }

    return (
      <div className="list__item-parent" onClick={handleClickOnParentMessage}>
        <span className="list__item-parent__alias">
          {parentMessage?.creatorAlias}:
        </span>{" "}
        {parentMessageText}
      </div>
    );
  }
);

ParentMessage.displayName = "ParentMessage";

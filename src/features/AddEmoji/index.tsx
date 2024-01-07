import { FC, memo, useState } from "react";
import { IButton } from "../../models/ui";
import AddReactionIcon from "@mui/icons-material/AddReaction";
import { PopoverEmojiList } from "../PopoverEmojiList";

interface Props {
  type?: IButton;
  handleClickEmoji: (value: string) => void;
}

export const AddEmoji: FC<Props> = memo(
  ({ type = "button", handleClickEmoji }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const handlePopoverClose = () => {
      setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
      <>
        <PopoverEmojiList
          open={open}
          handleClickEmoji={handleClickEmoji}
          handlePopoverClose={handlePopoverClose}
        />
        <button type={type} onClick={handleClick}>
          <AddReactionIcon />
        </button>
      </>
    );
  }
);

AddEmoji.displayName = "AddEmoji";

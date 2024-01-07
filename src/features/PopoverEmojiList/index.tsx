import { FC, memo } from "react";
import { getEmojiFromCategoriesObj } from "lib/selectors";
import { useOutsideClick } from "hooks/useOutsideClick";

interface Props {
  open: boolean;
  handlePopoverClose: () => void;
  handleClickEmoji: (value: string) => void;
}

export const PopoverEmojiList: FC<Props> = memo(
  ({ open, handlePopoverClose, handleClickEmoji }) => {
    const ref = useOutsideClick(() => handlePopoverClose());

    const _handleClickEmoji = (value: string) => {
      handleClickEmoji(value);
      handlePopoverClose();
    };

    const categories = getEmojiFromCategoriesObj();

    if (!open) {
      return null;
    }

    return (
      <div ref={ref} className="emoji">
        {categories.map((category) => (
          <div key={category.slug}>
            <div className="emoji-title">{category?.name}</div>
            <div className="emoji-category">
              {category?.emojis?.map((elem) => (
                <div
                  key={elem.slug}
                  className="emoji-item"
                  onClick={() => _handleClickEmoji(elem.emoji)}
                >
                  {elem.emoji}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }
);

PopoverEmojiList.displayName = "PopoverEmojiList";

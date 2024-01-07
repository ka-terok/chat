import { useNavigate } from "react-router-dom";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useScroll } from "hooks/useScroll";
import { memo, useCallback, useEffect, useState } from "react";

export const Header = memo(() => {
  const navigate = useNavigate();
  const { scrollDown } = useScroll();
  const [showDownButton, setShowDownButton] = useState<boolean>(false);
  const BUTTON_BACK_NAME = "Назад";
  const BUTTON_DOWN_NAME = "К началу сообщений";

  useEffect(() => {
    const listNode = document.querySelector(".list");

    const checkScroll = () => {
      const shouldShowDownButton =
        listNode.scrollTop <= listNode.scrollHeight - 2 * listNode.clientHeight;

      setShowDownButton(shouldShowDownButton ? true : false);
    };

    if (listNode) {
      listNode.addEventListener("scroll", checkScroll);
    }

    return () => {
      if (listNode) listNode.removeEventListener("scroll", checkScroll);
    };
  }, []);

  const handleBack = useCallback(() => navigate(`/`), [navigate]);

  const handleClickDown = useCallback(() => scrollDown(), [scrollDown]);

  return (
    <div className="list__header">
      <div className="list__header-buttons">
        <button className="list__header-button" onClick={handleBack}>
          <KeyboardArrowLeftIcon />
          {BUTTON_BACK_NAME}
        </button>
        {showDownButton && (
          <button onClick={handleClickDown} className="list__header-button">
            {BUTTON_DOWN_NAME}
            <KeyboardArrowDownIcon />
          </button>
        )}
      </div>
    </div>
  );
});

Header.displayName = "Header";

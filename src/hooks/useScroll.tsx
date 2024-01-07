import { useCallback } from "react";

export const useScroll = () => {
  const scrollDown = useCallback(() => {
    const listNode = document.querySelector(".list");

    if (listNode) {
      listNode.scrollTo({
        top: listNode?.scrollHeight,
        behavior: "smooth",
      });
    }
  }, []);

  const scrollToMessage = useCallback((id: number) => {
    const item = document.getElementById(`message-${id}`);

    if (item) {
      item.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, []);

  return { scrollDown, scrollToMessage };
};

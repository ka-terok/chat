import { FC, memo } from "react";
import { IShortRoom } from "../../models/models";

interface Component {
  elem: IShortRoom;
  handleClickOnRoom: (id: number) => void;
}

const Card: FC<Component> = ({ elem, handleClickOnRoom }) => {
  const { id } = elem;

  return (
    <div onClick={() => handleClickOnRoom(id)} className="stack__item">
      {elem?.name}
    </div>
  );
};

export default memo(Card);

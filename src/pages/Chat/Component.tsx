import { useAuth } from "hooks/useAuth";
import { Header } from "./Header";
import NewMessage from "features/NewMessage";
import List from "./List";

const Chat = () => {
  useAuth();

  return (
    <div className="container__chat">
      <Header />
      <List />
      <NewMessage />
    </div>
  );
};

export default Chat;

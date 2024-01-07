import { FC, ReactNode } from "react";
import { useInitialApp } from "hooks/useInitialApp";

interface Component {
  children: ReactNode;
}

const Layout: FC<Component> = ({ children }) => {
  useInitialApp();

  return <div className="container">{children}</div>;
};

export default Layout;

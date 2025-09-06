import { Outlet } from "react-router";
import Footer from "./Footer";
import Header from "./Header";

const Layout = () => {
  return (
    <div className="flex h-screen flex-col">
      <Header className="flex-none" />

      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>

      <Footer className="flex-none" />
    </div>
  );
};

export default Layout;

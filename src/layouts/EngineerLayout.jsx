import { Outlet } from "react-router-dom";

const EngineerLayout = () => {
  return (
    <div className="engineer-layout">
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default EngineerLayout;

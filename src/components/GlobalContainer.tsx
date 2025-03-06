import { Outlet } from "react-router-dom";

export const GlobalContainer = () => {

  return (
    <div className="min-h-screen">
      <Outlet />
    </div>
  )
};

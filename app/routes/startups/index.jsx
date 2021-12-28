import { Outlet } from "remix";

function ShowStartup() {
  return (
    <>
    <h3>Startup info here</h3>
      <Outlet />
    </>
  );
}

export default ShowStartup;
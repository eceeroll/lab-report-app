import Navbar from "../../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";

export default function Dashboard() {
  return (
    <>
      <Navbar />

      <div style={{ padding: "20px" }}>
        <Outlet />
      </div>
    </>
  );
}

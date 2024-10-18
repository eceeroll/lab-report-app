import "@mantine/core/styles.css";
import LoginPage from "./pages/LoginPage/LoginPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import NewReport from "./pages/NewReport/NewReport";
import MyReports from "./pages/Reports/Reports";


export default function App() {
  return (
    <>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={<Dashboard />}>
              {/* Alt rotalar, Dashboard altında Outlet'de render edilecek */}
              {/* <Route path="home" element={<Home />} /> */}
              <Route path="new-report" element={<NewReport />} />
              <Route path="my-reports" element={<MyReports />} />
              {/* <Route path="profile" element={<Profile />} /> */}
              {/* <Route path="statistics" element={<Statistics />} /> */}
            </Route>
          </Routes>
        </div>
      </Router>
    </>
  );
}

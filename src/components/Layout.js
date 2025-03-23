import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./Header/Header";
import Home from "../pages/Home";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import Mammograph from "../pages/Mammograph";
import Pathology from "../pages/Pathology";
import Positive from "../pages/Positive";
import Negative from "../pages/Negative";
import Doctors from "../pages/Doctors";
import Patients from "../pages/Patients";
import Dashboard from "../pages/Dashboard";
import PathologyResult from "../pages/PathologyResult";
import ContactUs from "../pages/ContactUs";
import AboutUs from "../pages/AboutUs";

const Layout = () => {
  const location = useLocation();
  const hideHeaderRoutes = ["/SignUp", "/SignIn"].map((route) => route.toLowerCase());
  return (
    <>
      {!hideHeaderRoutes.includes(location.pathname) && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/Mammograph" element={<Mammograph />} />
        <Route path="/Pathology" element={<Pathology />} />
        <Route path="/Positive" element={<Positive />} />
        <Route path="/Negative" element={<Negative />} />
        <Route path="/Doctors" element={<Doctors />} />
        <Route path="/Patients" element={<Patients />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/PathologyResult" element={<PathologyResult />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/AboutUs" element={<AboutUs />} />
      </Routes>
    </>
  );
};

export default Layout;

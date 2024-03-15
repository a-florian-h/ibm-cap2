import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Layout from "./Components/Landing_Page/Landing_Page";
import Sign_Up from "./Components/Sign_Up/Sign_Up";
import Login from "./Components/Login/Login";
import InstantConsultation from "./Components/InstantConsultationBooking/InstantConsultation"; 
import FindDoctorSearch from "./Components/FindDoctorSearch/FindDoctorSearch";
import BookingConsultation from "./Components/BookingConsultation/BookingConsultation";
import Notification from "./Components/Notification/Notification";
import DoctorCard from "./Components/DoctorCard/DoctorCard";
import { doctors } from "./Components/DoctorCard/doctorsdata";
import { AppointmentsProvider } from './AppointmentsContext';
import ReviewForm from "./Components/ReviewForm/ReviewForm";
import ProfileCard from "./Components/ProfileCard/ProfileCard";
import ReportsLayout from "./Components/ReportsLayout/ReportsLayout";

function App() {



  return (
    <div className="App">
      <BrowserRouter>
      <AppointmentsProvider>
        <Notification >
            <Routes>
                <Route path="/" element={<Layout />} />
                <Route path="/reviewform" element={<ReviewForm />} />
                <Route path="/login" element={<Login />} />
                <Route path="/sign_up" element={<Sign_Up />} />
                <Route path="/profile" element={<ProfileCard />} />
                <Route path="/reports" element={<ReportsLayout />} />

                {/* <Route path="/instant-consultation" element={<InstantConsultation />} /> */}
                {/* <Route path="/finddoctorsearch" element={<FindDoctorSearch />} /> */}
                <Route path="/bookingconsultation" element={<BookingConsultation />} />         
            </Routes>
        </Notification>
        </AppointmentsProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

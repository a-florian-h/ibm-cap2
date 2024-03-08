import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Layout from "./Components/Landing_Page/Landing_Page";
import Sign_Up from "./Components/Sign_Up/Sign_Up";
import Login from "./Components/Login/Login";
import InstantConsultation from './Components/InstantConsultationBooking/InstantConsultation'; 
import FindDoctorSearch from "./Components/FindDoctorSearch/FindDoctorSearch";
import DoctorCard from "./Components/DoctorCard/DoctorCard";
import { doctors } from "./Components/DoctorCard/doctorsdata";

function App() {



  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Layout />} />
          <Route path="/sign_up" element={<Sign_Up />} />
          <Route path="/login" element={<Login />} />
          <Route path="/instant-consultation" element={<InstantConsultation />} />
          <Route path="/finddoctorsearch" element={<FindDoctorSearch />} />
          {/* <Route path="/doctorcard" element={<DoctorCard />} /> */}
            <Route
                path="/doctorcard"
                element={
                <>
                {doctors.map((doctor, index) => (
                <DoctorCard 
                key={index}
                name={doctor.name}
                speciality={doctor.speciality}
                experience={doctor.experience}
                ratings={doctor.ratings}
                // Add profilePic if available
                />
                ))}
                </>
                }
            />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import './FindDoctorSearch.css';
import { useNavigate, Navigate } from 'react-router-dom';
import DoctorCard from "../DoctorCard/DoctorCard";
import { doctors } from "../DoctorCard/doctorsdata";
import BookingConsultation from "../BookingConsultation/BookingConsultation"

const initSpeciality = [
    'Dentist', 'Gynecologist/obstetrician', 'General Physician', 'Dermatologist', 'Ear-nose-throat (ent) Specialist', 'Homeopath', 'Ayurveda'
]

const FindDoctorSearch = () => {
    const [doctorResultHidden, setDoctorResultHidden] = useState(true);
    const [searchDoctor, setSearchDoctor] = useState('');
    const [specialities, setSpecialities] = useState(initSpeciality);
    const navigate = useNavigate();
    // const handleDoctorSelect = (speciality) => {
    //     setSearchDoctor(speciality);
    //     setDoctorResultHidden(true);
    //     // navigate(`/instant-consultation?speciality=${speciality}`);
    //     // navigate(`/finddoctorsearch?speciality=${speciality}`);
    //     navigate(`/bookingconsultation?speciality=${speciality}`);
    //     window.location.reload();
    // }

    const handleDoctorSelect = (speciality, name) => {
        setSearchDoctor(speciality);
        setDoctorResultHidden(true);
      
        let url = '/bookingconsultation';
        if (speciality) {
          url += `?speciality=${speciality}`;
        }
        if (name) {
          url += speciality ? `&name=${name}` : `?name=${name}`;
        }
      
        console.log('Navigating to URL:', url);
        navigate(url);
        window.location.reload();
      };


    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            // alert('keydown');
          handleDoctorSelect(null , searchDoctor);
        }
      };

    return (
        <div className='finddoctor'>
            <center>
                <h1>Find a doctor and Consult instantly</h1>
                <div>               <i style={{color:'#000000',fontSize:'20rem'}} className="fa fa-user-md"></i>
</div>                <div className="home-search-container"  style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                    <div className="doctor-search-box">
                    {/* <p>Perform a search to see the results.</p> */}

                        {/* <input type="text" className="search-doctor-input-box" placeholder="Search doctors, clinics, hospitals, etc." onFocus={() => setDoctorResultHidden(false)} onBlur={() => setDoctorResultHidden(true)} value={searchDoctor} onChange={(e) => setSearchDoctor(e.target.value)} /> */}
                        
                        <input 
                            type="text" 
                            className="search-doctor-input-box" 
                            placeholder="Search doctors, by speciality or name" 
                            onFocus={() => setDoctorResultHidden(false)} 
                            onBlur={() => setDoctorResultHidden(true)} 
                            value={searchDoctor} 
                            onChange={(e) => setSearchDoctor(e.target.value)} 
                            onKeyDown={handleKeyDown}
                        />   


                        <div className="findiconimg"><img className='findIcon' src={process.env.PUBLIC_URL + '/images/search.svg'} alt=""/></div>
                        <div className="search-doctor-input-results" hidden={doctorResultHidden}>
                            {
                                specialities.map(speciality => <div className="search-doctor-result-item" key={speciality} onMouseDown={() => handleDoctorSelect(speciality)}>
                                    <span><img src={process.env.PUBLIC_URL + '/images/search.svg'} alt="" style={{height:"10px", width:"10px"}} width="12" /></span>
                                    <span>{speciality}</span>
                                    <span>SPECIALITY</span>
                                </div>)
                            }
                        </div>
                    </div>
                </div>

                {/* map through available doctors as defined in doctorsdata */}

                {/* {doctors.map((doctor, index) => (
                <DoctorCard 
                key={index}
                name={doctor.name}
                speciality={doctor.speciality}
                experience={doctor.experience}
                ratings={doctor.ratings}
                profilePic={doctor.profilePic}
                />
                ))} */}

            </center>
        </div>
    )
}

export default FindDoctorSearch
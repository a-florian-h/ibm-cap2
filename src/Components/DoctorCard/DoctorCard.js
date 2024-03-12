import React, { useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './DoctorCard.css';
import AppointmentForm from '../AppointmentForm/AppointmentForm'
import { v4 as uuidv4 } from 'uuid';
import { useAppointments } from '../../AppointmentsContext';
// import  profilePic from './icon_doctor_.png';

const DoctorCard = ({ name, speciality, experience, ratings, profilePic }) => {
  const [showModal, setShowModal] = useState(false);
  const { appointments, setAppointments } = useAppointments();

  const handleBooking = () => {
    setShowModal(true);
  };

  const handleCancel = (appointmentId) => {
    const updatedAppointments = appointments.filter((appointment) => appointment.id !== appointmentId);
    setAppointments(updatedAppointments);
    if (updatedAppointments.length > 0) {
        localStorage.setItem(name, JSON.stringify(updatedAppointments));
      } else {
        localStorage.removeItem(name);
      }
  };


  const handleFormSubmit = (appointmentData) => {
    const newAppointment = {
      id: uuidv4(),
      doctorName: name,
      speciality: speciality,
      ...appointmentData,
    };
    const storedAppointments = JSON.parse(localStorage.getItem(name)) || [];
    const updatedAppointments = [...storedAppointments, newAppointment];
    setAppointments(prevAppointments => [...prevAppointments, newAppointment]);
    localStorage.setItem(name, JSON.stringify(updatedAppointments));
    setShowModal(false);
  };

// Filter appointments for the current doctor
const doctorAppointments = appointments.filter(appointment => appointment.doctorName === name);

// Check if there are any appointments for the current doctor
const hasAppointment = doctorAppointments.length > 0;


  return (
    <div className="doctor-card-container" style={{ marginTop: '50px' }}>
      <div className="doctor-card-details-container">
        <div className="doctor-card-profile-image-container">
        {/* <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16"> <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/> </svg> */}
        {/* <img src={profilePic} alt={name} width="46" height="46" /> */}
        {/* <img src={profilePic} alt={name} width="46" height="46" /> */}
        {/* <img src={require(`${profilePic}`)} alt={name} width="46" height="46" /> */}
        </div>
        <div className="doctor-card-details">
          <div className="doctor-card-detail-name">{name}</div>
          <div className="doctor-card-detail-speciality">{speciality}</div>
          <div className="doctor-card-detail-experience">{experience} years experience</div>
          <div className="doctor-card-detail-consultationfees">Ratings: {ratings}</div>
        </div>
        {/* for reference  */}
        {/* <div>
            <button className='book-appointment-btn'>                    
            <div>Book Appointment</div>
            <div>No Booking Fee</div>
            </button>
        </div> */}
      </div>

      {/* adding booking button functionality
      <div className="doctor-card-options-container">
       <Popup
          style={{ backgroundColor: '#FFFFFF' }}
          trigger={
            <button className={`book-appointment-btn ${appointments.length > 0 ? 'cancel-appointment' : ''}`}>
              {appointments.length > 0 ? (
                <div>Cancel Appointment</div>
              ) : (
                <div>Book Appointment</div>
              )}
              <div>No Booking Fee</div>
            </button>
          }
          modal
          open={showModal}
          onClose={() => setShowModal(false)}
        > */}
      {/* adding booking button functionality */}
      <div className="doctor-card-options-container">
       <Popup
          style={{ backgroundColor: '#FFFFFF' }}
          trigger={
            <button className={`book-appointment-btn ${hasAppointment ? 'cancel-appointment' : ''}`}>
              {hasAppointment ? (
                <div>Cancel Appointment</div>
              ) : (
                <div>Book Appointment</div>
              )}
              <div>No Booking Fee</div>
            </button>
          }
          modal
          open={showModal}
          onClose={() => setShowModal(false)}
        >
          {(close) => (
            <div className="doctorbg" style={{ height: '100vh', overflow: 'scroll' }}>
              <div>
                <div className="doctor-card-profile-image-container">
                {/* <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16"> <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/> </svg> */}
                {/* <img src={require(`${profilePic}`)} alt={name} width="46" height="46" /> */}
                
                </div>
                <div className="doctor-card-details">
                  <div className="doctor-card-detail-name">{name}</div>
                  <div className="doctor-card-detail-speciality">{speciality}</div>
                  <div className="doctor-card-detail-experience">{experience} years experience</div>
                  <div className="doctor-card-detail-consultationfees">Ratings: {ratings}</div>
                </div>
              </div>

              {doctorAppointments.length > 0 ? (
                <>
                  <h3 style={{ textAlign: 'center' }}>Appointment Booked!</h3>
                  {doctorAppointments.map((appointment) => (
                    <div className="bookedInfo" key={appointment.id}>
                      <p>Name: {appointment.name}</p>
                      <p>Phone Number: {appointment.phoneNumber}</p>
                      <p>Date of Appointment: {appointment.selectedDate}</p>
                      <p>Phone Number: {appointment.selectedSlot}</p>

                      <button onClick={() => handleCancel(appointment.id)}>Cancel Appointment</button>
                    </div>
                  ))}
               
                </>
              ) : (
                <AppointmentForm doctorName={name} doctorSpeciality={speciality} onSubmit={handleFormSubmit} />
              )}
            </div>
          )}
        </Popup> 
      </div>
    </div>
  );
};

export default DoctorCard;

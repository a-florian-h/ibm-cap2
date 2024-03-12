import React, { useEffect, useState } from 'react';
import { useAppointments } from '../../AppointmentsContext';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

import Navbar from '../Navbar/Navbar';
import "./Notification.css";

const Notification = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const { appointments, setAppointments } = useAppointments();

  useEffect(() => {
    const allAppointments = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const storedAppointments = JSON.parse(localStorage.getItem(key));
      allAppointments.push(...storedAppointments);
    }
    setAppointments(allAppointments);
  }, []);

  useEffect(() => {
    const storedUsername = sessionStorage.getItem('email');
    if (storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }
  }, []);

  return (
    <div>
      <Navbar></Navbar>
      {children}
      {isLoggedIn && (
        <div className="carousel-container">
        <Carousel showThumbs={false} showStatus={false}>
          {appointments.map((appointment, index) => (
            <div key={index} className="appointment-card">
              <div className="appointment-card__content">
                <h3 className="appointment-card__title">Appointment Details</h3>
                <p className="appointment-card__message">
                  <strong>Doctor:</strong> {appointment.doctorName}
                </p>
                <p className="appointment-card__message">
                  <strong>Speciality:</strong> {appointment.speciality}
                </p>
                <p className="appointment-card__message">
                  <strong>Patient name:</strong> {appointment.name}
                </p>
                <p className="appointment-card__message">
                  <strong>Phone Number:</strong> {appointment.phoneNumber}
                </p>
                <p className="appointment-card__message">
                  <strong>Date of Appointment:</strong> {appointment.date}
                </p>
                <p className="appointment-card__message">
                  <strong>Time Slot:</strong> {appointment.slot}
                </p>
              </div>
            </div>
          ))}
        </Carousel>
        </div>
      )}
    </div>
  );
};

export default Notification;
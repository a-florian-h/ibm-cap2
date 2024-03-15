import React, { useState, useEffect, useRef } from "react";
import GiveReviews from "../GiveReviews/GiveReviews";
import ReviewCard from "../ReviewCard/ReviewCard";
import "./ReviewForm.css";

const ReviewForm = (props) => {
  const [showForm, setShowForm] = useState(false);
  const [currentAppointmentId, setCurrentAppointmentId] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [reviews, setReviews] = useState({});
  const modalRef = useRef();

  useEffect(() => {
    // Function to handle 'storage' events
    const handleStorageChange = () => {
      // Retrieve the appointments from local storage
      const storedAppointments = JSON.parse(localStorage.getItem('appointments')) || {};
      setAppointments(Object.values(storedAppointments));

      // Retrieve the reviews from local storage
      const storedReviews = JSON.parse(localStorage.getItem('reviews')) || {};
      setReviews(storedReviews);
    };

    // Add event listener
    window.addEventListener('storage', handleStorageChange);

    // Initial fetch of appointments and reviews
    handleStorageChange();

    // Remove event listener on cleanup
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowForm(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef]);

  const handleReviewClick = (appointmentId) => {
    setShowForm(true);
    setCurrentAppointmentId(appointmentId);
  };

  return (
    <div className="review-form">
      <h1>Reviews</h1>
      <table>
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Doctor Name</th>
            <th>Doctor Speciality</th>
            <th>Provide Feedback</th>
            <th>Review Given</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment, index) => {
            const review = reviews[appointment.id];
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{appointment.doctorName}</td>
                <td>{appointment.speciality}</td>
                <td>
                  {!review && (
                    <button
                      className="review-button"
                      onClick={() => handleReviewClick(appointment.id)}
                    >
                      Click to Review
                    </button>
                  )}
                </td>
                <td>{review && <ReviewCard review={review} />}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {showForm && (
  <GiveReviews appointmentId={currentAppointmentId} setReviews={setReviews} setShowForm={setShowForm} />
)}
    </div>
  );
};

export default ReviewForm;
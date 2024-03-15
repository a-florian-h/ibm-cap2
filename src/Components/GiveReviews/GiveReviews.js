import React, { useState } from "react";
import Popup from 'reactjs-popup';
import StarRatings from 'react-star-ratings';
import "./GiveReviews.css";
import { v4 as uuidv4 } from 'uuid';


function GiveReviews(props) {
  const [showModal, setShowModal] = useState(true);
  const [submittedMessage, setSubmittedMessage] = useState("");
  const [showWarning, setShowWarning] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    review: "",
  });
  const [rating, setRating] = useState(0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setSubmittedMessage(formData);
//     setFormData("");
//     if (formData.name && formData.review && rating > 0) {
//       setShowWarning(false);
//     } else {
//       setShowWarning(true);
//     }
//   };
const handleSubmit = (e) => {
  e.preventDefault();
  if (formData.name && formData.review && rating > 0) {
    // Store the data in local storage
    const storedReviews = JSON.parse(localStorage.getItem('reviews')) || {};
    const newReview = { ...formData, rating, id: props.appointmentId };
    storedReviews[newReview.id] = newReview;
    localStorage.setItem('reviews', JSON.stringify(storedReviews));

    // Update the reviews state in the ReviewForm component
    props.setReviews(storedReviews);

    // Reset the form
    setFormData({ name: "", review: "", rating: 0 });
    setShowWarning(false);
    setShowModal(false); // Close the form
  } else {
    setShowWarning(true);
  }
};

  return (
    <div>
      <Popup
        open={showModal}
        onClose={() => setShowModal(false)}
        modal
      >
        <form onSubmit={handleSubmit}>
          <h2>Give Your Feedback</h2>
          {showWarning && (
            <p className="warning">Please fill out all fields.</p>
          )}
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="review">Review:</label>
            <textarea
              id="review"
              name="review"
              value={formData.review}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="rating">Rating:</label>
            <div className="star-ratings">
            <StarRatings
                rating={rating}
                starRatedColor="yellow"
                changeRating={setRating}
                numberOfStars={5}
                name='rating'
            />
            </div>
          </div>
          <button type="submit">Submit</button>
        </form>
      </Popup>
      {submittedMessage && (
        <div>
          <h3>Submitted Message:</h3>
          {/* <p>{submittedMessage}</p> */}
          <p>Name: {submittedMessage.name}, Review: {submittedMessage.review}</p>
        </div>
      )}
    </div>
  );
}

export default GiveReviews;
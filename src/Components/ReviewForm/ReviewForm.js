import React, { useState } from "react";
import GiveReviews from "../GiveReviews/GiveReviews";
import "./ReviewForm.css";

const ReviewForm = (props) => {
  const [state, setState] = useState({
    // Initialize your state here
  });

  const [showForm, setShowForm] = useState(false);

  // Sample data
//   const data = [
//     {
//       serialNumber: 1,
//       doctorName: "Dr. Smith",
//       doctorSpeciality: "Cardiology",
//       reviewGiven: "Great doctor!",
//     },
  
//   ];

  const data = JSON.parse(localStorage.getItem('reviews')) || [];


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
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.serialNumber}</td>
              <td>{item.doctorName}</td>
              <td>{item.doctorSpeciality}</td>
              <td>
                <button
                  className="review-button"
                  onClick={() => setShowForm(true)}
                >
                  Click to Review
                </button>
              </td>
              <td>{item.reviewGiven}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {showForm && <GiveReviews />}
    </div>
  );
};

export default ReviewForm;

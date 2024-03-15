import React, { useState, useEffect } from "react";
import "./ReportsLayout.css";

const ReportsLayout = (props) => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Retrieve the appointments from local storage
    const storedAppointments = JSON.parse(localStorage.getItem('appointments')) || {};
    setAppointments(Object.values(storedAppointments));
  }, []);

  const handleViewReport = (appointmentId) => {
    // Logic to view report
  };

  const handleDownloadReport = (appointmentId) => {
    // Logic to download report
  };

  return (
    <div className="report-layout">
      <h1>Reports</h1>
      <table>
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Doctor Name</th>
            <th>Doctor Speciality</th>
            <th>View Report</th>
            <th>Download Report</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{appointment.doctorName}</td>
              <td>{appointment.speciality}</td>
              <td>
                <button
                  className="view-report-button"
                  onClick={() => handleViewReport(appointment.id)}
                >
                  View Report
                </button>
              </td>
              <td>
                <button
                  className="download-report-button"
                  onClick={() => handleDownloadReport(appointment.id)}
                >
                  Download Report
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportsLayout;
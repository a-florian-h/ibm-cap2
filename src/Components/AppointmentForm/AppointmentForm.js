import React, { useState } from 'react'

const AppointmentForm = ({ doctorName, doctorSpeciality, onSubmit }) => {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedSlot, setSelectedSlot] = useState(null);
  
    const handleSlotSelection = (slot) => {
      setSelectedSlot(slot);
    };
  
    const handleFormSubmit = (e) => {
      e.preventDefault();
      onSubmit({ name, phoneNumber, selectedDate, selectedSlot });
      setName('');
      setPhoneNumber('');
      setSelectedDate('');
      setSelectedSlot('');
    };
  
    return (
      <form onSubmit={handleFormSubmit} className="appointment-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="tel"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
            <label htmlFor="appointment-date">Appointment Date:</label>
            <input 
                type="date" 
                id="appointment-date" 
                name="appointment-date" 
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                required
                />
        </div>
        <div className="form-group">
            <label htmlFor="time-slot">Book Time Slot:</label>
            <select 
            value={selectedSlot}
            onChange= {(e) => setSelectedSlot(e.target.value)}>
                <option value="">Select a time slot...</option>
                <option value="morning">morning</option>
                <option value="lunch">lunch</option>
                <option value="afternoon">afternoon</option>
                </select>
        </div>


        <button type="submit">Book Now</button>
      </form>
    );
  };

export default AppointmentForm

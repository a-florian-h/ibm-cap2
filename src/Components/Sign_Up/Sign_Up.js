import React, { useState } from "react";
import "./Sign_Up.css";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../config";

const Sign_Up = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showerr, setShowerr] = useState("");
  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();

    alert(
      JSON.stringify({
        name: name,
        email: email,
        password: password,
        phone: phone,
      })
    );

    // API Call // no need for extra "/" after ${API_URL}
    const response = await fetch(`${API_URL}api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
        phone: phone,
      }),
    });

    const json = await response.json();
    if (json.authtoken) {
      sessionStorage.setItem("auth-token", json.authtoken);
      sessionStorage.setItem("name", name);
      // phone and email
      sessionStorage.setItem("phone", phone);
      sessionStorage.setItem("email", email);
      // Redirect to home page
      navigate("/"); //on directing to home page you need to give logic to change login and signup buttons with name of the user and logout button where you have implemented Navbar functionality
      window.location.reload();
    } else {
      // check the network response for the JSON. it is received as error not errors
      // use error.msg for the error message

      // if (json.error) {
      //     const errorMessages = json.error.map(error => error.msg).join(' ');
      //     setShowerr(errorMessages);
      //     } else {
      //     setShowerr(json.error);
      //     }

      //   if (json.error) {
      //     for (const error of json.error) {
      //       setShowerr(error.msg);
      //     }
      //   } else {
      //     setShowerr(json.error);
      //   }
      // error from the database is not an array but a simple string catch either cases .

      if (Array.isArray(json.error)) {
        const errorMessages = json.error.map((error) => error.msg).join(" ");
        setShowerr(errorMessages);
      } else {
        setShowerr(json.error);
      }
    }
  };

  return (
    <div className="container" style={{ marginTop: "5%" }}>
      <div className="signup-grid">
        <div className="signup-form">
          <form method="POST" onSubmit={register}>
            <div className="form-group">
              <label htmlFor="role">Choose Role:</label>
              <select
                id="role"
                name="role"
                required
                className="form-control"
                placeholder="Choose role"
                aria-describedby="helpId"
              >
                <option value="client">Client</option>
                <option value="doctor">Doctor</option>
              </select>
            </div>
            <div class="form-group">
              <label htmlFor="name">Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                name="name"
                id="name"
                required
                className="form-control"
                placeholder="Enter your name"
                aria-describedby="helpId"
              />

              {/* {showerr && (
<div className="err" style={{ color: "red" }}>
    {showerr}
</div>
)} */}

              {/*               
// {showerr && (
// <div className="err" style={{ color: "red" }}>
//     {showerr.msg}
// </div>
// )} */}
            </div>
            <div class="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                name="phone"
                id="phone"
                required
                className="form-control"
                placeholder="Enter your phone number"
                aria-describedby="helpId"
                // pattern="\d{10}"
                title="Phone number must be exactly 10 digits long"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              {/* {showerr && (
<div className="err" style={{ color: "red" }}>
{showerr}
</div>
)} */}
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                name="email"
                id="email"
                required
                className="form-control"
                placeholder="Enter your email"
                aria-describedby="helpId"
              />
              {/* {showerr && (
<div className="err" style={{ color: "red" }}>
    {showerr}
</div>
)} */}

              {/* {showerr && (
<div className="err" style={{ color: "red" }}>
{showerr}
</div>
)} */}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                name="password"
                id="password"
                required
                className="form-control"
                placeholder="Enter your password"
                aria-describedby="helpId"
              />
            </div>
            {showerr && (
              <div className="err" style={{ color: "red" }}>
                {showerr}
              </div>
            )}
            <div className="btn-group">
              <button
                type="submit"
                className="btn btn-primary mb-2 mr-1 waves-effect waves-light"
              >
                Submit
              </button>
              <button
                type="reset"
                className="btn btn-danger mb-2 waves-effect waves-light"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    //Sign up role is not stored in database. You can apply logic for this according to your react code.
  );
};

export default Sign_Up;

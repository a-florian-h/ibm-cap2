import React from "react";
import { Link } from "react-router-dom";
import "./Landing_Page.css";

const Landing_Page = () => {
  return (
    <section className="hero-section">
      <div>
        <div data-aos="fade-up" className="flex-hero">
          <h1>
          <span className="text-gradient">Y</span>
            our Health
            <br />
            Y
            <span className="text-gradient">our Responsibility</span>
          </h1>
          <div class="blob-cont">
            <div class="blue blob"></div>
          </div>
          <div class="blob-cont">
            <div class="blue1 blob"></div>
          </div>
          <h4>
            This is a fantastic webstite just for you and for everyone. Use it to book appointments with your prefered doctors. <br />
            Signup, signin, book, it's that easy. 
          </h4>
          <a href="#services">
            <button class="button">Get Started</button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Landing_Page;

import React from "react";

import Loading from "./Loading.jsx";
import "./styles/Welcome.css";

import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();

const Welcome = ({ isLoading }) => {
  return (
    <div className="characters_welcome">
      <h1 data-aos="fade-down" data-aos-duration="1500">
        Welcome to the Star Wars Application
      </h1>

      {!isLoading ? (
        <div className="welcome-detail">
          <p data-aos="zoom-in" data-aos-duration="1500">
            When you type a letter or the name of a character in the search bar,
            information about the character will begin to be searched and
            displayed on the screen
          </p>
          <em>
            You haven't searched for characters yet, write a letter or the name
            of a character! :)
          </em>
        </div>
      ) : null}

      {isLoading ? (
        <div className="container-img">
          <Loading />
        </div>
      ) : null}
    </div>
  );
};

export default Welcome;

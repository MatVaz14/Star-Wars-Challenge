import { Link } from "react-router-dom";
import { TiArrowBack } from "react-icons/ti";

import Search from "./Search.jsx";
import logo from "../assets/starWars.png";
import "./styles/Navbar.css";

import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();

const Navbar = ({ page }) => {
  return (
    <nav>
      <img
        data-aos="fade-right"
        data-aos-duration="1500"
        src={logo}
        alt="star-wars"
        width="150px"
        height="80px"
      />
      {page === 0 ? (
        <Search />
      ) : (
        <Link
          className="link-back"
          to="/"
          data-aos="fade-right"
          data-aos-duration="1500"
        >
          Back <TiArrowBack className="link-bi" />
        </Link>
      )}
    </nav>
  );
};

export default Navbar;

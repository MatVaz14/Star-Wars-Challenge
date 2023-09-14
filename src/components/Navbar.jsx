import Search from "./Search.jsx";
import logo from "../assets/starWars.png"
import "./styles/Navbar.css";

import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();

const Navbar = () => {
	return (
		<nav>
			<img data-aos="fade-right" data-aos-duration="1500" src={logo} alt="star-wars" width="150px" height="80px"/>
			<Search />
		</nav>
	)
}

export default Navbar;
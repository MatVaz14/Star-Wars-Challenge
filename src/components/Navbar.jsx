import Search from "./Search.jsx";
import logo from "../assets/starWars.png"

const Navbar = () => {
	return (
		<nav>
			<img src={logo} alt="star-wars" width="150px" height="80px"/>
			<Search />
		</nav>
	)
}

export default Navbar;
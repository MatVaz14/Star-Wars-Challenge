import { Navbar, Paginate, Filter, ListCharacter } from "../components";
import "./Home.css";

const Home = () => {
	return (
		<section>
			<Navbar />
			<Filter />
			<Paginate />
			<ListCharacter />
		</section>
	)
}

export default Home;
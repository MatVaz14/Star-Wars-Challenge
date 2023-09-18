import { Navbar, Paginate, Filter, ListCharacter } from "../components";
import "./Home.css";

const Home = () => {
	return (
		<section>
			<Navbar page={0}/>
			<Filter />
			<Paginate />
			<ListCharacter />
		</section>
	)
}

export default Home;
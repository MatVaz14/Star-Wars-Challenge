import { Navbar, Paginate, Filter, ListCharacter } from "../components";

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
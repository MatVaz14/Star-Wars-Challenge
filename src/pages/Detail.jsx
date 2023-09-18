import { useStore } from "../store/StoreProvider.js"; 

import { Navbar, Character } from "../components";

const Detail = () => {
	const store = useStore();

	const {characterDetail} = store;
	console.log(characterDetail)
	let c = characterDetail;
	return (
		<section>
		<Navbar page={1}/>
			<Character name={c?.name} gender={c?.gender} height={c?.height} mass={c?.mass} homeworld={c?.homeworld} species={c?.species} films={c?.films} starships={c?.starships}/>
		</section>
	)
}

export default Detail;
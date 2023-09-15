import { useStore } from "../store/StoreProvider.js";
import Character from "./Character/Character.jsx";

import "./styles/ListCharacter.css";
import loading from "../assets/loading.png";

import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();

const ListCharacter = () => {

	const store = useStore();

	const { charactersOrigin, isLoading, characters, indexOne, indexTwo } = store;
	//console.log(characters.slice(indexOne, indexTwo))
	return (
		<div className="container-listCharacter">
			{charactersOrigin.length === 0 ? <div className="characters_welcome">
<h1 data-aos="fade-down" data-aos-duration="1500">
Welcome to the Star Wars Application</h1>
{!isLoading ? <div className="welcome-detail">
<p data-aos="zoom-in" data-aos-duration="1500">When you type a letter or the name of a character in the search bar, information about the character will begin to be searched and displayed on the screen</p>
<em>You haven't searched for characters yet, write a letter or the name of a character! :)</em></div> : null}
	{
		isLoading ? (<div className="container-img">
			<img className="loading-animation" src={loading} alt="loading" loading='lazy' width="100px" heigth="100px"/>
		</div>) : null
	}
</div> : null}
			{characters.length ? (
				characters?.map(character => <Character 
					key={character?.name}
					name={character?.name} 
					gender={character?.gender}
					homeworld={character?.homeworld}
					species={character?.species}
					films={character?.films}
					starships={character?.starships}/>)).slice(indexOne, indexTwo) : 
			(null)}
			
		</div>
	)
}

export default ListCharacter;
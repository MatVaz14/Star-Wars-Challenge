import { useStore } from "../store/StoreProvider.js";
import Character from "./Character/Character.jsx";

const ListCharacter = () => {

	const store = useStore();

	const { characters, indexOne, indexTwo } = store;
	//console.log(characters.slice(indexOne, indexTwo))
	return (
		<div className="container-listCharacter">
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
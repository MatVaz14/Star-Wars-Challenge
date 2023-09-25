import { useStore } from "../store/StoreProvider.js";
import Card from "./Card.jsx";
import Welcome from "./Welcome.jsx";

import "./styles/ListCharacter.css";

import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();

const ListCharacter = () => {
  const store = useStore();

  const { charactersOrigin, isLoading, characters, indexOne, indexTwo } = store;
  console.log(charactersOrigin);
  return (
    <div className="container-listCharacter">
      {charactersOrigin.length === 0 ? <Welcome isLoading={isLoading} /> : null}
      {characters.length
        ? characters
            ?.map((character) => (
              <Card
                key={character?.name}
                name={character?.name}
                mass={character?.mass}
                height={character?.height}
                gender={character?.gender}
                homeworld={character?.homeworld}
                species={character?.species}
                films={character?.films}
                starships={character?.starships}
              />
            ))
            .slice(indexOne, indexTwo)
        : null}
    </div>
  );
};

export default ListCharacter;

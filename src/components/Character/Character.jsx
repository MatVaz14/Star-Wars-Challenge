import Film from "./Film.jsx";
import Starship from "./Starship.jsx";
import Specie from "./Specie.jsx";
import "./styles/Character.css";

const Character = ({name,gender,homeworld,species,films,starships}) => {
	return (
		<div>
			<div>
				<div>
					<h1 className="name">{name}</h1>
					<h2>Gender - ' <span>{gender?.charAt(0).toUpperCase() + gender?.slice(1)}</span> '</h2>
				</div>

				<div>
					<h1>HOMEWORLD</h1>
					<h2>Name - ' <span>{homeworld?.name}</span> ' <br />
					Climate - ' <span>{homeworld?.climate?.charAt(0).toUpperCase() + homeworld.climate?.slice(1)}</span> ' <br />
					Terrain - ' <span>{homeworld.terrain?.charAt(0).toUpperCase() + homeworld.terrain?.slice(1)}</span> ' <br />
					Population - ' <span>{homeworld.population}</span> ' <br />
					</h2>
				</div>

				{
				species.length ? <Specie species={species}/> : null
				}
				{
				starships.length ? <Starship starships={starships}/> : null
				}
				
			</div>

			<Film film={films}/>
			
		</div>
	)
}

export default Character;
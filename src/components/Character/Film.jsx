import { useState } from "react";
import { useStore } from "../../store/StoreProvider.js";
import { imageFilms } from "../../assets";
import portada from "../../assets/PortadaStarWars.jpg";
import { TiArrowForward, TiArrowBack } from "react-icons/ti";

const Film = ({film}) => {

	const store = useStore();

	const [currentFilm, setCurrentFilm] = useState(0);

	const { characters, current} = store;

	const handleNext = () => {
		if(currentFilm === film.length - 1) return;
		setCurrentFilm(currentFilm + 1);
	}
	const handlePrev = () => {
		if(currentFilm === 0) return;
		setCurrentFilm(currentFilm - 1);
	}

	//busco si ya tengo disponible esa imagen de la portada de pelicula, si la tengo, le retorno
	const getImage = () => {
  		const image = imageFilms.find(img => img.name?.toLowerCase() === film[currentFilm]?.title.toLowerCase());
  		//console.log(image);
  
  		if (image !== undefined && image.img !== undefined) {
    		return image.img;
  		} else {
    		return portada;
  		}
  	}

	return (
		<div>
			<div>
			<div>
				<h1>FILMS</h1>
			<div>
				<button onClick={handlePrev}><TiArrowBack /></button>
				<button onClick={handleNext}><TiArrowForward /></button>
			</div>
			</div>
				<h2>{film[currentFilm]?.title}</h2>
				<cite>{film[currentFilm]?.opening_crawl}</cite>
				<hr />
				<div>
					<p><span>Director</span> - {film[currentFilm]?.director} <br />
					<span>Producer</span> - {film[currentFilm]?.producer} <br />
					<span>Relase Date</span> - {film[currentFilm]?.release_date}
					</p>
				</div>
			</div>
			<img loading="lazy" src={getImage()} alt="portada" width="200px" height="300px"/>
			
		</div>
	)
}

export default Film;
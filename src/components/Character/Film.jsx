import { useState } from "react";
import { useStore } from "../../store/StoreProvider.js";
import { imageFilms } from "../../assets";
import portada from "../../assets/PortadaStarWars.jpg";
import { TiArrowForward, TiArrowBack } from "react-icons/ti";

import "./styles/Film.css";

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
		<div className="container-film">
			<div>
			<div className="film-header">
				<h2>FILMS</h2>
				<div className="btns-film">
					<button className={`${currentFilm === 0 && "disabled"}`} onClick={handlePrev}><TiArrowBack /></button>
					<button className={`${currentFilm === film.length - 1 && "disabled"}`} onClick={handleNext}><TiArrowForward /></button>
				</div>
			</div>
				<div className="film-extra-detail">
					<h3>{film[currentFilm]?.title}</h3>
				<cite>{film[currentFilm]?.opening_crawl}</cite>
				<hr />
				<div>
					<p><span>Director</span> - {film[currentFilm]?.director} <br />
					<span>Producer</span> - {film[currentFilm]?.producer} <br />
					<span>Relase Date</span> - {film[currentFilm]?.release_date}
					</p>
				</div>
				</div>
			</div>
			<img className="img-detail" loading="lazy" src={getImage()} alt="portada" width="260px" height="300px"/>
			
		</div>
	)
}

export default Film;
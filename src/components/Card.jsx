import "./styles/Card.css";
import { Link } from "react-router-dom";

import { useDispatch, useStore } from "../store/StoreProvider.js"; 

const Card = ({ name, gender, height, mass, homeworld, species, films, starships }) => {
	const store = useStore();
	const dispatch = useDispatch();

	const {isLoading} = store;

	const handleClick = () => {
		dispatch({type: "CHARACTER_DETAIL", payload: {
			name, gender, height, mass, homeworld, species, films, starships
		}})
	}

	return (
		<Link to={`${isLoading ? '/' : "/detail"}`} onClick={handleClick} className={`${isLoading ? "cursor-link link-detail" : "link-detail"}`}>
		<div className="card_container">
			<h1>{name}</h1>
			<div className="div-card"/>
			<div className="extra-detail-card">
				<span>Gender: {gender.charAt(0).toUpperCase() + gender.slice(1)}</span>
				<span>Height: {height}</span>
				<span>Mass: {mass}</span>
				<span>Homeworld: {homeworld.name}</span>
			</div>
		</div>
		</Link>
	)
}

export default Card;

import { useState, useEffect } from "react";
import { useStore, useDispatch } from "../../store/StoreProvider.js";
import { TiArrowForward, TiArrowBack } from "react-icons/ti";

const Starship = ({starships}) => {

	const store = useStore();
	const dispatch = useDispatch();

	const [currentShip, setCurrentShip] = useState(0);

	const { characters, current} = store;

	const handleNext = () => {
		if(currentShip === starships.length - 1) return;
		setCurrentShip(currentShip + 1);
	}
	const handlePrev = () => {
		if(currentShip === 0) return;
		setCurrentShip(currentShip - 1);
	}


	return (
		<div>
			<div>
				<h1>STARSHIP</h1>
				<div>
					<button onClick={handlePrev}><TiArrowBack /></button>
					<button onClick={handleNext}><TiArrowForward /></button>
				</div>
			</div>
			<div>
				<h2>Name - ' <span>{starships[currentShip]?.name}</span> '</h2>
				<h2>Model - ' <span>{starships[currentShip]?.model}</span> '</h2>
				<h2>Manufacturer - ' <span>{starships[currentShip]?.manufacturer}</span> '</h2>
				<h2>Starship Class - ' <span>{starships[currentShip]?.starship_class}</span> '</h2>
			</div>
		</div>
	)
}

export default Starship;
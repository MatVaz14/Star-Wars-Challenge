import { useState } from "react";
import { TiArrowForward, TiArrowBack } from "react-icons/ti";

import "./styles/Starship.css";

const Starship = ({ starships }) => {
  const [currentShip, setCurrentShip] = useState(0);

  const handleNext = () => {
    if (currentShip === starships.length - 1) return;
    setCurrentShip(currentShip + 1);
  };
  const handlePrev = () => {
    if (currentShip === 0) return;
    setCurrentShip(currentShip - 1);
  };

  return (
    <div className="container-starship">
      <div className="bg-starship">
        <h2>STARSHIP</h2>
        <div className="btns-starships">
          <button
            className={`${currentShip === 0 && "disabled"}`}
            onClick={handlePrev}
          >
            <TiArrowBack />
          </button>
          <button
            className={`${currentShip === starships.length - 1 && "disabled"}`}
            onClick={handleNext}
          >
            <TiArrowForward />
          </button>
        </div>
      </div>
      <div>
        <h3>
          Name - ' <span>{starships[currentShip]?.name}</span> '
        </h3>
        <h3>
          Model - ' <span>{starships[currentShip]?.model}</span> '
        </h3>
        <h3>
          Manufacturer - ' <span>{starships[currentShip]?.manufacturer}</span> '
        </h3>
        <h3>
          Starship Class - '{" "}
          <span>{starships[currentShip]?.starship_class}</span> '
        </h3>
      </div>
    </div>
  );
};

export default Starship;

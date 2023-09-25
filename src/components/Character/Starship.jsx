import { useState, useEffect } from "react";
import { TiArrowForward, TiArrowBack } from "react-icons/ti";
import { getDetail } from "../../api/controller";

import LoadingDetail from "./LoadingDetail.jsx";
import "./styles/Starship.css";

const Starship = ({ starships }) => {
  const [currentShip, setCurrentShip] = useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    getDetail(starships).then((response) => setData(response));
  }, [starships]);
  const handleNext = () => {
    if (currentShip === data.length - 1) return;
    setCurrentShip(currentShip + 1);
  };
  const handlePrev = () => {
    if (currentShip === 0) return;
    setCurrentShip(currentShip - 1);
  };

  return (
    <div className="container-starship">
      {data.length === 0 ? (
        <LoadingDetail />
      ) : (
        <>
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
                className={`${currentShip === data.length - 1 && "disabled"}`}
                onClick={handleNext}
              >
                <TiArrowForward />
              </button>
            </div>
          </div>
          <div>
            <h3>
              Name - ' <span>{data[currentShip]?.name}</span> '
            </h3>
            <h3>
              Model - ' <span>{data[currentShip]?.model}</span> '
            </h3>
            <h3>
              Manufacturer - ' <span>{data[currentShip]?.manufacturer}</span> '
            </h3>
            <h3>
              Starship Class - '{" "}
              <span>{data[currentShip]?.starship_class}</span> '
            </h3>
          </div>
        </>
      )}
    </div>
  );
};

export default Starship;

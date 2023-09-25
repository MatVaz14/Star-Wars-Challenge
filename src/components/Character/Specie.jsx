import { useState, useEffect } from "react";
import { getDetail } from "../../api/controller";
import "./styles/Specie.css";
import LoadingDetail from "./LoadingDetail";

const Specie = ({ species }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getDetail(species).then((response) => setData(response));
  }, [species]);
  return (
    <div className="container-specie">
      {data.length === 0 ? (
        <LoadingDetail />
      ) : (
        <>
          <h2>SPECIES</h2>
          <h3>
            Name - ' <span>{data[0]?.name}</span> ' <br />
            Language - ' <span>{data[0]?.language}</span> ' <br />
            Designation - '{" "}
            <span>
              {data[0]?.designation.charAt(0).toUpperCase() +
                data[0]?.designation.slice(1)}
            </span>{" "}
            ' <br />
            Clasiffication - '{" "}
            <span>
              {data[0]?.classification.charAt(0).toUpperCase() +
                data[0]?.classification.slice(1)}
            </span>{" "}
            '
          </h3>
        </>
      )}
    </div>
  );
};

export default Specie;

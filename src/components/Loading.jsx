import loading from "../assets/loading.png";
import "./styles/Loading.css";

const Loading = () => {
	return (
		<div className="container_loading">
			<div className="line_one"/>
			<div className="line_two"/>
			<div className="line_three"/>
			<img
                className="loading-img"
                src={loading}
                alt="loading"
                loading="lazy"
                width="100px"
                heigth="100px"
             />
             <span>Loading ...</span>
		</div>
	)
}

export default Loading;

/*
			<img
                className="loading-animation"
                src={loading}
                alt="loading"
                loading="lazy"
                width="100px"
                heigth="100px"
             />
*/
import loading from "../../assets/loading.png";
import "./styles/LoadingDetail.css";

const LoadingDetail = () => {
  return (
    <div className="container_loading_2">
      <div className="line_one_2" />
      <div className="line_two_2" />
      <div className="line_three_2" />
      <img
        className="loading-img_2"
        src={loading}
        alt="loading"
        loading="lazy"
        width="50px"
        heigth="50px"
      />
      <span>Loading ...</span>
    </div>
  );
};

export default LoadingDetail;

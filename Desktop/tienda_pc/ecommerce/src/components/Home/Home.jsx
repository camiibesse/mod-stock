
import "./Home.css";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import Banner from "./Banner";
import Info from "./Info";


const Home = () => {
  return (
    <>
      <div className="top-banner">
        <div className="container">
          <div className="detail">
            <h2>Los mejores componentes para tu PC</h2>
            <Link to="/productos" className="link">
              Ver tienda <BsArrowRight />
            </Link>
          </div>
          <div className="img_box">
            <img src="./img/banner1.jpg" alt="banner img" />
          </div>
        </div>
      </div>
      <Banner />
      <Info />
    </>
  );
};

export default Home;

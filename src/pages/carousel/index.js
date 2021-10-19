import { useParams } from "react-router-dom";
import { useState } from "react";
import Logo from "../../assets/small-logo.png";
import img from "../../assets/cat.png";
import "./carousel.scss";
import Swiper from "../../components/Swiper";
import Notification from "../../assets/mla-menu-desktop-notification-picture-86b2b844-4c2d-4b7c-8649-4fef867e0b9d.png";

function Carousel() {
  const { site } = useParams();
  const [inputValue, setInputValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  async function fetchData(e) {
    e.preventDefault();
    const getData = await fetch(
      `https://api.mercadolibre.com/sites/${site}/search?q=${inputValue}`
    );
    const dataToJson = await getData.json();
    setSearchResults(dataToJson.results);
    console.log(dataToJson);
    setInputValue("");
  }

  return (
    <>
      <nav className="navbar">
        <img src={Logo} alt="mercado libre logo" />
        <form className="form__container">
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            type="text"
            placeholder="Buscar producto..."
          />
          <button onClick={fetchData}>Buscar</button>
        </form>
      </nav>
      <main className="main">
        {!searchResults.length && (
          <div className="empty">
            <h1 className="main_h1">Busque su producto</h1>
            <img
              className="main_img"
              src={img}
              alt="animated cat with yellow bills"
            />
          </div>
        )}
        {searchResults.length && (
          <>
            <div className="notification__container">
              <img src={Notification} />
            </div>
            <div className="product__list">
              <Swiper results={searchResults} />
            </div>
          </>
        )}
      </main>
    </>
  );
}
export default Carousel;
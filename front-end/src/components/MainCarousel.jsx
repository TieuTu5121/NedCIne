import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";

function ControlledCarousel({ movies }) {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel
      autoPlay
      className="h-50"
      activeIndex={index}
      onSelect={handleSelect}
    >
      {movies
        .filter((movie) => {
          return (
            (movie.status === status || status === "") && movie.banner !== ""
          );
        })
        .map((movie) => (
          <Carousel.Item key={movie.id}>
            <img
              className=" w-100 h-100"
              src={movie.banner}
              alt={movie.title}
            />
          </Carousel.Item>
        ))}
    </Carousel>
  );
}

export default ControlledCarousel;

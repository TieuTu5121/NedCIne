import React, { useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { Link } from "react-router-dom";
import MovieItem from "./MovieItem";
const MovieSlider = ({ movies, movieStatus }) => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <>
      <div className="movie-slider  mt-4">
        <Carousel responsive={responsive}>
          {movies
            .filter((movie) => {
              return movie.status == movieStatus || movieStatus === "";
            })
            .map((movie) => (
              <div className="Item rounded " key={movie.id}>
                <div className="relative">
                  <Link to={`/default/movies/${movie.id}`}>
                    <img
                      className="h-96 w-full  "
                      src={movie.poster}
                      alt={movie.title}
                    />
                  </Link>
                  <div className="absolute bottom-4 left-2 bg-opacity-40  w-40 text-teal-300">
                    <h3 className="Description ">{movie.title}</h3>
                  </div>
                </div>
              </div>
            ))}
        </Carousel>
      </div>
    </>
  );
};

export default MovieSlider;

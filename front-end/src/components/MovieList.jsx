import React, { useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { Link } from "react-router-dom";
import MovieItem from "./MovieItem";
const MovieList = ({ movies, movieStatus }) => {
  useEffect(() => {
    console.log("movieList: ", movies);
  }, []);
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
      <div className="grid lg:grid-cols-6 md:grid-cols-4  grid-cols-2   mt-4">
        {movies
          .filter((movie) => {
            return movie.status == movieStatus || movieStatus === "";
          })
          .map((movie) => (
            <MovieItem movie={movie} key={movie.id} />
          ))}
      </div>
    </>
  );
};

export default MovieList;

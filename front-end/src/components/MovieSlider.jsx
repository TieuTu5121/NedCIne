import React, { useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import MovieItem from "./MovieItem";
import ChosingShowtimeModal from "./ChoosingShowtimeModal";

const MovieSlider = ({ movies, movieStatus }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const handleOpen = (movieId) => {
    setSelectedMovieId(movieId);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setSelectedMovieId(null);
    setIsModalOpen(false);
  };

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
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
      <div className="movie-slider mt-4">
        <Carousel responsive={responsive}>
          {movies
            .filter((movie) => {
              return movie.status == movieStatus || movieStatus === "";
            })
            .map((movie, index) => (
              <div className="Item rounded bg-slate-500" key={movie.id}>
                <div className="relative w-full">
                  <div
                    className="relative"
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Link to={`/default/movies/${movie.id}`}>
                      <img
                        className="h-96 w-full object-cover"
                        src={movie.poster}
                        alt={movie.title}
                      />
                    </Link>

                    <div
                      className={`absolute top-0 left-0 h-full w-56 flex mt-1 bg-black flex-col justify-center items-center opacity-90`}
                      hidden={hoveredIndex !== index}
                    >
                      <button
                        className="rounded-lg justify-self-center text-red-300 px-4 py-2 border-red-600 border"
                        onClick={() => handleOpen(movie.id)}
                      >
                        Đặt vé
                      </button>
                      <Link
                        to={`/default/movies/${movie.id}`}
                        className="rounded-lg border-red-600 border text-red-300 px-2 py-2 mt-5"
                      >
                        Xem chi tiết
                      </Link>
                    </div>
                  </div>

                  <div className="border w-56 text-center hover:show">
                    <h3 className="Description pb-2 my-2 px-2 text-black font-bold truncate border-b-2">
                      {movie.title}
                    </h3>

                    <p className="text-slate-400 text-sm text-center pb-2">
                      {movie.runTime} | {movie.release}
                    </p>
                  </div>
                </div>
                {isModalOpen && selectedMovieId === movie.id && (
                  <ChosingShowtimeModal
                    movieId={movie.id}
                    isOpen={isModalOpen}
                    onClose={handleClose}
                  />
                )}
              </div>
            ))}
        </Carousel>
      </div>
    </>
  );
};

export default MovieSlider;

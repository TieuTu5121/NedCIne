import React, { useState, useEffect } from "react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import MovieSlider from "../../components/MovieSlider";
import movieApi from "../../apis/movie";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  document.title = "NedCine - Trang chủ";

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

  useEffect(() => {
    movieApi.getAllMovies().then(({ data }) => {
      setMovies(data.data);
      // console.log("Movie >>> ", movies);
    });
  }, []);

  return (
    <>
      <div className="w-3/4 mx-auto mt-28">
        <div className="movie-slider mt-14">
          <h1 className="font-bold text-2xl">Phim đang chiếu</h1>
          <MovieSlider movies={movies} status="SHOWING" />
        </div>

        <div className="movie-slider mt-14">
          <h1 className="font-bold text-2xl">Phim sắp chiếu</h1>
          <MovieSlider movies={movies} status="COMING" />
          <br />
          <br />
        </div>
      </div>
    </>
  );
};

export default HomePage;

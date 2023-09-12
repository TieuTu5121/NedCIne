import React, { useState, useEffect } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import MovieList from "../components/MovieItem";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  document.title = "NedCine - Trang chủ";

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:8080/api/cinemas")
  //     .then((response) => {
  //       // setMovies(response);
  //       console.error("dâta movies:", response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching movies:", error);
  //     });
  // }, []);

  return (
    <>
      <div className="w-3/4 mx-auto mt-28">
        <div className="movie-slider mt-14">
          <h1 className="font-bold text-2xl">Phim đang chiếu</h1>
          <MovieList />
          {/* <Slider movieStatus="Đang chiếu" /> */}
        </div>

        <div className="movie-slider mt-14">
          <h1 className="font-bold text-2xl">Phim sắp chiếu</h1>
          <MovieList />

          {/* <Slider movieStatus="Sắp chiếu" /> */}
        </div>
      </div>
    </>
  );
};

export default HomePage;

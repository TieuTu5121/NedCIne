import { useEffect, useState } from "react";
import MovieItem from "../../components/MovieItem";
import MovieSlider from "../../components/MovieSlider";
import movieApi from "../../apis/movie";
import MovieList from "../../components/MovieList";
const MovieSchedule = ({ movieStatus }) => {
  const [movies, setMovies] = useState([]);
  document.title = "NedCine - Danh sách phim";
  useEffect(() => {
    movieApi.getAllMovies().then((data) => {
      setMovies(data.data.data);
      console.log(data.data.data);
    });
  }, []);
  return (
    <>
      <h1 className="text-4xl text-dark uppercase font-semibold mb-6 mt-28">
        Phim {movieStatus}
      </h1>
      <MovieList movies={movies} movieStatus={movieStatus} />
    </>
  );
};

export default MovieSchedule;

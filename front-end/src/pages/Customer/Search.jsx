import { useEffect, useState } from "react";
import MovieItem from "../../components/MovieItem";
import MovieSlider from "../../components/MovieSlider";
import movieApi from "../../apis/movie";
import MovieList from "../../components/MovieList";
import { nonAccentVietnamese } from "../../composables/nonAccentVietnamese";
import { useLocation, useParams } from "react-router-dom";
const Search = () => {
  const [movies, setMovies] = useState([]);
  let { search } = useLocation();
  document.title = "NedCine - Danh sách phim";
  const result = search.slice(8);

  let toLowerCase =
    nonAccentVietnamese().toLowerCaseNonAccentVietnamese(result);

  useEffect(() => {
    movieApi.getAllMovies().then((data) => {
      const allMovies = data.data.data;
      if (result && allMovies) {
        let filteredMovies = allMovies.filter((movie) =>
          nonAccentVietnamese()
            .toLowerCaseNonAccentVietnamese(movie.title)
            .includes(toLowerCase)
        );
        setMovies(filteredMovies);
      }
    });
  }, [result, toLowerCase]);

  return (
    <>
      <h1 className="text-4xl text-dark font-semibold mb-6 mt-28">
        Kết quả tìm kiếm cho {result}
      </h1>
      <MovieList movies={movies} movieStatus="" />
    </>
  );
};

export default Search;

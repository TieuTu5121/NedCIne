import MovieItem from "../components/MovieItem";
const MovieSchedule = ({ movieStatus }) => {
  document.title = "NedCine - Danh sách phim";

  return (
    <>
      <h1 className="text-4xl text-dark uppercase font-semibold mb-6 mt-28">
        Phim {movieStatus}
      </h1>
      <MovieItem movieStatus={movieStatus} />
    </>
  );
};

export default MovieSchedule;

import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";

const MovieItem = ({ movieStatus }) => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  // useEffect(() => {
  //   fetch("http://localhost:3000/api/movies/")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const filteredMovies = data.filter((m) => m.Status === movieStatus);
  //       setMovies(filteredMovies);
  //     });
  // }, [movieStatus]);

  // useEffect(() => {
  //   const queryParams = new URLSearchParams(location.search);
  //   const query = queryParams.get("search");
  //   setSearchQuery(query || "");
  // }, [location.search]);

  // const toLowerCaseNonAccentVietnamese = (str) => {
  //   // Hàm xử lý chuỗi giống như Vue
  //   // Bạn có thể sử dụng một thư viện chuyển đổi văn bản Unicode thành ASCII để thay thế chức năng này.
  //   // Tôi chỉ cung cấp một ví dụ cơ bản ở đây.
  //   return str.toLowerCase();
  // };

  // const filteredMovies = searchQuery
  //   ? movies.filter((movie) =>
  //       toLowerCaseNonAccentVietnamese(movie.Title).includes(searchQuery)
  //     )
  //   : movies;

  return (
    <div>
      {searchQuery && (
        <h1 className="mb-2 font-semibold text-xl">
          Kết quả tìm kiếm cho "{searchQuery}"
        </h1>
      )}
      <div className="grid grid-cols-4 gap-2">
        Movie List
        {/* {filteredMovies.map((movie) => (
          <div
            key={movie._id}
            className="w-72 mb-6 cursor-pointer group relative hover:shadow-md pb-4 rounded-lg"
          >
            <Link to={`/movie/${movie._id}`}>
              <img src={movie.Poster} alt="" className="w-full h-96" />
              <div className="mt-3 mb-2 mx-2">
                <h3 className="font-bold uppercase group-hover:text-red-400 text-lg mb-1">
                  {movie.Title}
                </h3>
                <p className="capitalize">
                  <strong>Thể Loại:</strong> {movie.Genres}
                </p>
                <p>
                  <strong>Thời Lượng:</strong> {movie.Runtime}
                </p>
                <p>
                  <strong>Khởi Chiếu:</strong> {movie.Released}
                </p>
              </div>
            </Link>
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default MovieItem;

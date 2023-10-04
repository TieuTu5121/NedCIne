// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import movieApi from "../apis/movie";
// import { nonAccentVietnamese } from "../composables/nonAccentVietnamese";
// import MovieSlider from "../components/MovieSlider";

// const MovieList = () => {
//   const [movies, setMovies] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [status, setStatus] = useState("");

//   useEffect(() => {
//     movieApi.getAllMovies().then(({ data }) => {
//       setMovies(data.data);
//     });
//   }, []);

//   const toLowerCaseNonAccentVietnamese = (str) => {
//     return nonAccentVietnamese().toLowerCaseNonAccentVietnamese(str);
//   };

//   const toLowerCaseSearchQuery = toLowerCaseNonAccentVietnamese(searchQuery);

//   const filteredMovies = movies.filter((movie) => {
//     const lowerCaseTitle = toLowerCaseNonAccentVietnamese(movie.title);
//     return (
//       searchQuery === "" || lowerCaseTitle.includes(toLowerCaseSearchQuery)
//     );
//   });

//   return (
//     <>
//       {searchQuery && (
//         <h1 className="mb-2 font-semibold text-xl">
//           Kết quả tìm kiếm cho "{searchQuery}"
//         </h1>
//       )}
//       <MovieSlider movies={filteredMovies} status={status} />
//     </>
//   );
// };

// export default MovieList;

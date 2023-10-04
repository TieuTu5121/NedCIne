import React from "react";
import { Link } from "react-router-dom";

const MovieItem = ({ movie }) => {
  return (
    <div
      key={movie.id}
      className="w-72 mb-6 cursor-pointer group relative hover:shadow-md pb-4 rounded-lg"
    >
      <Link to={`/movie/${movie.id}`}>
        <img src={movie.poster} alt="" className="w-full h-96" />
        <div className="mt-3 mb-2 mx-2">
          <h3 className="font-bold uppercase group-hover:text-red-400 text-lg mb-1">
            {movie.title}
          </h3>
          <p className="capitalize">
            <strong>Thể Loại:</strong> {movie.genres}
          </p>
          <p>
            <strong>Thời Lượng:</strong> {movie.runTime}
          </p>
          <p>
            <strong>Khởi Chiếu:</strong> {movie.release}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default MovieItem;

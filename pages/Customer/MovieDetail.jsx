import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import movieApi from "../../apis/movie";
import ChosingShowtimeModal from "../../components/ChoosingShowtimeModal";
import { Button } from "@mui/material";

const MovieDetail = () => {
  const [movieDetail, setMovieDetail] = useState({});
  const { id } = useParams("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    movieApi.getMovieById(id).then(({ data }) => {
      setMovieDetail(data.data);
    });
  }, [id]);

  return (
    <div className="flex flex-col items-center justify-center ">
      <h1 className="text-4xl text-dark uppercase font-semibold mb-6">
        Nội dung phim
      </h1>

      <div className="mx-auto w-2/3 mb-12 relative">
        <iframe
          src={movieDetail.trailer}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-[850px] h-[478px] max-w-4xl"
          id="videoTrailer"
        />
      </div>

      {/* Movie details */}
      <div className="grid grid-cols-8 gap-x-10">
        <div className="w-full col-span-2">
          <img src={movieDetail.poster} alt="" className="w-full" />
        </div>
        <div className="col-span-6">
          <h1 className="uppercase text-2xl font-bold">{movieDetail.title}</h1>
          <hr className="my-3" />
          <p className="">
            <strong>Nội dung:</strong> {movieDetail.plot}
          </p>
          <p>
            <strong>Đạo diễn:</strong> {movieDetail.directors}
          </p>
          <p>
            <strong>Diễn viên:</strong> {movieDetail.actors}
          </p>
          <p>
            <strong>Thể loại:</strong> {movieDetail.genres}
          </p>
          <p>
            <strong>Khởi chiếu:</strong> {movieDetail.release}
          </p>
          <p>
            <strong>Thời lượng:</strong> {movieDetail.runTime}
          </p>
          <p>
            <strong>Ngôn ngữ:</strong> {movieDetail.language}
          </p>
          <p className="pb-8">
            <strong>Rated:</strong> <strong>{movieDetail.rated}</strong>
          </p>
          <button
            className={
              movieDetail.status === "SHOWING"
                ? "uppercase bg-blue-600 text-white font-semibold px-16 py-2 rounded-lg mt-3 text-lg hover:bg-blue-500 pt-16"
                : "uppercase bg-gray-300 text-white font-semibold px-32 py-2 rounded-lg mt-3 text-lg cursor-not-allowed pt-16"
            }
            hidden={movieDetail.status === "COMING"}
            onClick={handleOpen}
          >
            Mua vé
          </button>
        </div>
      </div>

      {isModalOpen && (
        <ChosingShowtimeModal
          movieId={id}
          isOpen={isModalOpen}
          onClose={handleClose}
        />
      )}
    </div>
  );
};

export default MovieDetail;

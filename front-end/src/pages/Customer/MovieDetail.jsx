import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import movieApi from "../../apis/movie";
import ChosingShowtimeModal from "../../components/ChoosingShowtimeModal";
import { Button } from "@mui/material";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import { APP_TITLE } from "../../contants";
import { format } from "date-fns";
import { toast } from "react-hot-toast";
import commentApi from "../../apis/commentApi";
import { UserContext } from "../../components/UserContext";

const MovieDetail = () => {
  const [movieDetail, setMovieDetail] = useState({});
  const { user } = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams("");

  const [comment, setComment] = useState({});
  const [comments, setComments] = useState([]);

  useEffect(() => {
    commentApi.getCommentsByMovie(id).then((data) => {
      const comments = data.data.data;
      setComments(comments);
    });
  }, []);
  const handleRatingChange = (event, newValue) => {
    setComment((prevComment) => ({ ...prevComment, rating: newValue }));
  };

  const handleCommentChange = (event) => {
    setComment((prevComment) => ({
      ...prevComment,
      content: event.target.value,
      date: format(new Date(), "dd/MM/yyyy "),
    }));
  };

  const handleCommentSubmit = () => {
    console.log("submit");
    if (comment.content == "") toast.error("Vui lòng nhập bình luận!!!");
    if (comment.content.trim() !== "") {
      // Tạo một bản sao của mảng comments và thêm bình luận mới
      const newComments = [...comments, comment];

      const data = {
        userId: user.id,
        movieId: id,
        rating: comment.rating,
        description: comment.content,
      };
      console.log(data);
      commentApi.createComment(data).then((data) => {
        const codeStatus = data.data.codeStatus;
        if (codeStatus == 400) {
          toast.error("Không thể bình luận!");
        }
      });
      // Sau khi thêm bình luận, reset giá trị rating và comment
    } else {
      toast.error("Vui lòng nhập bình luận!!!");
    }
  };
  const handleOpen = () => {
    setIsModalOpen(true);
  };
  document.title = APP_TITLE + "Chi tiết phim";
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
      <div className="grid grid-cols-8   ">
        <div className=" col-span-2 flex-col ">
          <img src={movieDetail.poster} alt="" className=" h-72 w-58 " />
          <button
            className={
              movieDetail.status === "SHOWING"
                ? " ml-1 uppercase bg-slate-500 text-white font-semibold px-16  py-2 rounded-lg mt-3  hover:bg-blue-500 pt-16  justify-center "
                : "uppercase bg-gray-300 text-white font-semibold px-32 py-2 rounded-lg mt-3 text-lg cursor-not-allowed pt-16"
            }
            hidden={movieDetail.status === "COMING"}
            onClick={handleOpen}
          >
            Mua vé
          </button>
        </div>
        <div className="col-span-6">
          <h1 className="uppercase text-2xl font-bold">{movieDetail.title}</h1>
          <hr className="my-3" />

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
        </div>
        <p className="col-span-8 mt-8">
          <strong className="text-2xl pb-2  ">Tóm Tắt :</strong>{" "}
          <p>{movieDetail.plot}</p>
        </p>
        <div className="grid grid-cols-12 mt-8  col-span-8">
          <div className="col-span-12">
            <strong className="  text-2xl pb-2  ">
              Xếp hạng và đánh giá phim
            </strong>
          </div>

          <div className="flex flex-col col-span-3 border justify-center items-center mt-3">
            <p className="font-bold">Xếp hạng</p>
            <Rating
              size="small"
              name="half-rating"
              precision={0.5}
              onChange={handleRatingChange}
            />
          </div>

          <textarea
            className="col-span-7  border   pl-2 mt-3 w-full bg-gray-200 flex justify-self-start text-left resize-none"
            type="text"
            name=""
            id=""
            placeholder="Vui lòng nhập đánh giá..."
            title="Nhập đánh giá của bạn"
            resize="none"
            onChange={handleCommentChange}
          ></textarea>

          <button
            className=" col-span-2  border pl-2 mt-3 cursor bg-amber-950  text-white text-lg font-bold "
            onClick={handleCommentSubmit}
          >
            Bình luận
          </button>
          <div className="col-span-12 mt-8">
            {comments.map((item, index) => (
              <div
                key={index}
                className="w-full p-2 border-b-2 grid grid-cols-12 "
              >
                <div className="col-span-10 border-r-2">
                  <div className=" mb-3">
                    <span className="mr-3 px-2 p-1 bg-amber-950  text-sm text-white">
                      Khách
                    </span>
                    <Rating
                      className="mr-3"
                      size="small"
                      name="half-rating"
                      readOnly
                      value={item.rating}
                      precision={0.5}
                      onChange={false}
                    />
                    <span className="text-sm">{item.rating * 2}</span>
                  </div>

                  <p>{item.description}</p>
                  <p className="text-gray-500 text-sm">{item?.createdAt}</p>
                </div>
                <div className="col-span-2 text-sm flex flex-column text-center justify-center">
                  {user?.username}
                </div>
              </div>
            ))}
          </div>
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

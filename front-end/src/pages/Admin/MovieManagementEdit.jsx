import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

import AdminSidebar from "../../components/AdminSidebar";
import movieApi from "../../apis/movie";
import { toast } from "react-hot-toast";

function MovieManagementEdit() {
  const { id } = useParams("");
  const history = useNavigate();
  const location = useLocation();

  const [movie, setMovie] = useState();
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [rated, setRated] = useState("");
  const [runTime, setRunTime] = useState("");
  const [language, setLanguage] = useState("");
  const [directors, setDirectors] = useState("");
  const [actors, setActors] = useState("");
  const [plot, setPlot] = useState("");
  const [poster, setPoster] = useState("");
  const [banner, setBanner] = useState("");
  const [trailer, setTrailer] = useState("");
  const [status, setStatus] = useState("SHOWING");
  const [genres, setGenres] = useState();
  const [release, setRelease] = useState("");
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    if (id) {
      movieApi.getMovieById(id).then(({ data }) => {
        const movieData = data.data;
        setMovie(movieData);
        // console.log("movie data:  ", movieData);
        // Cập nhật tất cả các biến state từ dữ liệu phim
        setTitle(movieData.title);
        setYear(movieData.year);
        setRated(movieData.rated);
        setRunTime(movieData.runTime);
        setLanguage(movieData.language);
        setDirectors(movieData.directors);
        setRelease(movieData.release);
        setActors(movieData.actors);
        setPlot(movieData.plot);
        setPoster(movieData.poster);
        setBanner(movieData.banner);
        setTrailer(movieData.trailer);
        setStatus(movieData.status);
        setGenres(movieData.genres);
      });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);

    const movieData = {
      title,
      year,
      rated,
      runTime,
      language,
      directors,
      actors,
      plot,
      poster,
      release,
      banner,
      trailer,
      status,
      genres,
    };
    console.log("movie:  ", movieData);
    try {
      if (id) {
        // Nếu có id, thực hiện cập nhật
        await movieApi.updateMovie(id, movieData).then(() => {
          toast.success("Cập nhật thông tin phim thành công!!!");
          history(-1);
        });
      } else {
        // Nếu không có id, thực hiện tạo mới
        await movieApi.createMovie(movieData);
        history(-1);

        toast.success("Tạo phim mới thành công!!!");
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra!!!");
    } finally {
      setIsPending(false);
    }
  };

  const handleGoBack = (e) => {
    e.preventDefault();
    history(-1); // This will navigate back to the previous page
  };
  return (
    <>
      <div className="grid grid-cols-6">
        <div className="col-span-1 bg-slate-500 text-white h-full">
          <AdminSidebar dashboard="movie" />
        </div>
        <div className="col-span-5">
          <div className="container p-10 relative">
            <h1 className="font-bold text-xl mb-5">Chỉnh sửa thông tin phim</h1>
            <form action="" className="w-full relative" onSubmit={handleSubmit}>
              <div className="form-group mb-6 hidden">
                <label
                  className="form-label inline-block mb-2 text-gray-700 font-bold"
                  htmlFor="id"
                >
                  Id
                </label>
                <input
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none cursor-no-drop"
                  type="text"
                  defaultValue={movie ? movie.id : ""}
                  id="id"
                  disabled
                />
              </div>
              <div className="form-group mb-6">
                <label
                  className="form-label inline-block mb-2 text-gray-700 font-bold"
                  htmlFor="title"
                >
                  Tên phim
                </label>
                <input
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  type="text"
                  defaultValue={movie ? movie.title : ""}
                  onChange={(e) => setTitle(e.target.value)}
                  id="title"
                />
              </div>
              <div className="form-group mb-6">
                <label
                  className="form-label inline-block mb-2 text-gray-700 font-bold"
                  htmlFor="year"
                >
                  Năm ra mắt
                </label>
                <input
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  type="text"
                  defaultValue={movie ? movie.year : ""}
                  onChange={(e) => setYear(e.target.value)}
                  id="year"
                />
              </div>
              <div className="form-group mb-6">
                <label
                  className="form-label inline-block mb-2 text-gray-700 font-bold"
                  htmlFor="rated"
                >
                  Rated
                </label>
                <input
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  type="text"
                  defaultValue={movie ? movie.rated : ""}
                  onChange={(e) => setRated(e.target.value)}
                  id="rated"
                />
              </div>
              <div className="form-group mb-6">
                <label
                  className="form-label inline-block mb-2 text-gray-700 font-bold"
                  htmlFor="release"
                >
                  Ngày, tháng ra mắt
                </label>
                <input
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  type="text"
                  defaultValue={movie ? movie.release : ""}
                  onChange={(e) => setRelease(e.target.value)}
                  id="release"
                />
              </div>
              <div className="form-group mb-6">
                <label
                  className="form-label inline-block mb-2 text-gray-700 font-bold"
                  htmlFor="runtime"
                >
                  Thời lượng
                </label>
                <input
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  type="text"
                  defaultValue={movie ? movie.runTime : ""}
                  onChange={(e) => setRunTime(e.target.value)}
                  id="runtime"
                />
              </div>
              <div className="form-group mb-6">
                <label
                  className="form-label inline-block mb-2 text-gray-700 font-bold"
                  htmlFor="genres"
                >
                  Thể loại
                </label>
                <input
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  type="text"
                  defaultValue={movie ? movie.genres : ""}
                  onChange={(e) => setGenres(e.target.value)}
                  id="genres"
                />
              </div>
              <div className="form-group mb-6">
                <label
                  className="form-label inline-block mb-2 text-gray-700 font-bold"
                  htmlFor="directors"
                >
                  Đạo diễn
                </label>
                <input
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  type="text"
                  defaultValue={movie ? movie.directors : ""}
                  onChange={(e) => setDirectors(e.target.value)}
                  id="directors"
                />
              </div>
              <div className="form-group mb-6">
                <label
                  className="form-label inline-block mb-2 text-gray-700 font-bold"
                  htmlFor="actors"
                >
                  Tên diễn viên
                </label>
                <input
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  type="text"
                  defaultValue={movie ? movie.actors : ""}
                  onChange={(e) => setActors(e.target.value)}
                  id="actors"
                />
              </div>
              <div className="form-group mb-6">
                <label
                  className="form-label inline-block mb-2 text-gray-700 font-bold"
                  htmlFor="plot"
                >
                  Nội dung phim
                </label>
                <textarea
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  rows="5"
                  type="text"
                  defaultValue={movie ? movie.plot : ""}
                  onChange={(e) => setPlot(e.target.value)}
                  id="plot"
                ></textarea>
              </div>
              <div className="form-group mb-6">
                <label
                  className="form-label inline-block mb-2 text-gray-700 font-bold"
                  htmlFor="language"
                >
                  Ngôn ngữ
                </label>
                <input
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  type="text"
                  defaultValue={movie ? movie.language : ""}
                  onChange={(e) => setLanguage(e.target.value)}
                  id="language"
                />
              </div>
              <div className="form-group mb-6">
                <label
                  className="form-label inline-block mb-2 text-gray-700 font-bold"
                  htmlFor="poster"
                >
                  Poster
                </label>
                <input
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  type="text"
                  defaultValue={movie ? movie.poster : ""}
                  onChange={(e) => setPoster(e.target.value)}
                  id="poster"
                />
              </div>
              <div className="form-group mb-6">
                <label
                  className="form-label inline-block mb-2 text-gray-700 font-bold"
                  htmlFor="banner"
                >
                  Banner
                </label>
                <input
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  type="text"
                  defaultValue={
                    movie && movie.banner != null ? movie.banner : ""
                  }
                  onChange={(e) => setBanner(e.target.value)}
                  id="banner"
                />
              </div>
              <div className="form-group mb-6">
                <label
                  className="form-label inline-block mb-2 text-gray-700 font-bold"
                  htmlFor="trailer"
                >
                  Trailer
                </label>
                <input
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  type="text"
                  defaultValue={
                    movie && movie.trailer != null ? movie.trailer : ""
                  }
                  onChange={(e) => setTrailer(e.target.value)}
                  id="trailer"
                />
              </div>
              <div className="form-group mb-6">
                <label
                  className="form-label inline-block mb-2 text-gray-700 font-bold"
                  htmlFor="status"
                >
                  Trạng thái
                </label>
                <select
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  defaultValue={movie ? movie.status : "SHOWING"}
                  onChange={(e) => setStatus(e.target.value)}
                  id="status"
                >
                  <option value="SHOWING">Đang chiếu</option>
                  <option value="COMING">Sắp chiếu</option>
                </select>
              </div>

              <div className="relative py-8">
                <button
                  hidden={!isPending}
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                >
                  Lưu
                </button>
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2 cursor-not-allowed"
                  disabled
                  hidden={isPending}
                >
                  Đang Lưu ...
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-md"
                  onClick={handleGoBack}
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default MovieManagementEdit;

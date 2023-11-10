import React, { useState, useEffect } from "react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import MovieSlider from "../../components/MovieSlider";
import movieApi from "../../apis/movie";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { responsive } from "../../contants";
import MainCarousel from "../../components/MainCarousel";
import ReactCarousel from "../../components/MainCarousel";
import emailApi from "../../apis/emailApi";
import { toast } from "react-hot-toast";
import ReceiptEmail from "../../emails/Receipt";
import Email from "../../emails/wellcomEmail";
const HomePage = () => {
  const [movies, setMovies] = useState([]);

  document.title = "NedCine - Trang chủ";
  const responsive = [
    {
      breakpoint: 1024,
      settings: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesPerView: 1,
        spaceBetween: 5,
      },
    },
  ];
  useEffect(() => {
    movieApi.getAllMovies().then(({ data }) => {
      setMovies(data.data);
      // console.log("Movie >>> ", movies);
    });
  }, []);
  const handleSendEmail = () => {
    const emailDetail = {
      recipient: "ngthao5121@gmail.com",
      msgBody: <Email />,
      subject: "Simple Email Massage!",
    };
    emailApi.sendEmail(emailDetail).then(() => {
      toast.success("Send email success!!!");
    });
  };
  return (
    <>
      {/* <div className="pl-24 w-full mt-28">
        <Carousel
          slidesToShow={1}
          slidesToScroll={1}
          responsive={responsive}
          autoPlay
        >
          {movies
            .filter((movie) => {
              return (
                (movie.status === "SHOWING" || status === "") &&
                movie.banner !== ""
              );
            })
            .map((movie) => (
              <div className=" rounded " key={movie.id}>
                <img
                  className="h-96 w-96  "
                  src={movie.banner}
                  alt={movie.title}
                />
              </div>
            ))}
        </Carousel>
      </div> */}
      <ReactCarousel movies={movies} /> <br />
      <div className="w-3/4 mx-auto mt-8">
        <div className="movie-slider mt-8">
          <div className="flex justify-center">
            <img
              className="h-8 w-80"
              src="https://static.thenounproject.com/png/1729063-200.png"
            ></img>
            <h1 className="font-bold text-3xl text-center uppercase tracking-widest  drop-shadow-lg">
              Phim đang chiếu
            </h1>
            <img
              className="h-8 w-80"
              src="https://static.thenounproject.com/png/1729063-200.png"
            ></img>
          </div>
          <MovieSlider movies={movies} movieStatus="SHOWING" />
        </div>

        <div className="movie-slider mt-8">
          <div className="flex justify-center">
            <img
              className="h-8 w-80"
              src="https://static.thenounproject.com/png/1729063-200.png"
            ></img>
            <h1 className="font-bold text-3xl text-center uppercase">
              Phim sắp chiếu
            </h1>
            <img
              className="h-8 w-80"
              src="https://static.thenounproject.com/png/1729063-200.png"
            ></img>
          </div>
          <MovieSlider movies={movies} movieStatus="COMING" />
        </div>

        <div className="relative flex border-t-2 border-b-2 border-black w-full overflow-x-auto  hidden md:block">
          <ul class="flex space-x-4">
            <li>
              <a
                class="dx"
                href="https://www.cgv.vn/default/theaters/special/4dx"
              >
                4DX
              </a>
            </li>
            <li>
              <a
                class="imax"
                href="https://www.cgv.vn/default/theaters/special/imax"
              >
                Imax
              </a>
            </li>
            <li>
              <a
                class="starium"
                href="https://www.cgv.vn/default/theaters/special/starium"
              >
                Starium
              </a>
            </li>
            <li>
              <a
                class="gold-class"
                href="https://www.cgv.vn/default/theaters/special/gold-class"
              >
                Goldclass
              </a>
            </li>
            <li>
              <a
                class="lamour"
                href="https://www.cgv.vn/default/theaters/special/lamour"
              >
                L'amour
              </a>
            </li>
            <li>
              <a
                class="sweet"
                href="https://www.cgv.vn/default/theaters/special/sweetbox"
              >
                Sweetbox
              </a>
            </li>
            <li>
              <a
                class="premium-cinema"
                href="https://www.cgv.vn/default/theaters/special/premium"
              >
                Premium Cinema
              </a>
            </li>
            <li>
              <a
                class="screenx"
                href="https://www.cgv.vn/default/theaters/special/screenx"
              >
                Screenx
              </a>
            </li>
            <li>
              <a
                class="cine-foret"
                href="https://www.cgv.vn/default/theaters/special/cine-foret"
              >
                Cine &amp; Foret
              </a>
            </li>
            <li>
              <a
                class="cine-livingroom"
                href="https://www.cgv.vn/default/theaters/special/cine-living"
              >
                Cine &amp; Living Room
              </a>
            </li>
            <li>
              <a
                class="cine-suite"
                href="https://www.cgv.vn/default/theaters/special/cine-suite"
              >
                Cine Suite
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default HomePage;

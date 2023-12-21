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
import { colors } from "@mui/material";
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

        <div className="movie-slider my-8">
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

        <div className="relative flex border-t-2 border-b-2 border-black  overflow-x-auto   hidden md:block">
          <ul className="flex justify-between uppercase text-sm py-1 items-center px-2">
            <li>
              <a
                className="whitespace-nowrap dx"
                style={{ color: "#d1d2d4" }}
                href="https://www.cgv.vn/default/theaters/special/4dx"
              >
                4DX
              </a>
            </li>
            <li>
              <a
                className=" whitespace-nowrap imax font-bold"
                style={{ color: "#0096d7" }}
                href="https://www.cgv.vn/default/theaters/special/imax"
              >
                Imax
              </a>
            </li>
            <li>
              <a
                className=" whitespace-nowrap starium  font-semibold tracking-wider"
                href="https://www.cgv.vn/default/theaters/special/starium"
                style={{ color: "#f68b1f" }}
              >
                Starium
              </a>
            </li>
            <li>
              <a
                className=" whitespace-nowrap gold-className font-thin  "
                style={{ fontFamily: "Verdana, Arial, sans-serif" }}
                href="https://www.cgv.vn/default/theaters/special/gold-className"
              >
                Goldclass
              </a>
            </li>
            <li>
              <a
                className=" whitespace-nowrap lamour font-bold"
                href="https://www.cgv.vn/default/theaters/special/lamour"
              >
                L'amour
              </a>
            </li>
            <li>
              <a
                className=" whitespace-nowrap sweet font-bold"
                style={{ color: "#ee2375" }}
                href="https://www.cgv.vn/default/theaters/special/sweetbox"
              >
                Sweetbox
              </a>
            </li>
            <li>
              <a
                className=" whitespace-nowrap premium-cinema font-bold"
                style={{ color: "#ed1c24" }}
                href="https://www.cgv.vn/default/theaters/special/premium"
              >
                Premium Cinema
              </a>
            </li>
            <li>
              <a
                className=" whitespace-nowrap screenx font-bold"
                href="https://www.cgv.vn/default/theaters/special/screenx"
                style={{ color: "#d1d2d4" }}
              >
                Screenx
              </a>
            </li>
            <li>
              <a
                className=" whitespace-nowrap cine-foret"
                href="https://www.cgv.vn/default/theaters/special/cine-foret"
              >
                Cine &amp; Foret
              </a>
            </li>
            <li>
              <a
                className=" whitespace-nowrap cine-livingroom"
                href="https://www.cgv.vn/default/theaters/special/cine-living"
              >
                Cine &amp; Living Room
              </a>
            </li>
            <li>
              <a
                className=" whitespace-nowrap cine-suite"
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

import React, { useEffect, useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import cinemaApi from "../../apis/cinemaApi";
const CinemaManagementEdit = () => {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [isPending, setIsPending] = useState(false);

  const { id } = useParams();
  const history = useNavigate();

  useEffect(() => {
    console.log(id);
    cinemaApi.getCinemaById(id).then((data) => {
      const cinema = data.data.data;
      setAddress(cinema.address);
      setCity(cinema.city);
      setName(cinema.name);
      // console.log(data.data.data);
    });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === "") toast.error("Chưa nhập tên rạp chiếu!");
    if (address === "") toast.error("Chưa nhập địa chỉ!");
    const cinemaData = {
      name,
      address,
      city,
    };
    try {
      cinemaApi.updateCinema(id, cinemaData).then(() => {
        // console.log(response);
        toast.success("Thêm rạp chiếu phim thành công!!!");
        history(-1);
      });
    } catch (error) {
      toast.error("Có lỗi đã xảy ra!!!");
      console.log("error: ", error);
    }
  };
  const handleGoBack = (e) => {
    e.preventDefault();
    history(-1); // This will navigate back to the previous page
  };
  return (
    <div className="grid grid-cols-6 h-full">
      <div className="col-span-1 bg-slate-500 text-white h-full">
        <AdminSidebar dashboard="cinema" />
      </div>
      <div className="col-span-5">
        <div className="container p-10 relative">
          <h1 className="font-bold text-xl">Thêm rạp chiếu phim mới</h1>

          <form onSubmit={handleSubmit} className="w-full relative">
            <div className="form-group mb-6">
              <label
                className="form-label inline-block mb-2 text-gray-700 font-bold"
                htmlFor="title"
              >
                Tên rạp chiếu
              </label>
              <input
                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nhập tên rạp chiếu..."
                id="name"
              />
            </div>
            <div className="form-group mb-6">
              <label
                className="form-label inline-block mb-2 text-gray-700 font-bold"
                htmlFor="address"
              >
                Địa chỉ
              </label>
              <input
                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Nhập địa chỉ rạp chiếu..."
                id="address"
              />
            </div>
            <div className="form-group mb-6">
              <label
                className="form-label inline-block mb-2 text-gray-700 font-bold"
                htmlFor="foods"
              >
                Thành phố
              </label>

              <select
                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                id="city"
              >
                <option value="Ha noi">Hà Nội</option>
                <option value="Kien giang">Kiên Giang</option>
                <option value="Can tho">Cần Thơ</option>
              </select>
            </div>

            <div className="relative py-8">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                disabled={isPending}
              >
                {isPending ? "Đang lưu ..." : "Lưu"}
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
  );
};

export default CinemaManagementEdit;

import React, { useState, useEffect } from "react";
import AdminSidebar from "../../components/AdminSidebar";

const CinemaManagementAdd = () => {
  //   const history = useHistory();
  //   const [newCinema, setNewCinema] = useState({});
  //   const [foods, setFoods] = useState([]);
  //   const [show, setShow] = useState(false);
  //   const [foodsSelected, setFoodsSelected] = useState([]);
  //   const [msg, setMsg] = useState('');
  //   const [isPending, setIsPending] = useState(false);

  //   useEffect(() => {
  //     fetch('http://localhost:3000/api/movies/cinema/foods')
  //       .then((response) => response.json())
  //       .then((data) => setFoods(data));
  //   }, []);

  //   const showDropdown = () => {
  //     setShow(!show);
  //   };

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     setIsPending(true);
  //     newCinema.Foods = foodsSelected.map((food) => food._id);

  //     try {
  //       const response = await fetch('http://localhost:3000/api/movies/cinema', {
  //         method: 'POST',
  //         headers: { 'Content-Type': 'application/json' },
  //         body: JSON.stringify(newCinema),
  //       });

  //       const data = await response.json();
  //       console.log(data);
  //       setMsg('Thêm mới rạp chiếu phim thành công');
  //       history.goBack();
  //     } catch (error) {
  //       setMsg(error.message);
  //     } finally {
  //       setIsPending(false);
  //     }
  //   };

  return (
    <div className="grid grid-cols-6">
      <div className="col-span-1 bg-slate-500 text-white h-full">
        <AdminSidebar dashboard="cinema" />
      </div>
      <div className="col-span-5">
        <div className="container p-10 relative">
          <h1 className="font-bold text-xl">Thêm rạp chiếu phim mới</h1>

          <form
            //   onSubmit={handleSubmit}
            className="w-full relative"
          >
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
                // value={newCinema.Name}
                // onChange={(e) =>
                //   setNewCinema({ ...newCinema, Name: e.target.value })
                // }
                placeholder="Nhập rạp chiếu"
                id="title"
              />
            </div>
            <div className="form-group mb-6">
              <label
                className="form-label inline-block mb-2 text-gray-700 font-bold"
                htmlFor="seats"
              >
                Số ghế
              </label>
              <input
                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                type="text"
                // value={newCinema.Seats}
                // onChange={(e) =>
                //   setNewCinema({ ...newCinema, Seats: e.target.value })
                // }
                placeholder="Nhập số ghế ngồi"
                id="seats"
              />
            </div>
            <div className="form-group mb-6">
              <label
                className="form-label inline-block mb-2 text-gray-700 font-bold"
                htmlFor="foods"
              >
                Đồ ăn
              </label>

              <input
                className="form-control block w-full px-3 py-1.5 text-left font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none"
                value="Chọn đồ ăn"
                type="button"
                // onClick={showDropdown}
              />
              {/* <div
                className="p-2 border border-gray-500 rounded-sm shadow-sm"
                style={{ display: show ? "block" : "none" }}
              >
                <ul>
                  {foods.map((food) => (
                    <li key={food._id}>
                      <input
                        type="checkbox"
                        id={food._id}
                        value={food._id}
                        onChange={(e) => {
                          const selectedFood = foodsSelected.find(
                            (f) => f._id === food._id
                          );
                          if (e.target.checked && !selectedFood) {
                            setFoodsSelected([...foodsSelected, food]);
                          } else if (!e.target.checked && selectedFood) {
                            setFoodsSelected(
                              foodsSelected.filter((f) => f._id !== food._id)
                            );
                          }
                        }}
                        checked={foodsSelected.some((f) => f._id === food._id)}
                      />
                      <label htmlFor={food._id}>{food.Name}</label>
                    </li>
                  ))}
                </ul>
              </div> */}
            </div>

            {/* <div className="text-red-400 font-semibold">{msg}</div> */}

            <div className="relative py-8">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                // disabled={isPending}
              >
                Tạo
                {/* {isPending ? "Đang Tạo ..." : "Tạo"} */}
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md"
                // onClick={() => history.goBack()}
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

export default CinemaManagementAdd;

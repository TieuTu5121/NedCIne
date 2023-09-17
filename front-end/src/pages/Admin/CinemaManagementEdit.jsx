import React, { useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";

const CinemaManagementEdit = () => {
  //   const [cinema, setCinema] = useState({});
  //   const [foods, setFoods] = useState([]);
  //   const [showFoods, setShowFoods] = useState(false);
  //   const [foodsSelected, setFoodsSelected] = useState([]);
  //   const [msg, setMsg] = useState('');
  //   const [isPending, setIsPending] = useState(false);
  document.title = "NedCine - Quản lí rạp";
  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     setIsPending(true);
  //     cinema.Foods = foodsSelected.map((food) => food._id);

  //     try {
  //       const response = await fetch(`http://localhost:3000/api/movies/cinema/${cinema._id}`, {
  //         method: 'PUT',
  //         headers: { 'Content-Type': 'application/json' },
  //         body: JSON.stringify(cinema),
  //       });

  //       const data = await response.json();
  //       console.log(data);
  //       setMsg('Cập nhật thông tin rạp chiếu thành công');
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
          <h1 className="font-bold text-xl mb-5">
            Chỉnh sửa thông tin rạp chiếu phim
          </h1>
          <form
            //   onSubmit={handleSubmit}
            className="w-full relative"
          >
            <div className="form-group mb-6">
              <label
                className="form-label inline-block mb-2 text-gray-700 font-bold"
                htmlFor="id"
              >
                Id
              </label>
              <input
                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none cursor-no-drop"
                type="text"
                // value={cinema._id}
                // id="id"
                // disabled
              />
            </div>
            <div className="form-group mb-6">
              <label
                className="form-label inline-block mb-2 text-gray-700 font-bold"
                htmlFor="name"
              >
                Tên rạp chiếu phim
              </label>
              <input
                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                type="text"
                // value={cinema.Name}
                // onChange={(e) => setCinema({ ...cinema, Name: e.target.value })}
                id="name"
              />
            </div>
            <div className="form-group mb-6">
              <label
                className="form-label inline-block mb-2 text-gray-700 font-bold"
                htmlFor="seats"
              >
                Seats
              </label>
              <input
                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                type="text"
                // value={cinema.Seats}
                // onChange={(e) => setCinema({ ...cinema, Seats: e.target.value })}
                id="seats"
              />
            </div>

            <div className="form-group mb-6">
              <label
                className="form-label inline-block mb-2 text-gray-700 font-bold"
                htmlFor="cinema"
              >
                Đồ ăn có trong rạp
              </label>

              <input
                className="form-control block w-full px-3 py-1.5 text-left font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none"
                value="Chọn các rạp"
                type="button"
                // onClick={() => setShowFoods(!showFoods)}
              />
              {/* <div
                className="p-2 border border-gray-500 rounded-sm shadow-sm"
                style={{ display: showFoods ? 'block' : 'none' }}
              >
                <ul>
                  {foods.map((food) => (
                    <li key={food._id}>
                      <input
                        type="checkbox"
                        id={food._id}
                        value={food}
                        onChange={(e) => {
                          const selectedFood = foodsSelected.find((f) => f._id === food._id);
                          if (e.target.checked && !selectedFood) {
                            setFoodsSelected([...foodsSelected, food]);
                          } else if (!e.target.checked && selectedFood) {
                            setFoodsSelected(foodsSelected.filter((f) => f._id !== food._id));
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
                Lưu
                {/* {isPending ? "Đang Lưu ..." : "Lưu"} */}
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

export default CinemaManagementEdit;

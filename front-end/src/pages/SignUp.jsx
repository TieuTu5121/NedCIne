import React, { useState } from "react";
import { Link } from "react-router-dom";
const SignUp = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullname: "",
    phoneNumber: "",
  });
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  document.title = "NedCine - Đăng ký";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);
    setError(null);

    try {
      // Thực hiện gọi API hoặc xử lý đăng ký tài khoản ở đây
      // Ví dụ sử dụng fetch:
      const response = await fetch("URL_API_SIGNUP", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        // Xử lý lỗi nếu có
        const data = await response.json();
        throw new Error(data.message || "Đã xảy ra lỗi khi đăng ký.");
      }

      // Đăng ký thành công, bạn có thể thực hiện các hành động khác ở đây
      // Chẳng hạn, chuyển hướng người dùng đến trang đăng nhập
      history.push("/sign-in");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <>
      <form className="px-96 mt-28" onSubmit={handleSubmit}>
        <h1 className="text-3xl font-bold text-center mb-2">ĐĂNG KÝ</h1>
        <h3 className="text-center">
          Đã có tài khoản?{" "}
          <Link
            to="/default/sign-in"
            className="text-blue-500 underline hover:cursor-pointer"
          >
            Đăng nhập ngay
          </Link>
        </h3>
        <div className="mt-8">
          {/* Các trường đăng ký */}
          <div className="flex flex-col mt-2">
            <input
              className="rounded-lg px-4 py-3 placeholder-italic bg-gray-100 focus:border-0 focus:outline-0 focus:bg-white focus:shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] mb-2"
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          {/* Thêm các trường khác ở đây tương tự */}

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-4 hover:bg-blue-500"
              disabled={isPending}
            >
              Đăng ký
            </button>
            <button
              className="bg-gray-800 text-white px-4 py-2 rounded-lg mt-4 hover:bg-blue-500 cursor-not-allowed"
              disabled={!isPending}
            >
              {isPending ? "Đang đăng ký..." : "Đăng ký"}
            </button>
          </div>
        </div>

        {/* Hiển thị lỗi nếu có */}
        {error && (
          <div className="text-center mt-5">
            <span className="text-red-400">{error}</span>
          </div>
        )}
      </form>
    </>
  );
};

export default SignUp;

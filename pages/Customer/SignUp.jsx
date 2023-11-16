import React, { useContext, useState } from "react";
import authApi from "../../apis/auth";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../components/UserContext";
export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Thêm biến loading
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const register = async (event) => {
    event.preventDefault(); // Ngăn chặn việc submit form mặc định

    try {
      setLoading(true); // Bắt đầu quá trình loading

      // Gọi API để đăng nhập
      const response = await authApi.register(email, username, password);
      console.log(response?.data?.codeStatus);
      // Xử lý thành công
      if (response?.data?.codeStatus === 200 && response?.data?.data !== null) {
        // Xử lý logic sau khi đăng nhập thành công, ví dụ chuyển hướng trang
        setUser(response?.data?.data);
        toast.success("Đăng ký thành công!!!");
        navigate("/default");
      }
    } catch (error) {
      console.error("Register error:", error);
      toast.error("Đăng ký thất bại!!!");
    } finally {
      setLoading(false); // Kết thúc quá trình loading
    }
  };
  return (
    <>
      <form className="px-96 mt-28" onSubmit={register}>
        <h1 className="text-3xl font-bold text-center mb-2">ĐĂNG KÝ</h1>
        <h3 className="text-center">
          Đã có tài khoản?{" "}
          <Link
            to="/default/login"
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
              type="text"
              placeholder="John Doe"
              value={username}
              onChange={(ev) => setUsername(ev.target.value)}
              required
            />
            <input
              className="rounded-lg px-4 py-3 placeholder-italic bg-gray-100 focus:border-0 focus:outline-0 focus:bg-white focus:shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] mb-2"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
              required
            />
            <input
              className="rounded-lg px-4 py-3 placeholder-italic bg-gray-100 focus:border-0 focus:outline-0 focus:bg-white focus:shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] mb-2"
              type="password"
              placeholder="Mật khẩu"
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
              required
            />
          </div>
          {/* Thêm các trường khác ở đây tương tự */}

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-4 mr-2   hover:bg-blue-500"
              disabled={loading}
            >
              {loading ? "Đang đăng ký..." : "Đăng ký"}
            </button>
            <button
              className="bg-gray-800 text-white px-4 py-2 rounded-lg mt-4 hover:bg-blue-500 cursor-not-allowed"
              disabled={!loading}
            >
              Trở về
            </button>
          </div>
        </div>

        {/* Hiển thị lỗi nếu có */}
        {/* {error && (
          <div className="text-center mt-5">
            <span className="text-red-400">{error}</span>
          </div>
        )} */}
      </form>
    </>
  );
}

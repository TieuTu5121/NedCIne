import React, { useState } from "react";
import { Link } from "react-router-dom";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);

  document.title = "NedCine - Đăng nhập";
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);

    try {
      // Thực hiện xác thực đăng nhập tại đây, ví dụ sử dụng axios hoặc fetch
      // const response = await axios.post("/api/signin", { email, password });
      // Đoạn này thay bằng xử lý xác thực thực tế
      // if (response.status === 200) {
      //   history.push("/home");
      // } else {
      //   setError("Sai email hoặc mật khẩu. Vui lòng thử lại.");
      // }
    } catch (err) {
      console.error("Lỗi khi đăng nhập:", err);
      setError("Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại sau.");
    }

    setIsPending(false);
  };

  return (
    <>
      {/* <Helmet>
        <title>NedCine - Đăng nhập</title>
      </Helmet> */}
      <form className="px-96 mt-28" onSubmit={handleSubmit}>
        <h1 className="text-3xl font-bold text-center mb-2">ĐĂNG NHẬP</h1>
        <h3 className="text-center">
          Chưa có tài khoản?{" "}
          <Link
            to="/default/sign-up"
            className="text-blue-500 underline hover:cursor-pointer"
          >
            Đăng ký ngay
          </Link>
        </h3>
        <div className="mt-8">
          <div className="flex flex-col mt-2">
            <input
              className="rounded-lg px-4 py-3 placeholder-italic bg-gray-100 focus:border-0 focus:outline-0 focus:bg-white focus:shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] mb-2"
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col mt-2">
            <input
              className="rounded-lg px-4 py-3 placeholder-italic bg-gray-100 focus:border-0 focus:outline-0 focus:bg-white focus:shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)]"
              type="password"
              placeholder="Mật khẩu"
              minLength="6"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between mt-2">
            <div>
              <input type="checkbox" name="" id="remember" className="mr-1" />
              <label htmlFor="remember">Nhớ tài khoản</label>
            </div>
            <div>
              <a href="#" className="text-blue-500 hover:text-red-500">
                Quên mật khẩu?
              </a>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-4 hover:bg-blue-500"
              disabled={isPending}
            >
              {isPending ? "Đang đăng nhập..." : "Đăng nhập"}
            </button>
          </div>
        </div>
        <div className="text-center mt-5">
          <span className="text-red-400">{error}</span>
        </div>
      </form>
    </>
  );
}

export default SignIn;

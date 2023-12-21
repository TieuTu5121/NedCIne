import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import authApi from "../../apis/auth";
import { toast } from "react-hot-toast";
import { APP_TITLE } from "../../contants";
import { UserContext } from "../../components/UserContext";

function AdminSignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  document.title = APP_TITLE + "Admin Đăng nhập";

  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);

      const response = await authApi.login(email, password);

      if (response?.data.codeStatus === 200 && !response?.data?.data.message) {
        setUser(response?.data.data.user);
        if (
          response?.data.data.user.roles[0] == "ADMIN" ||
          response?.data.data.user.roles[0] == "EMPLOYEE"
        ) {
          navigate("/admin");
          toast.success("Đăng nhập thành công!");
          console.log("authorities: ", response?.data.data.user.authorities);
        } else {
          navigate("/default");
          toast.success("Đăng nhập thành công!");
          console.log(response?.data.data.user);
        }
        // toast.success("Đăng nhập thành công!!!");
      } else {
        response?.data?.data.message
          ? toast.error(response?.data?.data.message + "!")
          : toast.error("Đăng nhập thất bại!!");

        // console.log(response?.data?.data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred while logging in");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <form className="px-96 mt-28" onSubmit={handleLoginSubmit}>
        <h1 className="text-3xl font-bold text-center mb-2">ADMIN ĐĂNG NHẬP</h1>

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
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-4 hover:bg-blue-500"
              disabled={loading}
            >
              {loading ? "Đang đăng nhập..." : "Đăng nhập"}
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default AdminSignIn;

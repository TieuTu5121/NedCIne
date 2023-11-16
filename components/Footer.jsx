import React from "react";

const Footer = () => {
  return (
    <footer id="footer" className="bg-black text-white py-8  w-full">
      <div className=" grid grid-cols-4 max-w-7xl mx-auto">
        <ul>
          <h2 className="text-xl pb-4 font-semibold">Giới Thiệu</h2>
          <li className="pb-2">
            <a href="" className="hover:text-red-400">
              Về Chúng Tôi
            </a>
          </li>
          <li className="pb-2">
            <a href="" className="hover:text-red-400">
              Thỏa Thuận Sử Dụng
            </a>
          </li>
          <li className="pb-2">
            <a href="" className="hover:text-red-400">
              Quy Chế Hoạt Động
            </a>
          </li>
          <li className="pb-2">
            <a href="" className="hover:text-red-400">
              Chính Sách Bảo Mật
            </a>
          </li>
        </ul>
        <ul>
          <h2 className="text-xl pb-4 font-semibold">Góc Điện Ảnh</h2>
          <li className="pb-2">
            <a href="" className="hover:text-red-400">
              Thể Loại Phim
            </a>
          </li>
          <li className="pb-2">
            <a href="" className="hover:text-red-400">
              Bình Luận Phim
            </a>
          </li>
          <li className="pb-2">
            <a href="" className="hover:text-red-400">
              Blog Điện Ảnh
            </a>
          </li>
          <li className="pb-2">
            <a href="" className="hover:text-red-400">
              Phim Hay Tháng
            </a>
          </li>
        </ul>
        <ul>
          <h2 className="text-xl pb-4 font-semibold">Hỗ Trợ</h2>
          <li className="pb-2">
            <a href="" className="hover:text-red-400">
              Góp Ý
            </a>
          </li>
          <li className="pb-2">
            <a href="" className="hover:text-red-400">
              Sale & Service
            </a>
          </li>
          <li className="pb-2">
            <a href="" className="hover:text-red-400">
              Rạp / Giá Vé
            </a>
          </li>
          <li className="pb-2">
            <a href="" className="hover:text-red-400">
              Tuyển Dụng
            </a>
          </li>
        </ul>
        <div>
          <div>
            <h2 className="text-xl pb-4 font-semibold">Kết Nối Cinema</h2>
            <ul className="flex">
              <li className="pb-2">
                <a href="" className="hover:text-red-400">
                  <i className="fa-brands fa-facebook text-xl mr-4"></i>
                </a>
              </li>
              <li className="pb-2">
                <a href="" className="hover:text-red-400">
                  <i className="fa-brands fa-youtube text-xl mr-4"></i>
                </a>
              </li>
              <li className="pb-2">
                <a href="" className="hover:text-red-400">
                  <i className="fa-brands fa-instagram text-xl mr-4"></i>
                </a>
              </li>
            </ul>
          </div>
          <div className="mt-4">
            <h2 className="text-xl pb-4 font-semibold">Tải Xuống</h2>
            <ul className="flex">
              <li className="pb-2">
                <a href="" className="hover:text-red-400">
                  <i className="fa-brands fa-apple text-xl mr-4"></i>
                </a>
              </li>
              <li className="pb-2">
                <a href="" className="hover:text-red-400">
                  <i className="fa-brands fa-google-play text-xl mr-4"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

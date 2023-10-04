import { useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import { APP_TITLE } from "../../contants";
import { Link } from "react-router-dom";
import { nonAccentVietnamese } from "../../composables/nonAccentVietnamese";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import productApi from "../../apis/productApi";
import { toast } from "react-hot-toast";
const ProductManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);

  document.title = APP_TITLE + "Quản lí sản phẩm";

  let toLowerCase =
    nonAccentVietnamese().toLowerCaseNonAccentVietnamese(searchQuery);

  useEffect(() => {
    productApi.getAllProducts().then((data) => {
      const allProduct = data.data.data;
      console.log(allProduct);
      setProducts(allProduct);
    });
  }, []);

  const deleteMovie = async (productid) => {
    if (window.confirm("Bạn có chắc muốn xóa phim này?")) {
      try {
        await productApi.deleteProduct(productid);
        const updatedProduct = products.filter(
          (product) => product.id !== productid
        );
        toast.success("Xóa sản phẩm thành công!!!");

        setProducts(updatedProduct);
      } catch (error) {
        console.error("Lỗi khi xóa sản phẩm: ", error);
        toast.error("Lỗi khi xóa sản phẩm!!!");
      }
    }
  };
  function resultQuery() {
    if (searchQuery) {
      return products.filter((product) =>
        nonAccentVietnamese()
          .toLowerCaseNonAccentVietnamese(product.name)
          .includes(toLowerCase)
      );
    } else {
      return products;
    }
  }
  return (
    <>
      <div className="grid grid-cols-6">
        <div className="col-span-1 bg-slate-500 text-white min-h-screen">
          <AdminSidebar dashboard="product" />
        </div>
        <div className="col-span-5">
          <div className="container p-10 overflow-x-hidden">
            <div className="flex justify-between items-center mb-2">
              <h1 className="font-bold text-xl">Danh sách sản phẩm</h1>
              <Link
                to="/admin/product-management/edit"
                className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md"
              >
                Thêm sản phẩm mới +
              </Link>
            </div>

            <div className="mb-2 relative">
              <input
                className="w-1/2 h-10 border border-gray-600 rounded-md focus:outline-none px-2"
                placeholder="Nhập tên sản phẩm để tìm kiếm"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <i className="fa-solid fa-magnifying-glass absolute right-1/2 top-1/2 -translate-y-1/2 pr-2"></i>
            </div>
            <div className="relative">
              <table className="w-full text-left">
                <thead className="font-bold text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th className="py-3 px-6">ID</th>
                    <th className="py-3 px-6">Tên sản phẩm</th>
                    <th></th>
                    <th className="py-3 px-6">Ảnh</th>
                    <th className="py-3 px-6"></th>
                  </tr>
                </thead>
                <tbody>
                  {products.length !== 0 &&
                    resultQuery().map((product) => (
                      <tr key={product.id} className="bg-white border-b">
                        <td className="py-4 px-6">{product.id}</td>
                        <td
                          colSpan="2"
                          className="py-4 px-6 font-bold text-gray-900 whitespace-nowrap"
                        >
                          {product.name}
                        </td>
                        <td className="py-4 px-6">
                          <img
                            className="w-20"
                            src={product.photo}
                            alt={product.name}
                          />
                        </td>
                        <td className="py-4 px-6">
                          <Link
                            className="pr-4"
                            to={`/admin/product-management/edit/${product.id}`}
                          >
                            <FontAwesomeIcon
                              icon={faPenToSquare}
                              className=" text-xl text-blue-500"
                            />
                          </Link>
                          <Link
                            to="#"
                            className="cursor-pointer "
                            onClick={(e) => {
                              e.preventDefault();
                              deleteMovie(product.id);
                            }}
                          >
                            <FontAwesomeIcon
                              icon={faTrash}
                              className="text-xl text-red-400"
                            />
                          </Link>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductManagement;

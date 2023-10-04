import React, { useEffect, useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

import productApi from "../../apis/productApi";
const ProductManagementEdit = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [photo, setPhoto] = useState("");
  const [isPending, setIsPending] = useState(false);

  const { id } = useParams("");
  const history = useNavigate();

  useEffect(() => {
    if (id) {
      productApi.getProductById(id).then((data) => {
        const newProduct = data.data.data;
        setCategory(newProduct.category);
        setPhoto(newProduct.photo);
        setName(newProduct.name);
        setPrice(newProduct.price);
        setQuantity(newProduct.quantity);
        console.log(data.data.data);
      });
    }
  }, [id]);

  const handleSubmit = (e) => {
    setIsPending(true);
    e.preventDefault();
    if (name === "") {
      toast.error("Chưa nhập tên sản phẩm!");
      return;
    }
    if (quantity === "") {
      toast.error("Chưa nhập số lượng!");
      return;
    }
    if (category === "") {
      toast.error("Chưa nhập loại sản phẩm!");
      return;
    }
    if (price === "") {
      toast.error("Chưa nhập giá!");
      return;
    }
    if (photo === "") {
      toast.error("Chưa có ảnh sản phẩm!");
      return;
    }

    const productData = {
      name,
      quantity,
      category,
      price,
      photo,
    };
    try {
      if (id) {
        productApi.updateProduct(id, productData).then(() => {
          // console.log(response);
          toast.success("Cập nhật sản phẩm thành công!!!");
          history(-1);
        });
      } else {
        productApi.createProduct(productData).then((data) => {
          toast.success("Thêm sản phẩm thành công!!!");
          history(-1);

          console.log("create product sucess !!!", data);
        });
      }
      setIsPending(false);
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
    <div className="grid grid-cols-6">
      <div className="col-span-1 bg-slate-500 text-white h-screen">
        <AdminSidebar dashboard="product" />
      </div>
      <div className="col-span-5">
        <div className="container p-10 relative">
          <h1 className="font-bold text-xl">Thông tin sản phẩm</h1>
          <form onSubmit={handleSubmit} className="w-full relative">
            <div className="form-group mb-6">
              <label
                className="form-label inline-block mb-2 text-gray-700 font-bold"
                htmlFor="title"
              >
                Tên sản phẩm
              </label>
              <input
                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nhập tên sản phẩm..."
                id="name"
              />
            </div>
            <div className="form-group mb-6">
              <label
                className="form-label inline-block mb-2 text-gray-700 font-bold"
                htmlFor="address"
              >
                Loại sản phẩm
              </label>
              <input
                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Nhập loại sản phẩm..."
                id="category"
              />
            </div>
            <div className="form-group mb-6">
              <label
                className="form-label inline-block mb-2 text-gray-700 font-bold"
                htmlFor="address"
              >
                Số lượng
              </label>
              <input
                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                type="text"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Nhập số lượng..."
                id="quantity"
              />
            </div>
            <div className="form-group mb-6">
              <label
                className="form-label inline-block mb-2 text-gray-700 font-bold"
                htmlFor="price"
              >
                Giá sản phẩm
              </label>
              <input
                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Nhập đơn giá sản phẩm..."
                id="price"
              />
            </div>

            <div className="form-group mb-6">
              <label
                className="form-label inline-block mb-2 text-gray-700 font-bold"
                htmlFor="photo"
              >
                Ảnh sản phẩm
              </label>
              <input
                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                type="text"
                value={photo}
                onChange={(e) => setPhoto(e.target.value)}
                placeholder="Nhập ảnh sản phẩm..."
                id="photo"
              />
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

export default ProductManagementEdit;

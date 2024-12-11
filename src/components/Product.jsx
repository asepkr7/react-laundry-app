import React, { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axiosInstance from "../services/api";
import { BiEdit, BiPlusCircle, BiTrash } from "react-icons/bi";
import { ModalContext } from "../context/ModalContext";
import Swal from "sweetalert2";
import AddProduct from "../actions/AddProduct";
import EditProduct from "../actions/EditProduct";
import { Helmet } from "react-helmet";

const Product = () => {
  const { openModal } = useContext(ModalContext); // Ambil fungsi openModal dari ModalContext
  const [products, setProducts] = useState([]); // State untuk data produk
  const [currentPage, setCurrentPage] = useState(1); // Halaman saat ini
  const [itemsPerPage] = useState(5); // Jumlah item per halaman

  // Fungsi untuk menambahkan produk baru ke state
  const addNewProduct = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  // Fungsi untuk memperbarui produk di state
  const updateProductInState = (updatedProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
  };

  // Fungsi untuk mengambil data produk dari API
  const fetchDataProducts = async () => {
    const token = Cookies.get("token");
    if (token) {
      axiosInstance.defaults.headers.common["Authorization"] = token;
      try {
        const response = await axiosInstance.get("/products");
        setProducts(response.data.data);
      } catch (error) {
        console.error("Error fetching products:", error.response);
      }
    } else {
      console.error("Token is not available!");
    }
  };

  useEffect(() => {
    fetchDataProducts(); // Ambil data produk saat komponen dimuat
  }, []);

  // Fungsi untuk membuka modal AddProduct
  const handleAddProduct = () => {
    openModal(<AddProduct addNewProduct={addNewProduct} />, {
      header: "Add Product",
    });
  };

  // Fungsi untuk membuka modal EditProduct
  const handleEditProduct = (product) => {
    openModal(
      <EditProduct
        product={product}
        updateProductInState={updateProductInState}
      />,
      {
        header: "Edit Product",
      }
    );
  };

  // Fungsi untuk menghapus produk
  const deleteProduct = async (id) => {
    const result = await Swal.fire({
      title: "Konfirmasi Penghapusan",
      text: "Apakah Anda yakin ingin menghapus produk ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Hapus",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      const token = Cookies.get("token");
      axiosInstance.defaults.headers.common["Authorization"] = token;

      try {
        await axiosInstance.delete(`/products/${id}`);
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== id)
        );
        Swal.fire("Terhapus!", "Produk berhasil dihapus.", "success");
      } catch (error) {
        console.error("Error deleting product:", error);
        Swal.fire("Gagal!", "Produk gagal dihapus.", "error");
      }
    }
  };

  // Data untuk halaman saat ini
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);

  // Jumlah total halaman
  const totalPages = Math.ceil(products.length / itemsPerPage);

  // Fungsi untuk navigasi halaman
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <Helmet>
        <title>Product</title>
      </Helmet>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold text-gray-800">Products</h1>
        <button
          onClick={handleAddProduct}
          className="bg-transparent hover:bg-blue-700 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-600 hover:border-transparent rounded-xl"
        >
          <BiPlusCircle className="ml-1" /> Add
        </button>
      </div>

      {/* Product Table */}
      <div className="overflow-hidden rounded-lg border border-gray-200">
        <table className="min-w-full bg-white table-auto">
          <thead className="bg-blue-700 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">No</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Price
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Type
              </th>
              <th className="px-2 py-3 text-left text-sm font-semibold">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((product, index) => (
              <tr
                key={product.id}
                className={`${
                  index % 2 === 0 ? "bg-gray-100" : "bg-white"
                } hover:bg-gray-200`}
              >
                <td className="px-6 py-4 text-sm">
                  {indexOfFirstItem + index + 1}
                </td>
                <td className="px-6 py-4 text-sm">{product.name}</td>
                <td className="px-6 py-4 text-sm">{product.price}</td>
                <td className="px-6 py-4 text-sm">{product.type}</td>
                <td className="px-3 py-4 flex space-x-2">
                  <button
                    onClick={() => handleEditProduct(product)}
                    className="bg-transparent hover:bg-yellow-500 text-yellow-500 text-sm hover:text-white text-center font-bold py-2 px-2 border border-blue-600 hover:border-transparent rounded-lg"
                  >
                    <BiEdit className="ml-1" /> Edit
                  </button>
                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="ml-2 bg-transparent hover:bg-red-700 text-red-600 text-sm hover:text-white text-center font-bold py-2 px-2 border border-blue-600 hover:border-transparent rounded-lg"
                  >
                    <BiTrash className="ml-3" /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        {[...Array(totalPages)].map((_, pageIndex) => (
          <button
            key={pageIndex}
            onClick={() => paginate(pageIndex + 1)}
            className={`mx-1 px-4 py-2 rounded-md ${
              currentPage === pageIndex + 1
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            } hover:bg-blue-700 hover:text-white`}
          >
            {pageIndex + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Product;

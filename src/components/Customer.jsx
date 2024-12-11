import React, { useContext, useEffect, useState } from "react";
import { BiEdit, BiPlusCircle, BiTrash } from "react-icons/bi";
import Cookies from "js-cookie";
import axiosInstance from "../services/api";
import { ModalContext } from "../context/ModalContext";
import AddCustomer from "../actions/AddCustomer";
import Swal from "sweetalert2";
import EditCustomer from "../actions/EditCustomer";
import { Helmet } from "react-helmet";

const Customer = () => {
  const { openModal } = useContext(ModalContext);
  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Halaman saat ini
  const [itemsPerPage] = useState(5);

  const addNewCustomer = (newCustomer) => {
    setCustomers((prevCustomers) => [...prevCustomers, newCustomer]);
  };
  const updateCustomerInState = (updateCustomer) => {
    setCustomers((prevCustomers) =>
      prevCustomers.map((customer) =>
        customer.id === updateCustomer.id ? updateCustomer : customer
      )
    );
  };
  const handleAddCustomer = () => {
    console.log("Opening AddCustomer modal");
    openModal(<AddCustomer addNewCustomer={addNewCustomer} />, {
      header: "Add Customers",
    });
  };
  const handleEditCustomer = (customer) => {
    openModal(
      <EditCustomer
        customer={customer}
        updateCustomerInState={updateCustomerInState}
      />,
      { header: "Edit Customer" }
    );
  };
  const fetchDataCustomers = async () => {
    const token = Cookies.get("token");
    if (token) {
      axiosInstance.defaults.headers.common["Authorization"] = token;
      try {
        const response = await axiosInstance.get("/customers");
        setCustomers(response.data.data);
      } catch (error) {
        console.log(error.response.data);
      }
    } else {
      console.error("Token is not available!");
    }
  };

  useEffect(() => {
    fetchDataCustomers();
  }, []);
  const deleteCustomer = async (id) => {
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
        await axiosInstance.delete(`/customers/${id}`);
        setCustomers((prevCustomrs) =>
          prevCustomrs.filter((customer) => customer.id !== id)
        );
        Swal.fire("Terhapus!", "customer berhasil dihapus.", "success");
      } catch (error) {
        console.error("Error deleting customer:", error);
        Swal.fire("Gagal!", "Produk gagal dihapus.", "error");
      }
    }
  };
  // pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCustomers = customers.slice(indexOfFirstItem, indexOfLastItem);

  // Jumlah total halaman
  const totalPages = Math.ceil(customers.length / itemsPerPage);

  // Fungsi untuk navigasi halaman
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <Helmet>
        <title>Customer</title>
      </Helmet>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold text-gray-800">Customers</h1>
        <button
          onClick={handleAddCustomer}
          className="bg-transparent hover:bg-blue-700 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-600 hover:border-transparent rounded-xl"
        >
          <BiPlusCircle className="ml-1" /> Add
        </button>
      </div>

      {/* Customer Table */}
      <div className="overflow-hidden rounded-lg border border-gray-200">
        <table className="min-w-full bg-white">
          {/* Table Header */}
          <thead className="bg-blue-700 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">No</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Phone Number
              </th>
              <th className="px-2 py-3 text-center text-sm font-semibold">
                Address
              </th>
              <th className="px-2 py-3 text-center text-sm font-semibold">
                Action
              </th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody>
            {currentCustomers.map((customer, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-gray-100" : "bg-white"
                } hover:bg-gray-200`}
              >
                <td className="px-6 py-4 text-sm text-gray-800">
                  {indexOfFirstItem + index + 1}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800">
                  {customer.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800">
                  {customer.phoneNumber}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800">
                  {customer.address}
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => handleEditCustomer(customer)}
                    className="bg-transparent hover:bg-yellow-500 text-yellow-500 text-sm hover:text-white text-center font-bold py-2 px-2 border border-blue-600 hover:border-transparent rounded-lg"
                  >
                    <BiEdit className="ml-1" /> Edit
                  </button>
                  <button
                    onClick={() => deleteCustomer(customer.id)}
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

export default Customer;

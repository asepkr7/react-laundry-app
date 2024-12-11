import React, { useContext, useEffect, useState } from "react";
import { BiPlusCircle } from "react-icons/bi";
import Cookies from "js-cookie";
import axiosInstance from "../services/api";
import { ModalContext } from "../context/ModalContext";
import AddTransaction from "../actions/AddTransaction";

import { codeTransaction } from "../utils/Index"; // Import fungsi dari utils.js
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const Transaction = () => {
  const { openModal } = useContext(ModalContext);
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const navigate = useNavigate();

  const addNewtransaction = (newTranscation) => {
    setTransactions((prevTransactions) => [
      ...prevTransactions,
      newTranscation,
    ]);
  };

  const fetchDataTransaction = async () => {
    const token = Cookies.get("token");
    if (token) {
      axiosInstance.defaults.headers.common["Authorization"] = token;
      try {
        const response = await axiosInstance.get("/bills");
        setTransactions(response.data.data);
      } catch (error) {
        console.error("Error fetching transactions:", error.response);
      }
    } else {
      console.error("Token is not available!");
    }
  };
  const viewTransactions = (transactionId) => {
    navigate(`/dashboard/transactions/detail/${transactionId}`);
  };

  useEffect(() => {
    fetchDataTransaction();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTransactions = transactions.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(transactions.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <Helmet>
        <title>Transaction</title>
      </Helmet>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold text-gray-800">Transactions</h1>
        <button
          onClick={() =>
            openModal(<AddTransaction addNewtransaction={addNewtransaction} />)
          }
          className="bg-transparent hover:bg-blue-700 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-600 hover:border-transparent rounded-xl"
        >
          <BiPlusCircle className="ml-1" /> Add
        </button>
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200">
        <table className="min-w-full bg-white">
          <thead className="bg-blue-700 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">No</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Customer Code
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Customer Name
              </th>
              <th className="px-6 py-3 text-center text-sm font-semibold">
                Transaction
              </th>
            </tr>
          </thead>
          <tbody>
            {currentTransactions.map((transaction, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-gray-100" : "bg-white"
                } hover:bg-gray-200`}
              >
                <td className="px-6 py-4 text-sm text-gray-800">{index + 1}</td>
                <td className="px-6 py-4 text-sm text-gray-800">
                  {codeTransaction(
                    transaction.billDate,
                    index + 1,
                    transaction.customer.id
                  )}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800">
                  {transaction.customer.name}
                </td>
                <td className="px-3 py-4 text-center">
                  <button
                    onClick={() => viewTransactions(transaction.id)} // Menyesuaikan dengan struktur data API
                    className="bg-transparent hover:bg-blue-700 text-blue-700 text-sm hover:text-white font-bold py-2 px-4 border border-blue-600 hover:border-transparent rounded-lg"
                  >
                    {console.log(transaction.billDetails[0]?.id)}
                    View Transaction
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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

export default Transaction;

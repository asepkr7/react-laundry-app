import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import axiosInstance from "../services/api";
import { codeTransaction } from "../utils/Index";
import { BiLeftArrow } from "react-icons/bi";
import { Helmet } from "react-helmet";

const DetailTransactions = () => {
  const { id } = useParams();
  const [transactionDetail, setTransactionDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactionDetail = async () => {
      const token = Cookies.get("token");
      if (token) {
        axiosInstance.defaults.headers.common["Authorization"] = token;
        try {
          const response = await axiosInstance.get(`/bills/${id}`);
          console.log("Transaction Detail Response:", response.data);
          setTransactionDetail(response.data.data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching transaction detail:", error);
        }
      }
    };
    fetchTransactionDetail();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!transactionDetail) {
    return <div>No transaction data found</div>;
  }

  const { billDetails } = transactionDetail;
  console.log("Bill Details:", billDetails); // Cek apakah billDetails ada dan valid

  const formattedDate = new Date(transactionDetail.billDate).toLocaleDateString(
    "id-ID",
    {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }
  );

  return (
    <div className="relative">
      <Helmet>
        <title>Detail Transaction</title>
      </Helmet>
      <div className="px-6 py-4 text-center">
        <button
          onClick={() => window.history.back()}
          className="absolute top-4 left-4  bg-transparent hover:bg-blue-700 text-blue-700 text-sm hover:text-white font-bold py-2 px-4 border border-blue-600 hover:border-transparent rounded-lg"
        >
          <BiLeftArrow className=" ml-1" /> Back
        </button>
      </div>

      <div className="bg-white border rounded-lg shadow-lg px-6 py-8 max-w-md mx-auto mt-8">
        <h1 className="font-bold text-2xl my-4 text-center text-blue-600">
          Enigma Laundry
        </h1>
        <hr className="mb-2" />
        <div className="flex justify-between mb-6">
          <h1 className="text-lg font-bold">Invoice</h1>
          <div className="text-gray-700">
            <div>Date: {formattedDate}</div>
            <div>
              Invoice #:{" "}
              {codeTransaction(
                transactionDetail.billDate,
                1,
                transactionDetail.customer.id
              )}
            </div>
          </div>
        </div>
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-4">Bill To:</h2>
          <div className="text-gray-700 mb-2">
            {transactionDetail.customer.name}
          </div>
          <div className="text-gray-700 mb-2">
            {transactionDetail.customer.address}
          </div>
          <div className="text-gray-700 mb-2">
            {transactionDetail.customer.phoneNumber}
          </div>
        </div>
        <table className="w-full text-left mb-8">
          <thead>
            <tr>
              <th className="text-gray-700 font-bold uppercase py-2">
                Description
              </th>
              <th className="text-gray-700 font-bold uppercase py-2">
                Quantity
              </th>
              <th className="text-gray-700 font-bold uppercase py-2">Price</th>
              <th className="text-gray-700 font-bold uppercase py-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {billDetails?.map((item) => (
              <tr key={item.id}>
                <td className="py-4 text-gray-700">{item.product.name}</td>
                <td className="py-4 text-gray-700">{item.qty}</td>
                <td className="py-4 text-gray-700">{item.price}</td>
                <td className="py-4 text-gray-700">{item.qty * item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="text-gray-700 mb-2">Thank you for your business!</div>
      </div>
    </div>
  );
};

export default DetailTransactions;

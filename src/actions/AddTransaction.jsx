import { useContext, useEffect } from "react";
import { ModalContext } from "../context/ModalContext";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import Cookies from "js-cookie";
import axiosInstance from "../services/api";
import { toast } from "sonner";
import { codeTransaction } from "../utils/Index";
import { zodResolver } from "@hookform/resolvers/zod";
import TransactionsSchema from "../schema/TransactionsSchema";

const AddTransaction = ({ addNewtransaction }) => {
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [billDate] = useState(new Date());
  const [transactionCode, setTransactionCode] = useState("");
  const [transactionCount, setTransactionCount] = useState(1);
  const [selectedCustomerId, setSelectedCustomerId] = useState(""); // Menyimpan ID customer yang dipilih

  const { closeModal } = useContext(ModalContext);
  const {
    handleSubmit,
    watch,
    control,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: zodResolver(TransactionsSchema), // Menggunakan zodResolver untuk validasi
    defaultValues: {
      customerId: "",
      billDetails: [{ productId: "", qty: 1 }],
    },
  });

  // Fungsi untuk mengambil data pelanggan
  const fetchDataCustomers = async () => {
    const token = Cookies.get("token");

    if (token) {
      axiosInstance.defaults.headers.common["Authorization"] = token;
      try {
        const response = await axiosInstance.get("/customers");
        setCustomers(response.data.data);
      } catch (error) {
        console.error("Error fetching customers:", error.response);
      }
    } else {
      console.error("Token is not available!");
    }
  };

  // Fungsi untuk mengambil data produk
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
    fetchDataCustomers();
    fetchDataProducts();
  }, []);

  useEffect(() => {
    if (selectedCustomerId) {
      setTransactionCode(
        codeTransaction(billDate, transactionCount, selectedCustomerId)
      ); // Perbarui kode transaksi jika customer dipilih
    }
  }, [selectedCustomerId, billDate, transactionCount]); // Menambahkan selectedCustomerId sebagai dependensi

  // Hitung total harga
  const selectedProductId = watch("billDetails.0.productId");
  const qty = watch("billDetails.0.qty") || 1;

  const selectedProduct = products.find(
    (product) => product.id === selectedProductId
  );
  const totalPrice = selectedProduct ? selectedProduct.price * qty : 0;

  // Fungsi untuk meng-handle perubahan customerId dan mengubah transactionCount
  const handleCustomerChange = (customerId) => {
    setSelectedCustomerId(customerId); // Menyimpan ID customer yang dipilih
    setTransactionCount((prevCount) => prevCount + 1); // Menambahkan transaksi
    setValue("customerId", customerId); // Menetapkan nilai customerId
  };

  const handleSaveData = async (data) => {
    const token = Cookies.get("token");
    axiosInstance.defaults.headers.common["Authorization"] = token;

    const payload = {
      customerId: data.customerId,
      billDetails: data.billDetails.map((item) => ({
        product: { id: item.productId },
        qty: typeof item.qty === "number" ? item.qty : parseInt(item.qty, 10),
      })),
    };

    console.log(`isi data: ${JSON.stringify(payload)}`);

    try {
      const response = await axiosInstance.post("/bills", payload);
      console.log(response.data);
      addNewtransaction(response.data.data);
      closeModal();
      toast.success("Berhasil menambah transaksi");
      reset(); // Reset form setelah transaksi disimpan
    } catch (error) {
      console.log(error.response.data);
      toast.error("Gagal menambah transaksi");
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(handleSaveData)}>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Kode Transaksi
        </label>
        <input
          disabled
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={transactionCode} // Tampilkan kode transaksi
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Customer
        </label>
        <Controller
          name="customerId"
          control={control}
          render={({ field }) => (
            <select
              {...field}
              type="text"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onChange={(e) => handleCustomerChange(e.target.value)} // Mengubah state transactionCount dan selectedCustomerId
            >
              <option value="">Pilih Pelanggan</option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>
          )}
        />
        {errors.customerId && (
          <p className="text-red-500 text-sm">{errors.customerId.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Pilih Paket Laundry
        </label>
        <Controller
          name="billDetails.0.productId"
          control={control}
          render={({ field }) => (
            <select
              {...field}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Pilih Paket</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name} - Rp{product.price}
                </option>
              ))}
            </select>
          )}
        />
        {errors.billDetails?.[0]?.productId && (
          <p className="text-red-500 text-sm">
            {errors.billDetails[0].productId.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          QTY (Kg)
        </label>
        <Controller
          name="billDetails.0.qty"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="number"
              min={"1"}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onChange={(e) => field.onChange(Number(e.target.value))}
            />
          )}
        />
        {errors.billDetails?.[0]?.qty && (
          <p className="text-red-500 text-sm">
            {errors.billDetails[0].qty.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Total Bayar
        </label>
        <input
          disabled
          type="number"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={totalPrice}
        />
      </div>

      {/* Footer Buttons */}
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={closeModal}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default AddTransaction;

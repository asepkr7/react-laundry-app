import { useContext } from "react";
import Cookies from "js-cookie";
import { ModalContext } from "../context/ModalContext";
import { Controller, useForm } from "react-hook-form";
import axiosInstance from "../services/api";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomersSchema from "../schema/CustomerSchema";

const EditCustomer = ({ customer, updateCustomerInState }) => {
  const { closeModal } = useContext(ModalContext);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: customer?.id || "",
      name: customer?.name || "",
      phoneNumber: customer?.phoneNumber || 0,
      address: customer?.address || "",
    },
    resolver: zodResolver(CustomersSchema),
  });
  const handleSaveChanges = async (data) => {
    const token = Cookies.get("token");
    axiosInstance.defaults.headers.common["Authorization"] = token;
    if (token) {
      try {
        const response = await axiosInstance.put(`/customers`, {
          id: customer.id,
          name: data.name,
          phoneNumber: data.phoneNumber,
          address: data.address,
        });
        console.log(response.data.data);
        updateCustomerInState(response.data.data);
        closeModal();
        toast.success("Berhasil mengubah customer");
      } catch (error) {
        console.log(error.response.data);
        toast.error("gagal mengubah customer");
      }
    } else {
      toast.error("Silahkan login ulang");
    }
  };

  return (
    <form onSubmit={handleSubmit(handleSaveChanges)} className="space-y-4">
      {/* Input Nama Produk */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Nama Customer
        </label>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              address="text"
              placeholder="Masukkan nama produk"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          )}
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          No Telpon
        </label>
        <Controller
          name="phoneNumber"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              placeholder="Masukan No Telpon"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          )}
        />
        {errors.phoneNumber && (
          <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Almat</label>
        <Controller
          name="address"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              placeholder="Masukkan alamat"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          )}
        />
        {errors.address && (
          <p className="text-red-500 text-sm">{errors.address.message}</p>
        )}
      </div>

      {/* Footer Buttons */}
      <div className="flex justify-end space-x-3 pt-4">
        <button
          address="button"
          onClick={closeModal}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          address="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default EditCustomer;

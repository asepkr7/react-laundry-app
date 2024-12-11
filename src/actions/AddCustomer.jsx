import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { ModalContext } from "../context/ModalContext";
import CustomersSchema from "../schema/CustomerSchema";
import Cookies from "js-cookie";
import axiosInstance from "../services/api";
import { toast } from "sonner";

const AddCustomer = ({ addNewCustomer }) => {
  const { closeModal } = useContext(ModalContext);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      phoneNumber: "",
      address: "",
    },
    resolver: zodResolver(CustomersSchema),
  });

  const handleSaveData = async (data) => {
    const token = Cookies.get("token");
    axiosInstance.defaults.headers.common["Authorization"] = token;
    if (token) {
      try {
        const response = await axiosInstance.post("/customers", {
          name: data.name,
          phoneNumber: data.phoneNumber,
          address: data.address,
        });
        addNewCustomer(response.data.data);
        closeModal();
        toast.success("Behasil menambah data customer");
      } catch (error) {
        console.log(error.response.data);
        toast.error("Gagal menambah data customer");
      }
    } else {
      toast.error("Silahkan login ulang");
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(handleSaveData)}>
      <div>
        <label className="block text-sm font-medium text-gray-700">Nama</label>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              placeholder="Masukkan nama customer"
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

export default AddCustomer;

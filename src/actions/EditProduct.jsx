import { useContext } from "react";
import Cookies from "js-cookie";
import { ModalContext } from "../context/ModalContext";
import { Controller, useForm } from "react-hook-form";
import axiosInstance from "../services/api";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import ProductSchema from "../schema/ProductsSchema";

const EditProduct = ({ product, updateProductInState }) => {
  const { closeModal } = useContext(ModalContext);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: product?.id || "",
      name: product?.name || "",
      price: product?.price || 0,
      type: product?.type || "",
    },
    resolver: zodResolver(ProductSchema),
  });
  const handleSaveChanges = async (data) => {
    const token = Cookies.get("token");
    axiosInstance.defaults.headers.common["Authorization"] = token;
    if (token) {
      try {
        const response = await axiosInstance.put(`/products`, {
          id: product.id,
          name: data.name,
          price: Number(data.price),
          type: data.type,
        });
        updateProductInState(response.data.data);
        closeModal();
        toast.success("Berhasil mengubah product");
      } catch (error) {
        console.log(error.response.data);
        toast.error("gagal mengubah product");
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
          Nama Produk
        </label>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              placeholder="Masukkan nama produk"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          )}
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      {/* Input Harga */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Harga</label>
        <Controller
          name="price"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              onChange={(e) => {
                const value = e.target.valueAsNumber;
                field.onChange(isNaN(value) ? "" : value); // Jika NaN, ubah ke string kosong
              }}
              type="number"
              placeholder="Masukkan harga produk"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          )}
        />
        {errors.price && (
          <p className="text-red-500 text-sm">{errors.price.message}</p>
        )}
      </div>

      {/* Select Tipe */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Tipe</label>
        <Controller
          name="type"
          control={control}
          render={({ field }) => (
            <select
              {...field}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Pilih tipe produk</option>
              <option value="Kg">Kg</option>
              <option value="Satuan">Satuan</option>
            </select>
          )}
        />
        {errors.type && (
          <p className="text-red-500 text-sm">{errors.type.message}</p>
        )}
      </div>

      {/* Footer Buttons */}
      <div className="flex justify-end space-x-3 pt-4">
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

export default EditProduct;

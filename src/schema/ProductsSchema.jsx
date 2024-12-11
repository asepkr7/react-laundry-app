import { z } from "zod";

const ProductSchema = z.object({
  name: z.string().nonempty("Nama produk wajib diisi"),
  price: z.coerce.number().min(0, "Harga harus berupa angka positif"),
  type: z.string().nonempty("Tipe produk wajib dipilih"),
});

export default ProductSchema;

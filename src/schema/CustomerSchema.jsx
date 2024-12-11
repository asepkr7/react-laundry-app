import { z } from "zod";

const CustomersSchema = z.object({
  name: z.string().nonempty("Nama customer wajib diisi"),
  phoneNumber: z
    .string()
    .min(11, "No telepon harus memiliki minimal 11 karakter")
    .regex(/^\d+$/, "No telepon hanya boleh berisi angka"),
  address: z.string().nonempty("Alamat wajib diisi"),
});

export default CustomersSchema;

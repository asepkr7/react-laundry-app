import { z } from "zod";

const TransactionsSchema = z.object({
  customerId: z.string().nonempty("Nama Customer wajib diisi"), // Validasi Customer
  billDetails: z.array(
    z.object({
      productId: z.string().nonempty("Pilih Paket Laundry"), // Validasi Produk
      qty: z
        .number()
        .min(1, "Jumlah QTY minimal 1") // Validasi Qty (harus lebih dari atau sama dengan 1)
        .int("Jumlah QTY harus berupa angka bulat"), // Validasi angka bulat
    })
  ),
});

export default TransactionsSchema;

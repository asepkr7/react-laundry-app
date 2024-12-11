import { z } from "zod";

const registerSchema = z.object({
  name: z.string().trim().min(1, "Input tidak boleh kosong"),
  email: z.string().trim().email("Email tidak valid"),
  username: z.string().trim().min(4, "Username harus 4 karakter atau lebih"),
  password: z.string().trim().min(6, "Password harus 6 karakter atau lebih"),
});

export default registerSchema;

import { z } from "zod";
const loginFormSchema = z.object({
  username: z.string().trim().min(1, "Username tidak boleh kosong"),
  password: z.string().trim().min(1, "Password tidak boleh kosong"),
});

export default loginFormSchema;

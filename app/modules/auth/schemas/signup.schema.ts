import { z } from 'zod'

export const signupSchema = z.object({
    fullname: z
        .string()
        .min(1, 'Kolom Nama Lengkap harus diisi!'),
    email: z
        .email('Alamat email tidak Valid!'),
    password: z
        .string()
        .min(8, 'Kata Sandi harus terdiri dari Minimal 8 Karakter!'),
    password_confirmation: z.string()
}).superRefine((data, ctx) => {
    if (data.password !== data.password_confirmation) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Konfirmasi Kata Sandi tidak cocok.',
            path: ['password_confirmation']
        })
    }
});
import * as z from "zod";

const formData = z.object({
    title: z
        .string()
        .min(1, "タイトルは1文字以上で入力してください")
        .max(50, "タイトルは50文字以内で入力してください"),
    comment: z
        .string()
        .min(1, "コメントは1文字以上で入力してください")
        .max(100, "コメントは100文字以内で入力してください"),
});

export { formData };
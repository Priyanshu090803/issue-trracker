import z from "@/node_modules/zod/v4/classic/external.cjs";

export const issueSchema = z.object({
    title: z.string().trim().min(1, 'Title is required!').max(255),
    description: z.string().trim().min(1, 'Description is required!')
});

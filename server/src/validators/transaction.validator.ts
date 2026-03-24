import {z} from "zod";

export const createTransactionSchema = z.object({
    title: z.string().trim().min(1, "Title is required"),
    amount: z.number().positive("Amount must be a positive number"),
    type: z.enum(["income", "expense"], {
        message: "Type must be income or expense"
    }),
    category: z.enum(["salary", "houseloan", "groceries", "utilities", "entertainment", "health", "shopping", "anonymous", "other"], {
        message: "Invalid category"
    }),
    date: z.string().min(1, "Date is required"),
    notes: z.string().optional()
});

export const updateTransactionSchema = z.object({
    title: z.string().trim().min(1, "Title is required").optional(),
    amount: z.number().positive("Amount must be a positive number").optional(),
    type: z.enum(["income", "expense"], {
        message: "Type must be income or expense"
    }).optional(),
    category: z.enum(["salary", "houseloan", "groceries", "utilities", "entertainment", "health", "shopping", "anonymous", "other"], {
        message: "Invalid category"
    }).optional(),
    date: z.string().min(1, "Date is required").optional(),
    notes: z.string().optional()
})

export const monthParamSchema = z.object({
    month: z.string()
        .regex(
            /^\d{4}-(0[1-9]|1[0-2])$/,
            "Month must be in YYYY-MM format (e.g. 2026-03)"
        )
});


export type CreateTransactionInput = z.infer<typeof createTransactionSchema>;
export type UpdateTransactionInput = z.infer<typeof updateTransactionSchema>;
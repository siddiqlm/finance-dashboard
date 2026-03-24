import {z} from "zod";

export const createSavingGoalSchema = z.object({
    title: z.string().trim().min(1, "Title is required"),
    targetAmount: z.number().positive("Target Amount must be a positive number"),
    currentAmount: z.number().positive("Current amount must be a postive number").optional(),
    deadline:z.string().nullable().optional()
}).refine(
    data => !data.currentAmount || data.currentAmount <= data.targetAmount,
    {
        message: "Current amount cannot exceed target amount",
        path: ["currentAmount"]
    }
);

export const updateSavingGoalSchema = z.object({
    title: z.string().trim().min(1, "Title is required").optional(),
    targetAmount: z.number().positive("Target Amount must be a positive number").optional(),
    deadline:z.string().nullable().optional()
})

export const contributeToGoalSchema = z.object({
    amount: z.number().positive("Amount must be a positive number")
})

export type CreateGoalInput = z.infer<typeof createSavingGoalSchema>;
export type UpdateGoalInput = z.infer<typeof updateSavingGoalSchema>;
export type ContributeGoalInput = z.infer<typeof contributeToGoalSchema>;
import { title } from "node:process";
import {z} from "zod";

export const createSavingGoalSchema = z.object({
    title: z.string().trim().min(1, "Title is required"),
    targetAmount: z.number().positive("Target Amount must be a positive number"),
    deadline:z.string().nullable().optional()
})

export const updateSavingGoalSchema = z.object({
    title: z.string().trim().min(1, "Title is required").optional(),
    targetAmount: z.number().positive("Target Amount must be a positive number").optional(),
    deadline:z.string().nullable().optional()
})

export const contributeToGoalSchema = z.object({
    amount: z.number().positive("Amount must be a positive number")
})
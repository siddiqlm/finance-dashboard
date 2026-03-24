import { SavingsGoal, Prisma } from "@prisma/client";
import { CreateGoalInput, UpdateGoalInput, ContributeGoalInput } from "../validators/goal.validator";

export interface ISavingsGoalResponse {
    id: number,
    title: string,
    targetAmount: number,
    currentAmount: number | 0,
    deadline: string | null,
    isCompleted: boolean,
    createAt: string
}

export const toGoalCreateInput = (
    data:CreateGoalInput,
    userId: number
):Prisma.SavingsGoalUncheckedCreateInput => ({
    title: data.title,
    targetAmount: data.targetAmount,
    currentAmount: data.currentAmount ?? 0,
    deadline: data.deadline ? new Date(data.deadline): null,
    userId
})

export const toGoalUpdateInput = (
    data: UpdateGoalInput,
    userId: number
):Prisma.SavingsGoalUpdateInput => ({
    ...(data.title !== undefined && {title: data.title}),
    ...(data.targetAmount !== undefined && {targetAmount: data.targetAmount}),
    ...(data.deadline !== undefined && {deadline: data.deadline ? new Date(data.deadline): null})
})

export const toGoalResponse = (
    savingsGoal: SavingsGoal 
): ISavingsGoalResponse => ({
    id: savingsGoal.id,
    title: savingsGoal.title,
    targetAmount: savingsGoal.targetAmount,
    currentAmount: savingsGoal.currentAmount,
    deadline: savingsGoal.deadline ? savingsGoal.deadline.toISOString(): null,
    isCompleted: savingsGoal.isCompleted,
    createAt: savingsGoal.createAt.toISOString()
})
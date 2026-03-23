import { SavingsGoal } from "@prisma/client";
import prisma from "../prisma/client";
import { AppError } from "../utils/AppError";
import { cleanObject } from "../utils/cleanObject";
import { CreateGoalInput } from "../validators/goal.validator";

export const getAllSavingGoals = async (userId:number) => {
    return await prisma.savingsGoal.findMany({
        where: {userId},
        orderBy: {createAt:"desc"}
    })
};

export const getSavingGoalById = async(id: number, userId: number) => {
    return await prisma.savingsGoal.findFirst({
        where: {id, userId}
    })
};

export const createSavingGoal = async(
    userId: number, 
    data: CreateGoalInput
):Promise<SavingsGoal> => {
    return await prisma.savingsGoal.create({
        data: {
            title: data.title,
            targetAmount: data.targetAmount,
            currentAmount: data.currentAmount ?? 0,
            deadline: data.deadline ? new Date(data.deadline): null,
            userId
        }
    })
};

export const deleteSavingGoal = async (id: number, userId: number) => {
    return await prisma.savingsGoal.delete({
        where: {userId, id}
    })
};

export const updateSavingGoal = async(
    id:number,
    userId: number, 
    data: {
        title?: string;
        targetAmount?: number;
        deadline?: string;
    }
):Promise<SavingsGoal> => {
    const {deadline, ...rest} = data;
    const updateData = cleanObject({
        ...rest,
        ...(deadline !==undefined && {
            deadline: deadline? new Date(deadline): null
        })
    }) 
    return await prisma.savingsGoal.update({
        where: {id, userId},
        data: updateData
    })
};

export const contributeToGoal = async (
    id: number,
    userId: number,
    data: {
        amount: number
    }
):Promise<SavingsGoal> => {
    const goal = await prisma.savingsGoal.findFirst({
        where:{id, userId}
    });
    if(!goal){
        throw new AppError("Goal not found", 404);
    }
    const newAmount = goal.currentAmount + data.amount;
    
    if(goal.currentAmount >= goal.targetAmount){
        throw new AppError("This goal is already completed", 400);
    }

    return await prisma.savingsGoal.update({
        where:{id, userId},
        data: {
            currentAmount: newAmount,
            isCompleted: newAmount >= goal.targetAmount
        }
    })
}
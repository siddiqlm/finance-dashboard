import { Prisma, SavingsGoal } from "@prisma/client";
import prisma from "../prisma/client";
import { AppError } from "../utils/AppError";

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
    data: {
        title: string;
        targetAmount: number;
        currentAmount: number;
        deadline?: string;
        userId: number,
        isCompleted: boolean,
    }
):Promise<SavingsGoal> => {
    const createData:any = {...data};
    if(data.deadline !== undefined){
        createData.deadline = data.deadline ? new Date(data.deadline): null;
    }
    else{
        delete createData.deadline
    }
    return await prisma.savingsGoal.create({
        data: {
            ...createData,
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
    const updateData:any = {...data};
    if(data.deadline !== undefined){
        updateData.deadline = data.deadline? new Date(data.deadline): null;
    }
    else{
        delete updateData.deadline
    }
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
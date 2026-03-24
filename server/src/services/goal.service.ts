import prisma from "../prisma/client";
import { CreateGoalInput, UpdateGoalInput, ContributeGoalInput } from "../validators/goal.validator";
import { toGoalCreateInput, toGoalUpdateInput, toGoalResponse, ISavingsGoalResponse } from "../mappers/goal.mapper";
import { AppError } from "../utils/AppError";
import logger from "../utils/logger";
import { Prisma, SavingsGoal } from "@prisma/client";
import { cleanObject } from "../utils/cleanObject";


export const getAllSavingGoals = async (
    userId:number
):Promise<ISavingsGoalResponse[]> => {
    logger.info(`[GoalServide] Fetching all goals for userId: ${userId} `);
    const savingsGoals = await prisma.savingsGoal.findMany({
        where: {userId},
        orderBy: {createAt:"desc"}
    })
    return savingsGoals.map(toGoalResponse);
};

export const getSavingGoalById = async(
    id: number, 
    userId: number
):Promise<ISavingsGoalResponse> => {
    logger.info(`[GoalServide] Fetching goal for id: ${id} userId: ${userId} `);
    const savingsGoal = await prisma.savingsGoal.findFirst({
        where: {id, userId}
    })
    if(!savingsGoal) throw new AppError("Goal not found", 404);
    return toGoalResponse(savingsGoal);
};

export const createSavingGoal = async(
    userId: number, 
    data: CreateGoalInput
):Promise<ISavingsGoalResponse> => {
    logger.info(`[GoalServide] Creating a goal for userId: ${userId} `);
    const savingsGoal =  await prisma.savingsGoal.create({
        data: toGoalCreateInput(data, userId)
    })
    return toGoalResponse(savingsGoal);
};

export const updateSavingGoal = async(
    id:number,
    userId: number, 
    data: UpdateGoalInput
):Promise<ISavingsGoalResponse> => {
    logger.info(`[GoalServide] Updating the goal for id: ${id} for userId: ${userId} `);
    const savingsGoal = await prisma.savingsGoal.update({
        where: {id, userId},
        data: toGoalUpdateInput(data,userId)
    })
    return toGoalResponse(savingsGoal);
};

export const deleteSavingGoal = async (
    id: number, 
    userId: number
):Promise<void> => {
    logger.info(`[GoalServide] Deleting the goal for id: ${id} for userId: ${userId} `);
    await prisma.savingsGoal.delete({
        where: {userId, id}
    })
};



export const contributeToGoal = async (
    id: number,
    userId: number,
    data: ContributeGoalInput
):Promise<ISavingsGoalResponse> => {
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

    const savingsGoal =  await prisma.savingsGoal.update({
        where:{id, userId},
        data: {
            currentAmount: newAmount,
            isCompleted: newAmount >= goal.targetAmount
        }
    })
    return toGoalResponse(savingsGoal);
}
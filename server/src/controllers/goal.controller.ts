import { Request, Response, NextFunction } from "express";
import * as SavingsGoalService from "../services/goal.service";
import { AppError } from "../utils/AppError";

export const getAllSavingGoals = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const savingsGoals = await SavingsGoalService.getAllSavingGoals(1);
        res.json(savingsGoals);
    } catch (error) {
        next(error);
    }
};

export const getSavingGoalById = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id as string);
        if (isNaN(id)){
            throw new AppError("Invalid ID", 400);
        }
        const savingsGoal = SavingsGoalService.createSavingGoal(1, req.body);
        if(!savingsGoal){
            throw new AppError("Saving Goal Not Found", 404);
        }
        res.json(savingsGoal);
    } catch (error) {
        next(error)
    }
}

export const createSavingGoal = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const body = req.body;
        const savingsGoal = await SavingsGoalService.createSavingGoal(1,body);
        res.status(201).json(savingsGoal);
    } catch (error) {
        next(error);
    }
}

export const updateSavingGoal = async(req: Request, res:Response, next:NextFunction) => {
    try {
        const id = parseInt(req.params.id as string);
        if(isNaN(id)){
            throw new AppError("Invalid ID", 404);
        }
        const savingsGoal =  await SavingsGoalService.updateSavingGoal(id, 1, req.body);
        if(!savingsGoal) {
            throw new AppError("Saving Goal Not Found", 404)
        }
        res.status(200).json({message:"Saving Goal updated successfully", data: savingsGoal});
    } catch (error) {
        next(error);
    }
}

export const contributeToGoal = async(req: Request, res: Response, next: NextFunction) =>{
    try {
        const id = parseInt(req.params.id as string);
        if(isNaN(id)){
            throw new AppError("Invalid ID", 404);
        }
        const savingsGoal = await SavingsGoalService.contributeToGoal(id, 1, req.body);
        if(!savingsGoal){
            throw new AppError("Savings Goal not found", 404);
        }
        res.status(200).json({message: "Contribution added to the goal successfully", data: savingsGoal})
    } catch (error) {
        next(error)
    }
}

export const deleteSavingGoal = async(req:Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id as string)
        if(isNaN(id)){
            throw new AppError("Invalid Id", 404);
        }
        await SavingsGoalService.deleteSavingGoal(id, 1);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
}
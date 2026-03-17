import {Request, Response, NextFunction} from "express";
import * as TransactionService from "../services/transaction.service";
import { AppError } from "../utils/AppError";

export const getAllTransactions = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const transactions = await TransactionService.getAllTransactions(1);
        res.json(transactions)
    } catch (error){
        next(error);
    }  
};

export const getTransactionById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id as string);
        if(isNaN(id)){
            throw new AppError("Invalid ID", 400);
        }
        const transaction = await TransactionService.getTransactionById(id, 1);
        if(!transaction){
            throw new AppError("Invalid Transaction not found", 400);
        }
        res.json(transaction);
    } catch (error) {
        next(error);
    }
};

export const createTransaction = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const body = req.body;
        const transaction = await TransactionService.createTransaction(1, req.body);
        res.status(201).json(transaction);
    } catch (error) {
        next(error)
    }
};

export const updateTransaction = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id as string);
        if(isNaN(id)){
            throw new AppError("Invalid ID", 400);
        }
        const body = req.body;
        const transaction = await TransactionService.updateTransaction(id, 1, body);
        res.status(200).json({message: `Transaction ${id} updated`, data: transaction});
    } catch (error) {
        next(error);
    }
};

export const deleteTransaction = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id as string);
        if(isNaN(id)){
            throw new AppError("Invalid ID", 400);
        }
        await TransactionService.deleteTransaction(id, 1);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
}
import prisma from "../prisma/client";
import { CreateTransactionInput, UpdateTransactionInput } from "../validators/transaction.validator";
import { toTransactionCreateInput, toTransactionUpdateInput, toTransactionResponse, toMonthlySummary, ITransactionResponse, IMonthlySummary } from "../mappers/transaction.mapper";
import { AppError } from "../utils/AppError";
import logger from "../utils/logger";

export const getAllTransactions = async (userId: number): Promise<ITransactionResponse[]> =>{
    logger.info(`[TransactionService] Fetching all transaction for userId: ${userId} `);
    const transactions = await prisma.transaction.findMany({
        where: {userId},
        orderBy: {date: "desc"}
    })
    return transactions.map(toTransactionResponse);
};

export const getTransactionById = async (id: number, userId: number):Promise<ITransactionResponse> => {
    logger.info(`[TransactionService] Fetching transaction for id: ${id} and userId: ${userId} `);
    const transaction = await prisma.transaction.findFirst({
        where: {id, userId}
    })
    if(!transaction) throw new AppError("Transaction Not Found", 404);
    return toTransactionResponse(transaction);
};

export const createTransaction = async (
    userId: number,
    data: CreateTransactionInput
):Promise<ITransactionResponse> => {
    logger.info(`[TransactionService] Creating transaction for userId: ${userId} `);
    const transaction = await prisma.transaction.create({
        data: toTransactionCreateInput(data, userId)
    })
    return toTransactionResponse(transaction);
};

export const updateTransaction = async (
    id: number,
    userId: number,
    data: UpdateTransactionInput
):Promise<ITransactionResponse> => {
    logger.info(`[TransactionService] Updating transaction for id: ${id} and userId: ${userId} `);
    const transaction = await prisma.transaction.update({
        where: {id, userId},
        data: toTransactionUpdateInput(data)
    });
    return toTransactionResponse(transaction)
};

export const deleteTransaction = async (id: number, userId:number):Promise<void> => {
    logger.info(`[TransactionService] Deleting transaction for id: ${id} and userId: ${userId} `);
    await prisma.transaction.delete({
        where: {id, userId}
    })
}

export const getMonthlySummary = async(
    userId: number, 
    month: string
): Promise<IMonthlySummary> => {
    logger.info(`[TransactionService] Fetching monthly summary for userId: ${userId} and month: ${month} `);
    
    const startDate = new Date(`${month}-01`);
    const endDate = new Date(startDate.getFullYear(), startDate.getMonth()+1, 0);

    const transactions = await prisma.transaction.findMany({
        where: {
            userId,
            date: {
                gte: startDate,
                lte: endDate
            }
        }
    })
    return toMonthlySummary(transactions, month);
}


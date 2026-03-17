import prisma from "../prisma/client";
import {TransactionType, Category} from "../types";

export const getAllTransactions = async (userId: number) =>{
    return await prisma.transaction.findMany({
        where: {userId},
        orderBy: {date: "desc"}
    })
};

export const getTransactionById = async (id: number, userId: number) => {
    return await prisma.transaction.findFirst({
        where: {id, userId}
    })
};

export const createTransaction = async (
    userId: number,
    data: {
        title: string,
        amount: number,
        type: TransactionType,
        category: Category,
        date: string,
        notes?: string
    }
) => {
    return await prisma.transaction.create({
        data: {
            ...data,
            date: new Date(data.date),
            userId
        }
    })
};

export const deleteTransaction = async (id: number, userId:number) => {
    return await prisma.transaction.delete({
        where: {id, userId}
    })
}

export const updateTransaction = async (
    id: number,
    userId: number,
    data: {
        title?: string,
        amount?: number,
        type?: TransactionType,
        category?: Category,
        date?: string,
        notes?: string
    }
) => {
    const updateData:any = {...data};
    if(data.date){
        updateData.date = new Date(data.date)
    }
    else{
        delete updateData.date
    }
    return await prisma.transaction.update({
        where: {id, userId},
        data: updateData
    });
};
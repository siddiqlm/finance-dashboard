import { Transaction, Prisma } from "@prisma/client";
import { CreateTransactionInput, UpdateTransactionInput } from "../validators/transaction.validator";
import { Category, TransactionType } from "../types";

export interface ITransactionResponse {
    id: number,
    title: string,
    amount: number,
    type: TransactionType,
    category: Category,
    date: string,
    notes: string | null,
    createAt: string
}

export interface IMonthlySummary {
    month: string,
    totalIncome: number,
    totalExpenses: number,
    balance: number,
    byCategory: Record<Category, number>
}

export const toTransactionCreateInput = (
    data:CreateTransactionInput,
    userId: number
):Prisma.TransactionUncheckedCreateInput => ({
    title: data.title,
    amount: data.amount,
    type: data.type,
    category: data.category,
    date: new Date(data.date),
    notes: data.notes ?? null,
    userId
})


export const toTransactionUpdateInput = (
    data:UpdateTransactionInput
):Prisma.TransactionUpdateInput => ({
    ...(data.title !== undefined && {title:data.title}),
    ...(data.amount !== undefined && {amount:data.amount}),
    ...(data.type !== undefined && {type:data.type}),
    ...(data.category !== undefined && {category:data.category}),
    ...(data.date !== undefined && {date: new Date(data.date)}),
    ...(data.notes !== undefined && {notes:data.notes})
});

export const toTransactionResponse = (
    transaction: Transaction
): ITransactionResponse => ({
    id: transaction.id,
    title: transaction.title,
    amount: transaction.amount,
    type: transaction.type as TransactionType,
    category: transaction.category as Category,
    date: transaction.date.toISOString(),
    notes: transaction.notes ?? null,
    createAt: transaction.createAt.toISOString()
})

export const toMonthlySummary = (
    transactions:Transaction[],
    month: string
): IMonthlySummary => {
    const totalIncome = transactions
        .filter(t=> t.type === "income")
        .reduce((sum,t) => sum+t.amount, 0);

    const totalExpenses = transactions
        .filter(t=> t.type === "expense")
        .reduce((sum,t) => sum+t.amount, 0);

    const byCategory = transactions.reduce((acc,t) => ({
        ...acc,
        [t.category]: (acc[t.category] ?? 0) + t.amount
    }), {} as Record<string, number>);

    return {
        month,
        totalIncome,
        totalExpenses,
        balance: totalIncome-totalExpenses,
        byCategory
    }
}
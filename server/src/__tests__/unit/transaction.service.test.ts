import { createTransaction, updateTransaction, getAllTransactions, deleteTransaction } from "../../services/transaction.service";
import prisma from "../../prisma/client";


// Mock the entire Prisma client
jest.mock("../../prisma/client", () => ({
    transaction: {
        findMany: jest.fn(),
        findFirst: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn()
    }

}));

describe("Transaction Service", () => {
    //Reset all mocks befor each test
    beforeEach(() => {
        jest.clearAllMocks();
    })

    // ---getAllTransactions---
    describe("getAllTransactions", () => {
        it("Should return all transactions for a user", async() => {
            const mockTransations = [
                {
                    id: 1,
                    title: "Salary",
                    amount: 5000,
                    type: "income",
                    category: "salary",
                    date: new Date("2026-03-01"),
                    note: null,
                    userId: 1,
                    createdAt: new Date()
                }
            ];

            //Tell the mock what to run
            (prisma.transaction.findMany as jest.Mock).mockResolvedValue(mockTransations);

            const result = await getAllTransactions(1);

            expect(result).toEqual(mockTransations);
            expect(prisma.transaction.findMany).toHaveBeenCalledWith({
                where: {userId: 1},
                orderBy: {date: "desc"}
            });
        });

        it("Should return empty array when no transaction exist", async() => {
            (prisma.transaction.findMany as jest.Mock).mockResolvedValue([]);

            const result = await getAllTransactions(1);
            
            expect(result).toEqual([]);
        })
    })

    // --- CreateTransaction ---
    describe("CreateTransaction", () => {
        it("Should create transaction successfully", async ()  => {
            const input = {
                title: "March Salary",
                amount: 5000,
                type: "income" as const,
                category: "salary" as const,
                date: "2025-03-01",
                notes: "Monthly salary"
            };

            const mockCreated = {
                id: 1,
                ...input,
                date: new Date(input.date),
                userId: 1,
                createdAt: new Date()
            };

            (prisma.transaction.create as jest.Mock).mockResolvedValue(mockCreated);

            const result = await createTransaction(1, input);
             
            expect(result).toEqual(mockCreated);
            expect(prisma.transaction.create).toHaveBeenCalledTimes(1);
        });
    });

    // --- Delete Transaction ---
    describe("DeleteTransaction", () => {
        it("Should delete transaction successfully", async () => {
            (prisma.transaction.delete as jest.Mock).mockResolvedValue({id: 1});

            await deleteTransaction(1, 1);

            expect(prisma.transaction.delete).toHaveBeenCalledWith({
                where: {id: 1, userId: 1}
            })
        })
    })
})
import { getAllSavingGoals, getSavingGoalById, createSavingGoal, updateSavingGoal, deleteSavingGoal, contributeToGoal } from "../../services/goal.service";
import prisma from "../../prisma/client";

jest.mock("../../prisma/client", () => ({
    savingsGoal: {
        findMany: jest.fn(),
        findFirst: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn()
    }
}))

describe("Savings Goal Service", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    })
    describe("getAllSavingGoals", () =>{
        it("Should return all savings goal", async () => {
            const mockSavingsGoals = [{
                id: 1,
                userId: 1,
                title: "Test title",
                targetAmount: "10000",
                deadLine: "2026-12-31"
            }];
            (prisma.savingsGoal.findMany as jest.Mock).mockResolvedValue(mockSavingsGoals);
            const result = await getAllSavingGoals(1);
            expect(result).toEqual(mockSavingsGoals);
            expect(prisma.savingsGoal.findMany as jest.Mock).toHaveBeenCalledWith({
                where: {userId: 1},
                orderBy: {createAt: "desc"}
            })
        })
    })
})


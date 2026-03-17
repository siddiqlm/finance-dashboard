export type Category = 
| "salary"
| "houseloan"
| "groceries"
| "utilities"
| "entertainment"
| "health"
| "shopping"
| "anonymous"
| "other";

export type TransactionType = "income" | "expense";

export type Transaction = {
    id: number;
    title: string;
    amount: number;
    type: TransactionType;
    category: Category;
    date: string;
    notes?: string;
    userId: number
}

export type SavingsGoal = {
    id: number;
    title: string;
    targetAmount: number;
    currentAmount: number;
    deadline?: string;
    userId: number
}

export type User = {
    id: number;
    name: string;
    email: string;
    password: string;
    createdAt: string;
}

export type MonthlySummary = {
    month: string;
    totalIncome: number;
    totalExpenses: number;
    balance: number;
    byCategory: Record<Category, number>;
}

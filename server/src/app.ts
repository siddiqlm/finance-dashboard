import express, {Application, Request, Response} from "express";
import { errorHandler } from "./middleware/error.middleware";
import transactionRoutes from "./routes/transaction.routes";
import savingsGoalRoutes from "./routes/goal.routes";

const app: Application = express();

//Middleware to parse incoming JSON requests
app.use(express.json());

app.get('/health', (req:Request, res:Response) => {
    res.json({status: "ok", message: "Finance dashboard API is running"});
});

app.use("/api/transactions", transactionRoutes);
app.use("/api/savings-goal", savingsGoalRoutes);

//Must be at last
app.use(errorHandler)

export default app;
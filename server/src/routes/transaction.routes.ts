import {Router} from "express";
import {
    getAllTransactions,
    getTransactionById,
    createTransaction,
    updateTransaction,
    deleteTransaction,
    getMonthlySummary
} from "../controllers/transaction.controller";
import { validate, validateParams } from "../middleware/validator.middleware";
import {createTransactionSchema, updateTransactionSchema, monthParamSchema} from "../validators/transaction.validator"

const router = Router();

router.get('/', getAllTransactions);
router.get('/:id', getTransactionById);
router.post('/', validate(createTransactionSchema), createTransaction);
router.put('/:id', validate(updateTransactionSchema), updateTransaction);
router.delete('/:id', deleteTransaction);
router.get("/summary/:month", validateParams(monthParamSchema), getMonthlySummary);

export default router;
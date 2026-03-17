import {Router} from "express";
import {
    getAllTransactions,
    getTransactionById,
    createTransaction,
    updateTransaction,
    deleteTransaction
} from "../controllers/transaction.controller";
import { validate } from "../middleware/validator.middleware";
import {createTransactionSchema, updateTransactionSchema} from "../validators/transaction.validator"

const router = Router();

router.get('/', getAllTransactions);
router.get('/:id', getTransactionById);
router.post('/', validate(createTransactionSchema), createTransaction);
router.put('/:id', validate(updateTransactionSchema), updateTransaction);
router.delete('/:id', deleteTransaction);

export default router;
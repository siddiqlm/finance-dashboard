import { Router } from "express";
import { 
    createSavingGoal, 
    updateSavingGoal, 
    deleteSavingGoal, 
    getAllSavingGoals, 
    getSavingGoalById,
    contributeToGoal 
} from "../controllers/goal.controller";
import { validate } from "../middleware/validator.middleware";
import { createSavingGoalSchema, updateSavingGoalSchema, contributeToGoalSchema } from "../validators/goal.validator";

const router = Router();

router.get('/', getAllSavingGoals);
router.get('/:id', getSavingGoalById);
router.post('/', validate(createSavingGoalSchema), createSavingGoal);
router.put('/:id', validate(updateSavingGoalSchema), updateSavingGoal);
router.patch('/:id/contribute', validate(contributeToGoalSchema), contributeToGoal)
router.delete('/:id', deleteSavingGoal);

export default router;
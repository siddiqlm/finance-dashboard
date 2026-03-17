import {Request, Response, NextFunction} from "express";
import {ZodType} from "zod";

export const validate =  (schema: ZodType) => {
    return(Req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(Req.body);
        if(!result.success){
            res.status(404).json({
                message: "Validation failed",
                errors: result.error.issues.map(err => ({
                    field: err.path.join("."),
                    message: err.message
                }))
            })
            return;
        }
        //Replace req.body with validated any typed data
        Req.body = result.data;
        next();
    }
}
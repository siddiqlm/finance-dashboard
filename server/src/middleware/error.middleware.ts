import {Request, Response, NextFunction} from "express";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { AppError } from "../utils/AppError";
import logger from "../util/logger";

export const errorHandler = (
    error: unknown,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    //1. Our own internal errors
    if(error instanceof AppError){
        logger.warn(`${error.statusCode} - ${error.message}`);
        res.status(error.statusCode).json({message: error.message});
        return;
    }

    //2. Prisma Known Errors
    if(error instanceof PrismaClientKnownRequestError){
        switch(error.code){
            case 'P2025':
                logger.warn("Record not found");
                res.status(404).json({message: "Record not found"});
                return;
            case 'P2002':
                logger.warn("Duplicate entry");
                res.status(409).json({message: "This record already exists"});
                return;
            case 'P2003':
                logger.warn("Foreign key constrain failed");
                res.status(400).json({message: "Related record not found"});
                return;
        }
    }

    //3. Unknows/Unexpected errors
    if(error instanceof Error){
        logger.error(`Unexpected error: ${error.message}`)
    }
    res.status(500).json({message: "Internal server error"})
};
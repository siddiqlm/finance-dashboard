import {createLogger,  format, transports} from "winston";

const logger = createLogger({
    level: process.env.LOG_LEVEL || "info",
    format: format.combine(
        format.timestamp ({format: "YYYY-MM-DD HH:mm:ss"}),
        format.colorize(),
        format.printf(({timestamp, level, message, ...meta})=>{
            return `${timestamp} [${level}]: ${message} ${
                Object.keys(meta).length? JSON.stringify(meta): ""
            }`;
        })
    ),
    transports: [
        //Print to terminal
        new transports.Console(),
        //Save error to a file
        new transports.File({filename: "logs/error.log", level:"error"}),
        //Save everthing to a file
        new transports.File({filename: "logs/combined.log"})
    ]
})
export default logger;
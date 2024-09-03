import {createLogger, format, transports} from "winston";

const customFormat = format.combine(
    format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
    format.printf(({timestamp, level, message}) => {
            return `[${timestamp}] [${level.toUpperCase()}]: ${message}`
        }
    )
);

const logger = createLogger({
    level: 'info',
    format: customFormat,
    transports: [new transports.Console(),
        new transports.File({filename: 'test-results/app.log'}),]
})

export default logger
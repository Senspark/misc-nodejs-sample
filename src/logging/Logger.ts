import winston from 'winston';

interface ILogger {
    info(message: string, ...meta: any[]): void;

    error(message: string, ...meta: any[]): void;

    err(err: any): void;
}

class WinstonLogger implements ILogger {
    private readonly _logger;

    public constructor(logger: winston.Logger) {
        this._logger = logger;
    }

    public info(message: string, ...meta: any[]): void {
        this._logger.info(message, meta);
    }

    public error(message: string, ...meta: any[]): void {
        this._logger.error(message, meta);
    }

    err(err: any): void {
        this._logger.error(err);
    }
}

class ConsoleLogger implements ILogger {
    info(message: string, ...meta: any[]): void {
        console.log(message, meta);
    }

    error(message: string, ...meta: any[]): void {
        console.error(message, meta);
    }

    err(err: any): void {
        console.error(err);
    }
}

export {
    ILogger,
    WinstonLogger,
    ConsoleLogger,
}
import cors from "cors";
import express, {Express, NextFunction, Request, Response} from 'express';
import type {ErrorRequestHandler} from 'express';
import {ILogger} from "./logging/Logger";
import {IConfig} from "./data/Config";
import listEndpoints from "express-list-endpoints";
import ErrorCode from "./data/ErrorCode";
import SampleHandler from "./handlers/SampleHandler";

/**
 * Express Wrapper
 */
class App {
    private readonly _logger: ILogger;
    private readonly _config: IConfig;
    private readonly _app: Express;
    private readonly _sampleHandler: SampleHandler;

    public constructor(
        logger: ILogger,
        config: IConfig,
    ) {
        this._logger = logger;
        this._config = config;
        this._sampleHandler = new SampleHandler(logger);

        this._app = express();
        this._app.use(cors());
    }

    public useBodyLimit() {
        // For POST requests.
        this._app.use(express.json({
            limit: '1mb',
        }));
    }

    public initializeHealthCheck() {
        // For App Engine warm up.
        this._app.get(`/_ah/warmup`, (request, response) => {
            response.sendStatus(200);
        });

        // Health check.
        this._app.get(`/`, (request, response) => {
            response.sendStatus(200);
        });
    }

    public initializeRoutes() {
        const router = express.Router();
        router.get(`/sample-get`, this._sampleHandler.sampleGet);
        router.post(`/sample-post`, this._sampleHandler.samplePost);
        this._app.use(`/`, router);
    }

    public useErrorHandlers() {
        // Error handler.
        this._app.use(((err, request, response, next) => {
            this._logger.error(err.message, err.stack?.split(`\n`));
            response.status(err.httpCode ?? 500).send({
                code: err.code ?? ErrorCode.CODE_INTERNAL,
                message: err.message,
            });
        }) as ErrorRequestHandler);
    }

    public useLogAllIncomingRequest() {
        // Log ra tất cả các request được gọi đến
        this._app.use((req: Request, res: Response, next: NextFunction) => {
            if (req.url !== "/") {
                // console.info("----------------------------------------");
                console.info(`Incoming request: ${req.method} ${req.url}`);
                // console.info("Parameters:", req.params);
                // console.info("Body:", req.body);
                // console.info("JWT Token:", req.headers.authorization);
                // console.info("----------------------------------------");
            }

            next();
        });
    }

    public start() {
        const port = this._config.serverPort;
        this._app.listen(port, () => {
            this._logger.info(`Server listening at port ${port}`);
        });

        this.logAllTheRoutes();
    }

    private logAllTheRoutes() {
        console.info('All routes: ----------------------------------------');
        console.info(listEndpoints(this._app));
        console.info('----------------------------------------------------');
    }
}

export {
    App,
}
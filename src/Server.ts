import { App } from './App';
import { EnvConfig } from './data/Config';
import {ConsoleLogger, WinstonLogger} from './logging/Logger';

const config = new EnvConfig();
// const logger = new WinstonLogger(winston.createLogger({
//   transports: [new SimpleConsoleTransport()],
// }));
const logger = new ConsoleLogger();

const app = new App(logger, config);
app.useBodyLimit();
app.initializeHealthCheck();
app.initializeRoutes();
app.useErrorHandlers();
app.useLogAllIncomingRequest();
app.start();


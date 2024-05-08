import dotenv from 'dotenv';
import {bool, cleanEnv, num, str} from "envalid";

dotenv.config();

enum RunTimeEnv {
    Production = `prod`,
    Test = `test`,
    Local = `local`,
}

export interface IConfig {
    isGcp: boolean;
    isProduction: boolean;
    serverPort: number;
}

export class EnvConfig implements IConfig {
    env = cleanEnv(process.env, {
        IS_GCLOUD: bool(),
        RUNTIME_ENV: str({choices: [RunTimeEnv.Production, RunTimeEnv.Test, RunTimeEnv.Local]}),
        PORT: num({default: 8080}),
    });

    isGcp = this.env.IS_GCLOUD;
    isProduction = this.env.RUNTIME_ENV === RunTimeEnv.Production;
    serverPort = this.env.PORT;
}
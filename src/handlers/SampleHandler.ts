import {Request, Response} from "express";
import ErrorCode from "../data/ErrorCode";
import {ILogger} from "../logging/Logger";

export default class SampleHandler {
    constructor(private readonly _logger: ILogger) {
    }

    async sampleGet(request: Request, response: Response) {
        const query = request.query;
        const name = query.name as string | undefined;
        response.send({
            code: ErrorCode.CODE_OK,
            message: `Hello ${name}`,
        });
    }

    async samplePost(request: Request, response: Response) {
        try {
            const body = request.body;

            if (!body) {
                throw Error(`No request body`);
            }

            const name = body.name as string | undefined;

            response.send({
                code: ErrorCode.CODE_OK,
                message: `Hello ${name}!`,
            });
        } catch (e: any) {
            this._logger.err(e);
            response.status(400).send({
                code: ErrorCode.CODE_INTERNAL,
                message: `ERROR`,
            });
        }
    }
}
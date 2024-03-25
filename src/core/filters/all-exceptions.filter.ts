import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    constructor(private readonly httpAdapterHost: HttpAdapterHost) { }

    catch(exception: HttpException, host: ArgumentsHost): void {
        // In certain situations `httpAdapter` might not be available in the
        // constructor method, thus we should resolve it here.
        const { httpAdapter } = this.httpAdapterHost;

        const ctx = host.switchToHttp();

        const exceptionType = exception.name;
        let statusCode = HttpStatus.BAD_REQUEST;
        let message = exception.message;

        if (exception instanceof HttpException) {
            statusCode = exception.getStatus();
            // @ts-ignore
            message = exception.getResponse().message;
        }

        const responseBody = { statusCode, error: exceptionType, message };
        httpAdapter.reply(ctx.getResponse(), responseBody, statusCode);
    }
}
import {BaseRequest, BaseResponse} from "..";

export abstract class BaseHandler<TRequest extends BaseRequest, TResponse extends BaseResponse> {

    handle(request: TRequest): any {
        try {
            const validationErrors: string[] = this.validateCore(request);
            if (validationErrors.length > 0) return { validationErrors: validationErrors };
            return this.handleCore(request);
        } catch (e) {
            return { errors: ['An error has occured'] };
        }
    }

    validate(request: TRequest): string[] {
        return this.validateCore(request);
    }

    abstract handleCore(request: TRequest): TResponse;

    abstract validateCore(request: TRequest): string[];

}

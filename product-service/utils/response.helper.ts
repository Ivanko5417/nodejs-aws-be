import { NotFound } from '../exceptions';

export const processError = (error: Error) => {
    let statusCode: number = 500;
    let message: string = 'Internal Server Error';
    if (error instanceof NotFound) {
        statusCode = 404;
        message = error.message;
    }

    return {
        statusCode,
        body: JSON.stringify({ message })
    };
};

export const processResponse = (data: any) => {
    return {
        statusCode: 200,
        body: JSON.stringify(data)
    };
};

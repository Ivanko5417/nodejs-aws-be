import { NotFound, ValidationError } from '../exceptions';

export const HEADERS = {
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
};

export const processError = (error: Error) => {
    console.log(error);
    let statusCode: number = 500;
    let message: string = 'Internal Server Error';
    if (error instanceof NotFound) {
        statusCode = 404;
        message = error.message;
    }

    if (error instanceof ValidationError) {
        statusCode = 400;
        message = error.message;
    }

    return {
        statusCode,
        headers: HEADERS,
        body: JSON.stringify({ message })
    };
};

export const processResponse = (data: any) => {
    return {
        statusCode: 200,
        headers: HEADERS,
        body: JSON.stringify(data)
    };
};

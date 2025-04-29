export class APIError extends Error {
    code: number;

    constructor(message: string, code: number = 400) {
        super(message);

        this.code = code
        this.name = 'APIError';
    }
}

export const removeNullValues = (input: Record<string, string | null>): Record<string, string> =>
    Object.fromEntries(Object.entries(input).filter(([_, value]) => value !== null)) as Record<string, string>;


export async function sendRequest(uri: string, init?: RequestInit, params?: Record<string, string | null>): Promise<any> {
    let urlParams = '';
    if (params) {
        const cleanParams = removeNullValues(params);

        if (Object.keys(cleanParams).length > 0) {
            urlParams = '?' + new URLSearchParams(cleanParams).toString()
        }
    }

    let response;
    if (typeof window === 'undefined') {
        try {
            response = await fetch(`${process.env.API_URL_ENDPOINT as string}${uri}${urlParams}`, init);
        } catch (e) {
            if (e instanceof TypeError) {
                throw new APIError('Сервис недоступен', 502);
            } else {
                throw e;
            }
        }
    } else {
        response = await fetch(`/api${uri}${urlParams}`, init);
    }

    let data;
    try {
        data = await response.json();
    } catch (e) {
        if (typeof window !== 'undefined') {
            if (e instanceof SyntaxError) {
                throw new APIError('Сервис недоступен', 502);
            } else {
                throw e;
            }
        }
    }

    if (data.type === 'success') {
        return data['data'];
    } else {
        throw new APIError(data.detail || data.message, response.status);
    }
}
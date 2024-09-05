import {sendRequest} from "@/lib/api/base";

export async function getToken(email: string, password: string): Promise<string> {
    const data = await sendRequest('/journal/token', undefined, {
        email,
        password
    });

    return data['token'] as string;
}

export type Child = {
    education_name: string;
    education_id: number;
    group_name: string;
    group_id: number;
    id: number;
    first_name: string;
    surname: string;
    middle_name: string;
    uid: string;
}

export async function getChildren(token: string): Promise<Child[]> {
    return await sendRequest('/journal/children', undefined, {
        token
    })
}
import {sendRequest} from "@/lib/api/base";

export async function getToken(email: string, password: string): Promise<string> {
    const data = await sendRequest('/journal/token', undefined, {
        email,
        password
    });

    return data['token'] as string;
}

export type Period = {
    id: number;
    name: string;
    from: string;
    to: string;
};

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
    periods: Period[];
}

export async function getChildren(token: string): Promise<Child[]> {
    return await sendRequest('/journal/children', {
        headers: {
            'X-Api-Token': token
        }
    })
}

export async function getACS(token: string, educationId: number): Promise<Child[]> {
    return await sendRequest(`/journal/children/${educationId}/acs`, {
        headers: {
            'X-Api-Token': token
        }
    })
}

export type Subject = {
    id: number;
    name: string;
    marks: {
        id: number;
        date: string;
        value: number;
        why: string;
        comment: string | null;
    }[];
}

export async function getSubjects(token: string, educationId: number, dateFrom: string, dateTo: string): Promise<Subject[]> {
    return await sendRequest(`/journal/children/${educationId}/subjects`, {
        headers: {
            'X-Api-Token': token
        }
    }, {
        date_from: dateFrom,
        date_to: dateTo
    })
}

export async function getSchedule(token: string, educationId: number): Promise<Child[]> {
    return await sendRequest(`/journal/children/${educationId}/schedule`, {
        headers: {
            'X-Api-Token': token
        }
    })
}
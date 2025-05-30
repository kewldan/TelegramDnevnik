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

export type ACSItem = {
    id: string;
    dir: 'i' | 'o';
    date: string;
}

export async function getACS(token: string, educationId: number): Promise<ACSItem[]> {
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
        value: string;
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

export type Teacher = {
    id: number;
    name: string;
    position: string;
    subjects: {
        id: number;
        name: string;
    }[];
}

export async function getTeachers(token: string, educationId: number): Promise<Teacher[]> {
    return await sendRequest(`/journal/children/${educationId}/teachers`, {
        headers: {
            'X-Api-Token': token
        }
    })
}

export type FinanceItem = {
    id: string;
    name: string;
    balance: number;
    customer: string;
}

export async function getFinance(token: string, hashUid: string): Promise<FinanceItem[]> {
    return await sendRequest(`/journal/children/${hashUid}/finance`, {
        headers: {
            'X-Api-Token': token
        }
    })
}
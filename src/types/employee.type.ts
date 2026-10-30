export interface Employee {
    id: number;
    name: string;
    email: string;
    created_at: Date;
}

export interface CreateEmployeeInput {
    name: string;
    email: string;
}

export interface UpdateEmployeeInput {
    name?: string;
    email?: string;
}
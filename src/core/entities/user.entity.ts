export class User {
    email: string;
    password?: string;
    type: string;
    is_verified_email?: boolean;
    is_verified_phone?: boolean;
    status?: string;
    created_by?: any;
}
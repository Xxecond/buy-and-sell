export type User = {
    id:number;
    email: string;
    name: string;
};

export type LoginResponse = {
    token: string,
    user: User;
};  

export type ApiError = {
    error?: string;
    message?: string;
};


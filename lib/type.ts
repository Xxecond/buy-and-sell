export type User = {
    id:number;
    email: string;
    name: string;
    role: string;
};

export type LoginResponse = {
    token: string,
    user: User;
};  

export type ApiError = {
    error?: string;
    message?: string;
};

export type Layout = {
    children: React.ReactNode;
}

export type CartItem = {
  id:number;
  name:string;
  price:number;
  size:string;
  color:string;
  quantity:number;
  image:string;
};
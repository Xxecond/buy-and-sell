export type User = {
    id:number;
    email: string;
    name: string;
    role: string;
};

export type LoginResponse = {
  message: string;
  user: User;
};

export type SignupResponse = {
  message: string;
};

export type CheckVerificationResponse = {
  verified: boolean;
  token?: string;
  user?: User;
};

export type ResendVerificationResponse = {
  message: string;
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
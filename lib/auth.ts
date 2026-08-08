import api from "./api";
import { User } from "./type";
import { AxiosError } from "axios";

export type LoginResponse = {
  message: string;
  user: User;
};

export type SignupResponse = {
  message: string;
};

export type ResendVerificationResponse = {
  message: string;
};

// LOGIN

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await api.post<LoginResponse>(
      "/api/users/login",
      {
        email,
        password,
      },
      {
        withCredentials: true,
      },
    );

    return response.data;
  } catch (error: unknown) {
    console.error("Login error", error);

    if (error instanceof AxiosError) {
      throw (
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Login failed"
      );
    }

    throw "Login failed";
  }
};

// SIGNUP

export const signupUser = async (
  name: string,
  email: string,
  password: string,
) => {
  try {
    const response = await api.post<SignupResponse>("/api/users/signup", {
      name,
      email,
      password,
    });

    return response.data;
  } catch (error: unknown) {
    console.error("Signup error", error);

    if (error instanceof AxiosError) {
      throw (
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Signup failed"
      );
    }

    throw "Signup failed";
  }
};

// RESEND VERIFICATION EMAIL

export const resendVerificationEmail = async (email: string) => {
  try {
    const response = await api.post<ResendVerificationResponse>(
      "/api/users/resendVerification",
      {
        email,
      },
    );

    return response.data;
  } catch (error: unknown) {
    console.error("Resend verification error", error);

    if (error instanceof AxiosError) {
      throw (
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to resend verification email"
      );
    }

    throw "Failed to resend verification email";
  }
};

// LOGOUT

export const logoutUser = async () => {
  await api.post(
    "/api/users/logout",
    {},
    {
      withCredentials: true,
    },
  );
};

// GET CURRENT USER

export const getCurrentUser = async () => {
  try {
    const response = await api.get<User>("/api/users/me", {
      withCredentials: true,
    });

    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      const status = error.response?.status;
      const message = (error.response?.data as { message?: string } | undefined)
        ?.message?.toLowerCase() || "";

      if (
        status === 401 ||
        status === 403 ||
        message.includes("unauthorized") ||
        message.includes("not authenticated") ||
        message.includes("token")
      ) {
        throw new Error("Session expired or invalid");
      }
    }

    return null;
  }
};

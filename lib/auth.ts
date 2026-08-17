import api from "./api";
import { User, LoginResponse, ResendVerificationResponse, CheckVerificationResponse, SignupResponse } from "./type";
import { AxiosError } from "axios";

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
  deviceId: string,
) => {
  try {
    const response = await api.post<SignupResponse>("/api/users/signup", {
      name,
      email,
      password,
      deviceId,
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

// CHECK VERIFICATION STATUS (polling)

export const checkVerification = async (deviceId: string) => {
  try {
    const response = await api.get<CheckVerificationResponse>(
      `/api/users/check-verification?device_id=${encodeURIComponent(deviceId)}`,
      { withCredentials: true },
    );
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response?.status === 202) {
      // 202 = still pending, not an error
      return { verified: false } as CheckVerificationResponse;
    }
    return { verified: false } as CheckVerificationResponse;
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
    }

    return null;
  }
};

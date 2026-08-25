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

export const resendVerificationEmail = async (email: string, deviceId: string) => {
  try {
    const response = await api.post<ResendVerificationResponse>(
      "/api/users/resendVerification",
      {
        email,
        deviceId,
      },
    );

    return response.data;
  } catch (error: unknown) {
    console.error("Resend verification error", error);

    if (error instanceof AxiosError) {
      throw (
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Sorry. Please try again later. "
      );
    }

    throw "Failed to resend verification email";
  }
};

// SUBMIT SELLER REQUEST

export const submitSellerRequest = async (data: {
  businessName: string;
  businessType: string;
  description: string;
  phone: string;
}) => {
  try {
    const response = await api.post("/api/seller-requests", data, { withCredentials: true });
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw error.response?.data?.message || error.response?.data?.error || "Failed to submit request";
    }
    throw "Failed to submit request";
  }
};

// ADMIN: GET PLATFORM STATS

export const getAdminStats = async () => {
  try {
    const response = await api.get("/api/admin/stats", { withCredentials: true });
    return response.data;
  } catch { return null; }
};

// ADMIN: GET ALL USERS

export const getAdminUsers = async () => {
  try {
    const response = await api.get("/api/admin/users", { withCredentials: true });
    return response.data;
  } catch { return []; }
};

// ADMIN: GET ALL SELLER REQUESTS

export const getAdminSellerRequests = async () => {
  try {
    const response = await api.get("/api/admin/seller-requests", { withCredentials: true });
    return response.data;
  } catch { return []; }
};

// ADMIN: APPROVE SELLER REQUEST

export const approveSellerRequest = async (requestId: string) => {
  try {
    const response = await api.patch(`/api/admin/seller-requests/${requestId}/approve`, {}, { withCredentials: true });
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) throw error.response?.data?.message || "Failed to approve";
    throw "Failed to approve";
  }
};

// ADMIN: REJECT SELLER REQUEST

export const rejectSellerRequest = async (requestId: string) => {
  try {
    const response = await api.patch(`/api/admin/seller-requests/${requestId}/reject`, {}, { withCredentials: true });
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) throw error.response?.data?.message || "Failed to reject";
    throw "Failed to reject";
  }
};

// ADMIN: SUSPEND / UNSUSPEND USER

export const suspendUser = async (userId: string) => {
  try {
    const response = await api.patch(`/api/admin/users/${userId}/suspend`, {}, { withCredentials: true });
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) throw error.response?.data?.message || "Failed";
    throw "Failed";
  }
};

export const deleteUser = async (userId: string) => {
  try {
    const response = await api.delete(`/api/admin/users/${userId}`, { withCredentials: true });
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) throw error.response?.data?.message || "Failed";
    throw "Failed";
  }
};

// GET SELLER REQUEST STATUS

export const getSellerRequest = async () => {
  try {
    const response = await api.get("/api/seller-requests/me", { withCredentials: true });
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response?.status === 404) return null;
    return null;
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

import axiosInstance from "@/api/axiosInstance";
import { LoginData } from "../types/auth";

export const authService = {
  login: async (credentials: LoginData) => {
    try {
      const response = await axiosInstance.post(
        "/api/users/signIn",
        credentials
      );
      return response;
    } catch (error: any) {
      if (error.response && error.response.data) {
        throw new Error(error.response.data.message);
      }
      throw new Error("Network error. Please try again.");
    }
  },
};

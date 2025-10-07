import axios from "axios";
import { env } from "~/config/env";

export const sentOtp = async (data: { phone: string }) => {
    const response = await axios.post(env.baseUrl.klinikuApi + "/auth/sent-otp", data);
    return response.data;
};

export const login = async (data: { phone: string; otp: string }) => {
  try {
    const response = await axios.post(env.baseUrl.klinikuApi + "/auth/login", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
import axios from "axios";
import { env } from "~/config/env";

export const sentOtp = async (data: { phone: string, opt: string }) => {
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

export const register = async (data: { name: string, phone: string, ktp: string, otp: string, registerOpt: "APP" }) => {
  try {
    const response = await axios.post(env.baseUrl.klinikuApi + "/auth/register", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const authInfo = async (data: { session: string }) => {
  try {
    const response = await axios.get(env.baseUrl.klinikuApi + "/auth/info", {
        headers: { Authorization: `Bearer ${data.session}`, 'Content-Type': 'application/json' }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
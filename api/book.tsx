import axios from "axios";
import { env } from "~/config/env";
import { Response } from "~/interface/response";

export const getBookOrderSummary = async (data: { session: string, sequence: string, polyClinicId: string, paymentMethod: string }) => {
    const response = await axios.get(env.baseUrl.klinikuApi + `/book/summary?sequence=${data.sequence}&polyClinicId=${data.polyClinicId}&paymentMethod=${data.paymentMethod}`, {
        headers: { Authorization: `Bearer ${data.session}`, 'Content-Type': 'application/json' }
    });
    return response.data as Promise<Response>;
};

export const bookQueue = async (data: { session: string, sequence: string; polyClinicId: string }) => {
  try {
    const response = await axios.post(env.baseUrl.klinikuApi + "/book/queue", data, {
        headers: { Authorization: `Bearer ${data.session}`, 'Content-Type': 'application/json' }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
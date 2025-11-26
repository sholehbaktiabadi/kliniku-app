import axios from "axios";
import { env } from "~/config/env";
import { Response } from "~/interface/response";

export const createPayment = async (data: { session: string, sequence: string; polyClinicId: string, grandTotal: string, paymentMethod: string }) => {
  try {
    const response = await axios.post(env.baseUrl.klinikuApi + "/transaction/create", data, {
        headers: { Authorization: `Bearer ${data.session}`, 'Content-Type': 'application/json' }
    });
    console.log(response.data)
    return response.data as Promise<Response>;
  } catch (error) {
    throw error;
  }
};
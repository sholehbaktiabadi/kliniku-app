import axios from "axios";
import { env } from "~/config/env";
import { Response } from "~/interface/response";

export const getPolyclinicDetails = async (data: { session: string, id: number }) => {
    const response = await axios.get(env.baseUrl.klinikuApi + `/polyclinic/${data.id}`, {
        headers: { Authorization: `Bearer ${data.session}`, 'Content-Type': 'application/json' }
    });
    return response.data as Promise<Response>;
};
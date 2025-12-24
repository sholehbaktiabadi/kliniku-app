import axios from "axios";
import { env } from "~/config/env";
import { Response, ResponsePaginate } from "~/interface/response";

export const getClinicList = async (data: { session: string }) => {
    const response = await axios.get(env.baseUrl.klinikuApi + "/clinic?page=1&limit=10", {
        headers: { Authorization: `Bearer ${data.session}`, 'Content-Type': 'application/json' }
    });
    return response.data as Promise<ResponsePaginate>;
};

export const getClinicdetails = async (data: { session: string, id: string }) => {
    const response = await axios.get(env.baseUrl.klinikuApi + `/clinic/${data.id}`, {
        headers: { Authorization: `Bearer ${data.session}`, 'Content-Type': 'application/json' }
    });
    return response.data as Promise<Response>;
};
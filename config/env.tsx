import { Env } from "~/interface/env";

export const env: Env = {
    app: {
        name: process.env.EXPO_PUBLIC_APP_ENV,
        env: process.env.EXPO_PUBLIC_APP_NAME
    },
    baseUrl: {
        klinikuApi: process.env.EXPO_PUBLIC_KLINIKU_API_URL
    }
};
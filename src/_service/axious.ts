import { TOKEN_KEY } from "authProvider";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { BASE_URL } from "common/options";


export const axiosInstance: any = axios.create({
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

axiosInstance.interceptors.request.use(

    async (config: any) => {
        const accessToken = localStorage.getItem(TOKEN_KEY);
        if (accessToken && config?.headers) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error: any) => {
        return Promise.reject(error);
    },
);

axiosInstance.interceptors.response.use(
    async (response: any) => {
        convertAxiosToFetchResponse(response);

        const data = response?.data;
        const errors = data?.errors;
        const originalRequest = response.config as AxiosRequestConfig & {
            _retry: boolean;
        };

        if (errors) {
            if (shouldRefreshToken(response) && !originalRequest?._retry) {
                const tokens = await refreshTokens();
                if (!tokens) throw errors;

                originalRequest._retry = true;
                return axiosInstance(originalRequest);
            }

            SetResponseOk(response, false);
            throw errors;
        }

        return response;
    },
    (error: any) => {
        SetResponseOk(error, false);
        return Promise.reject(error);
    },
);

const convertAxiosToFetchResponse = (response: AxiosResponse) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    response.headers["forEach"] = function (callback: any) {
        for (const header in this) {
            if (this.hasOwnProperty(header)) {
                callback(this[header], header, this);
            }
        }
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    response["text"] = async function () {
        return JSON.stringify(this.data);
    };
    SetResponseOk(response, true);
};

const SetResponseOk = (response: AxiosResponse, ok: boolean) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    response["ok"] = ok;
};

const shouldRefreshToken = (response: AxiosResponse) => {
    const errors = response?.data?.errors;
    if (!errors) return false;

    const currentRefreshToken = localStorage.getItem("refresh_token");
    if (!currentRefreshToken) return false;

    const hasAuthenticationError = errors.some((error: any) => {
        return error.extensions?.code === "UNAUTHENTICATED";
    });
    if (!hasAuthenticationError) return false;

    return true;
};

const refreshTokens = async () => {
    const currentRefreshToken = localStorage.getItem("refresh_token");
    if (!currentRefreshToken) return null;
    const currentAccessToken = localStorage.getItem("access_token");
    try {
        const response: any = await fetch(BASE_URL + "/token", {
            method: "POST",
            body: JSON.stringify({ "refreshToken": currentRefreshToken, "accessToken": currentAccessToken })
        });

        localStorage.setItem("access_token", response.refreshToken.accessToken);
        localStorage.setItem(
            "refresh_token",
            response.refreshToken.refreshToken,
        );

        return response.refreshToken;
    } catch (error) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        return null;
    }
};
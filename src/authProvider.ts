import { AuthBindings } from "@refinedev/core";
import { axiosInstance } from "@refinedev/simple-rest";
import { BASE_URL } from "common/options";

export const TOKEN_KEY = "refine-auth";

export const authProvider: AuthBindings = {
  login: async ({ username, email, password }) => {
    const response = await axiosInstance.post(BASE_URL + "/auth/login", { username: email, password });
    console.log(response)
    if (response.status === 200) {
      localStorage.setItem(TOKEN_KEY, response.data.accessToken);
      return {
        success: true,
        redirectTo: "/",
      };
    }

    return {
      success: false,
      error: {
        message: "Invalid credentials",
        name: "LoginError",
      },
    };
  },
  logout: async () => {
    localStorage.removeItem(TOKEN_KEY);
    return {
      success: true,
      redirectTo: "/login",
    };
  },
  check: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      redirectTo: "/login",
    };
  },
  getPermissions: async () => null,
  getIdentity: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      return {
        id: 1,
        name: "John Doe",
        avatar: "https://i.pravatar.cc/300",
      };
    }
    return null;
  },
  onError: async (error) => {
    if (error.status === 401 || error.status === 403) {
      return {
        logout: true,
        redirectTo: "/login",
        error,
      };
    }

    return {};
  }
};

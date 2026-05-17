import { apiRequest } from "./apiClient";

const loginUser = async ({ identifier, password }) => {
  try {
    const data = await apiRequest("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ identifier, password }),
    });

    const user = data.user;

    return {
      success: true,
      user: {
        ...user,
        name: user.fullName || user.firstName || user.email,
      },
    };
  } catch (error) {
    const message =
      error instanceof TypeError || /Failed to fetch|NetworkError/i.test(error?.message)
        ? "Unable to reach the login server. Make sure ParkGo-backend is running on port 3001."
        : error?.message || "Unable to log in.";

    return {
      success: false,
      message,
    };
  }
};

export const authService = {
  loginUser,
};

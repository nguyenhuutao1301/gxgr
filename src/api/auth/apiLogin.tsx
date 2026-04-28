import axiosInstance from "../../untils/axios";

export async function loginUser(credentials: {
  email: string;
  password: string;
}) {
  try {
    const response = await axiosInstance.post("/api/login", credentials);

    // Lấy accessToken từ response
    const { accessToken, orther, message } = response.data;

    // Lưu accessToken vào cookie phía client (session cookie)
    if (accessToken) {
      document.cookie = `accessToken=${accessToken}; path=/;`;
    }

    return {
      success: true,
      data: { user: orther, accessToken, message },
    };
  } catch (error: unknown) {
    let errorMessage = "An unknown error occurred";
    if (
      error &&
      typeof error === "object" &&
      "response" in error &&
      error.response &&
      typeof error.response === "object" &&
      "data" in error.response &&
      error.response.data &&
      typeof error.response.data === "object" &&
      "message" in error.response.data
    ) {
      errorMessage =
        (error.response as { data: { message?: string } }).data.message ||
        errorMessage;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    return {
      success: false,
      error: errorMessage,
    };
  }
}

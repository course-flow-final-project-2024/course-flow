import axios from "axios";

export default function jwtInterceptor() {
  axios.interceptors.request.use((req) => {
    const hasToken = Boolean(localStorage.getItem("token"));

    if (hasToken) {
      const token = JSON.parse(localStorage.getItem("token"));
      req.headers = {
        ...req.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    return req;
  });

  axios.interceptors.response.use(
    (req) => {
      return req;
    },
    (error) => {
      console.log(error);
      if (
        error.response.status === 401 &&
        error.response.statusText === "Unauthorized"
      ) {
        localStorage.removeItem("token");
      }

      return Promise.reject(error);
    }
  );
}

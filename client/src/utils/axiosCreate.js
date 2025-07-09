import axios from "axios";
import { logOut } from "../features/auth/authSlice";

let store;
export const injectStore = (_store) => {
  store = _store;
};

const axiosFetch = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL || "/api",
  withCredentials: true,
});

axiosFetch.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosFetch.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const userType = localStorage.getItem("userType");

    // حالة الخطأ 401 مع رسالة "Invalid token"
    if (error?.response?.status === 401 && error?.response?.data?.msg === "Invalid token") {
      handleForceLogout();
      return Promise.reject(error);
    }

    // حالة محاولة تجديد التوكن عند انتهاء الصلاحية
    if (
      error?.response?.status === 401 &&
      error?.response?.data?.msg === "Access Token is not valid" &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const rs = await axiosFetch.get(`/auth/${userType}/refresh`);
        localStorage.setItem("token", rs.data.accessToken);
        return axiosFetch(originalRequest);
      } catch (err) {
        if (
          err?.response?.status === 401 &&
          ["Invalid refresh token", "Refresh token not found"].includes(
            err?.response?.data?.msg
          )
        ) {
          handleForceLogout();
          return Promise.reject(err);
        }
      }
    }

    return Promise.reject(error);
  }
);

// دالة مساعدة للتعامل مع تسجيل الخروج القسري
function handleForceLogout() {
  localStorage.removeItem("token");
  localStorage.removeItem("userType");
  
  if (store) {
    store.dispatch(logOut());
  }
  
  // الانتقال إلى الصفحة الرئيسية مع إعادة تحميل الصفحة لضمان تنظيف الحالة
  window.location.href = "/";
  window.location.reload();
}

export default axiosFetch;
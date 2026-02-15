import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

// Attach access token to every request
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('admin_access');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});

// Auto refresh token if access expired
api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        if (!error.response) {
            return Promise.reject(error);
        }

        const originalRequest: any = error.config;

        // If 401 and not already retrying
        if (
            error.response.status === 401 &&
            !originalRequest._retry &&
            typeof window !== 'undefined'
        ) {
            originalRequest._retry = true;

            const refresh = localStorage.getItem('admin_refresh');
            if (!refresh) {
                logout();
                return Promise.reject(error);
            }

            try {
                const res = await axios.post(
                    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/token/refresh/`,
                    { refresh }
                );

                const newAccess = res.data.access;
                localStorage.setItem('admin_access', newAccess);

                originalRequest.headers.Authorization = `Bearer ${newAccess}`;
                return api(originalRequest);
            } catch (refreshError) {
                logout();
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export function logout() {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('admin_access');
        localStorage.removeItem('admin_refresh');
        localStorage.removeItem('admin_user');
        window.location.href = '/dashboard/login';
    }
}

export default api;
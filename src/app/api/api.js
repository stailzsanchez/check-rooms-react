import axios from 'axios';

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_CHECKROOMS,
// });

const isProduction = import.meta.env.VITE_NODE_ENV === 'production';

const api = axios.create({
  baseURL: isProduction
    ? import.meta.env.VITE_API_CHECKROOMS_PROD
    : import.meta.env.VITE_API_CHECKROOMS_DEV,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
    }

    const errorMessage = error.response?.data?.message || 'Произошла ошибка при выполнении запроса';

    error.userMessage = errorMessage;
    return Promise.reject(error);
  },
);

export default api;

// import axios from 'axios';
// import jwt_decode from "jwt-decode";

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_CHECKROOMS,
// });

// const refreshToken = async () => {
//   try {
//     const refreshToken = localStorage.getItem('refreshToken');
//     if (!refreshToken) {
//       throw new Error('Refresh token not found');
//     }
//     const response = await api.post('/auth/refresh-token', { refreshToken });
//     const { accessToken } = response.data;
//     localStorage.setItem('token', accessToken);
//     return accessToken;
//   } catch (error) {
//     console.error('Ошибка при обновлении токена:', error);
//     localStorage.removeItem('token');
//     localStorage.removeItem('refreshToken');
//     // window.location.href = '/login';
//     throw error; // Перебрасываем ошибку дальше
//   }
// };

// api.interceptors.request.use(async (config) => {
//   let token = localStorage.getItem('token');
//   if (token) {
//     try {
//       const decodedToken = jwt_decode(token);
//       const currentTime = Date.now() / 1000;
//       if (decodedToken.exp < currentTime) {
//         token = await refreshToken();
//       }
//       config.headers['x-auth-token'] = token;
//     } catch (error) {
//       console.error('Ошибка при обработке токена:', error);
//       localStorage.removeItem('token');
//       localStorage.removeItem('refreshToken');
//       // window.location.href = '/login';
//     }
//   }
//   return config;
// }, (error) => {
//   return Promise.reject(error);
// });

// // api.interceptors.response.use(
// //   (response) => response,
// //   async (error) => {
// //     if (error.response && error.response.status === 401) {
// //       try {
// //         const newToken = await refreshToken();
// //         const config = error.config;
// //         config.headers['x-auth-token'] = newToken;
// //         return api(config);
// //       } catch (refreshError) {
// //         console.error('Ошибка при обновлении токена:', refreshError);
// //         // window.location.href = '/login';
// //         return Promise.reject(refreshError);
// //       }
// //     }
// //     return Promise.reject(error);
// //   }
// // );

// export default api;

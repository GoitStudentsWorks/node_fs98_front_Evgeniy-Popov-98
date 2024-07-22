import axios from 'axios';
import { store } from '../redux/store';
import { refreshUser } from '../redux/auth/operations';

export const instance = axios.create({
  // baseURL: 'https://aquatrack-webapp-backend.onrender.com',
  baseURL: 'http://localhost:3000',
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const setToken = (token) => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearToken = () => {
  instance.defaults.headers.common.Authorization = '';
};

let refreshTokenRequest = null;

instance.interceptors.request.use(
  async (config) => {
    const state = store.getState();
    const token = state.auth.accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401 && !error.config._retry) {
      error.config._retry = true;

      if (!refreshTokenRequest) {
        refreshTokenRequest = store.dispatch(refreshUser())
          .then((resultAction) => {
            if (refreshUser.fulfilled.match(resultAction)) {
              setToken(resultAction.payload.accessToken);
              return resultAction.payload.accessToken;
            } else {
              clearToken();
              return Promise.reject(resultAction.payload);
            }
          })
          .finally(() => {
            refreshTokenRequest = null;
          });
      }

      try {
        const newToken = await refreshTokenRequest;
        error.config.headers.Authorization = `Bearer ${newToken}`;
        return instance.request(error.config);
      } catch (refreshError) {
        clearToken();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default instance;


// import axios from 'axios';
// import { store } from '../redux/store';
// import { refreshUser } from '../redux/auth/operations';

// export const instance = axios.create({
//   // baseURL: 'https://aquatrack-webapp-backend.onrender.com',
//   baseURL: 'http://localhost:3000',
//   withCredentials: true,
//   headers: {
//     Accept: 'application/json',
//     'Content-Type': 'application/json',
//   },
// });

// export const setToken = (token) => {
//   instance.defaults.headers.common.Authorization = `Bearer ${token}`;
// };

// export const clearToken = () => {
//   instance.defaults.headers.common.Authorization = '';
// };

// instance.interceptors.request.use(
//     async (config) => {
//       const state = store.getState();
//       const token = state.auth.accessToken;
//       if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//       }
//       return config;
//     },
//     (error) => {
//       return Promise.reject(error);
//     }
//   );
  
//   instance.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//       if (error.response && error.response.status === 401 && !error.config._retry) {
//         error.config._retry = true;
  
//         try {
//           const state = store.getState();
//           const refreshToken = state.auth.accessToken;
//           if (refreshToken) {
//             const resultAction = await store.dispatch(refreshUser());
//             if (refreshUser.fulfilled.match(resultAction)) {
//               setToken(resultAction.payload.accessToken);
//               error.config.headers.Authorization = `Bearer ${resultAction.payload.accessToken}`;
//               return instance.request(error.config);
//             } else {
//               clearToken();
//               return Promise.reject(resultAction.payload);
//             }
//           }
//         } catch (refreshError) {
//           clearToken();
//           return Promise.reject(refreshError);
//         }
//       }
  
//       return Promise.reject(error);
//     }
//   );
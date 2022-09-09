import { notification } from 'antd';
import Request from './request/index';
import type { RequestConfig } from './request/types';
import { getToken } from '@/redux/features/acountSlice';

export interface CustomRequestConfig<T> extends RequestConfig {
  data?: T;
}

export interface Response<T> {
  code: number;
  message: string;
  data: T;
}

const request = new Request({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 1000 * 60 * 5,
  withCredentials: true,
  interceptors: {
    // 请求拦截
    requestInterceptor: config => {
      const token = getToken();
      if (token) {
        config.headers = config.headers || {};
        config.headers['token'] = token;
      }
      return config;
    },
    // 响应拦截
    responseInterceptor: response => response,
    responseInterceptorCatch: error => {
      switch (error.response.data.code) {
        case '10004':
          notification.error({
            message: error.response.data.message,
            description: '请联系管理员'
          });
          break;

        // case '10101':
        //   store.dispatch(logout());
        //   notification.error({
        //     message: error.response.data.message
        //   });
        //   window.location.reload();
        //   break;
        default:
          notification.error({
            message: error.response.data.message || '网络错误'
          });
          // message.error(error.response.data.message);
          break;
      }
    }
  }
});

const customRequest = <D = any, T = any>(config: CustomRequestConfig<D>) => {
  const { method = 'GET' } = config;
  if (method.toUpperCase() === 'GET') {
    config.params = config.data;
  }
  return request.request<Response<T>>(config);
};

// 取消请求
export const cancelRequest = (url: string | string[]) => {
  return request.cancelRequest(url);
};

// 取消全部请求
export const cancelAllRequest = () => {
  return request.cancelAllRequest();
};

export default customRequest;

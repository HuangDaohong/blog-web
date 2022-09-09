import request from '@/service';
import { List, UserInfo } from '@/types';
import { Methods, Paths } from '@/enums';

class UserService {
  login(data: Pick<UserInfo, 'name' | 'password'>) {
    return request<Pick<UserInfo, 'name' | 'password'>, UserInfo>({
      url: `${Paths.User}/login`,
      data,
      method: Methods.POST,
      interceptors: {
        responseInterceptor: res => res
      }
    });
  }

  sendCode(data: { email: string }) {
    return request<{ email: string }, UserInfo>({
      url: `${Paths.User}/emailcode`,
      data,
      method: Methods.POST,
      interceptors: {
        responseInterceptor: res => res
      }
    });
  }

  register(data: any) {
    return request<any, UserInfo>({
      url: `${Paths.User}/register`,
      data,
      method: Methods.POST,
      interceptors: {
        responseInterceptor: res => res
      }
    });
  }

  getQQ(data: { id: number }) {
    return request<{ id: number }, any>({
      url: `${Paths.User}/getuserbyid`,
      method: Methods.GET,
      data,
      interceptors: {
        responseInterceptor: res => res
      }
    });
  }
  create(data: Pick<UserInfo, 'name' | 'email' | 'password'>) {
    return request<Pick<UserInfo, 'name' | 'email' | 'password'>, UserInfo>({
      url: Paths.User,
      method: 'POST',
      data,
      interceptors: {
        responseInterceptor: res => res
      }
    });
  }

  findAll(data: Record<string, string | number> = {}) {
    return request<Record<string, string | number>, List<UserInfo>>({
      url: Paths.User,
      method: Methods.GET,
      data,
      interceptors: {
        responseInterceptor: res => res
      }
    });
  }

  findOne() {
    return request<any, UserInfo>({
      url: Paths.User,
      method: Methods.GET,
      interceptors: {
        responseInterceptor: res => res
      }
    });
  }

  updatePassword(id: number, data: { password: string; newPassword: string; relNewPassword: string }) {
    return request<{ password: string; newPassword: string; relNewPassword: string }, UserInfo>({
      url: `${Paths.User}/${id}`,
      method: Methods.PATCH,
      data,
      interceptors: {
        responseInterceptor: res => res
      }
    });
  }

  update(id: number, data: Partial<UserInfo>) {
    return request<Partial<UserInfo>, UserInfo>({
      url: `${Paths.User}/${id}`,
      method: Methods.PUT,
      data,
      interceptors: {
        responseInterceptor: res => res
      }
    });
  }

  remove(id: number) {
    return request<any, UserInfo>({
      url: `${Paths.User}/${id}`,
      method: Methods.DELETE,
      interceptors: {
        responseInterceptor: res => res
      }
    });
  }
}

export default new UserService();

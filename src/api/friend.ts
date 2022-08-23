import request from '@/service';
import { Friend } from '@/types';
import { Methods, Paths } from '@/enums';
class FriendService {
  findAll() {
    return request<any, { count: number; rows: Friend[] }>({
      url: Paths.Friend,
      method: Methods.GET,
      interceptors: {
        responseInterceptor: res => res
      }
    });
  }

  create(data: Partial<Friend>) {
    return request<Partial<Friend>, Friend>({
      url: Paths.Friend,
      method: Methods.POST,
      data,
      interceptors: {
        responseInterceptor: res => res
      }
    });
  }

  findOne(id: number) {
    return request<number, Friend>({
      url: `${Paths.Friend}/${id}`,
      method: Methods.GET,
      interceptors: {
        responseInterceptor: res => res
      }
    });
  }

  update(id: number, data: Partial<Friend>) {
    return request<Partial<Friend>, Friend>({
      url: `${Paths.Friend}/${id}`,
      method: Methods.PUT,
      data,
      interceptors: {
        responseInterceptor: res => res
      }
    });
  }

  remove(id: number) {
    return request<{ id: number }, Friend>({
      url: `${Paths.Friend}/${id}`,
      method: Methods.DELETE,
      interceptors: {
        responseInterceptor: res => res
      }
    });
  }
}
export default new FriendService();

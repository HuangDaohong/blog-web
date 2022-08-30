import request from '@/service';
import { WebLog } from '@/types';
import { Methods, Paths } from '@/enums';
class webLogService {
  // 分页查询
  findAll(data: Record<string, string | number>) {
    return request<
      Record<string, string | number>,
      { rows: Array<WebLog>; count: number; pageNum: number; pageSize: number }
    >({
      url: Paths.WebLog,
      method: Methods.GET,
      data,
      interceptors: {
        responseInterceptor: res => res
      }
    });
  }

  // 全部日志
  findAllWebLogs() {
    return request<{ rows: Array<WebLog>; count: number }>({
      url: `${Paths.WebLog}/all`,
      method: Methods.GET,
      interceptors: {
        responseInterceptor: res => res
      }
    });
  }

  findOne(id: number) {
    return request<{ id: number }>({
      url: `${Paths.WebLog}/${id}`,
      method: Methods.GET,
      interceptors: {
        responseInterceptor: res => res
      }
    });
  }

  create(data: Partial<WebLog>) {
    return request<Partial<WebLog>, WebLog>({
      url: Paths.WebLog,
      method: Methods.POST,
      data,
      interceptors: {
        responseInterceptor: res => res
      }
    });
  }

  update(id: number, data: Partial<WebLog>) {
    return request<Partial<WebLog>>({
      url: `${Paths.WebLog}/${id}`,
      method: Methods.PUT,
      data,
      interceptors: {
        responseInterceptor: res => res
      }
    });
  }

  remove(id: number) {
    return request<{ id: number }>({
      url: `${Paths.WebLog}/${id}`,
      method: Methods.DELETE,
      interceptors: {
        responseInterceptor: res => res
      }
    });
  }
}
export default new webLogService();

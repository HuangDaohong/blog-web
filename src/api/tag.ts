import request from '@/service';
import { Methods, Paths } from '@/enums';
import { Tag } from '@/types';
class TagService {
  findAll(data: Record<string, string | number> = {}) {
    return request<Record<string, string | number>, { rows: Tag[]; count: number }>({
      url: Paths.Tag,
      method: Methods.GET,
      data,
      interceptors: {
        responseInterceptor: res => res
      }
    });
  }
  // findOne(id: number) {
  //   return request<number, Tag>({
  //     url: `${Paths.Tag}/${id}`,
  //     method: Methods.GET,
  //     interceptors: {
  //       responseInterceptor: res => res
  //     }
  //   });
  // }

  create(data: Partial<Tag>) {
    return request<Partial<Tag>, Tag>({
      url: Paths.Tag,
      method: Methods.POST,
      data,
      interceptors: {
        responseInterceptor: res => res
      }
    });
  }

  update(id: number, data: Partial<Tag>) {
    return request<Partial<Tag>, Tag>({
      url: `${Paths.Tag}/${id}`,
      method: Methods.PUT,
      data,
      interceptors: {
        responseInterceptor: res => res
      }
    });
  }

  remove(id: number) {
    return request<number, Tag>({
      url: `${Paths.Tag}/${id}`,
      method: Methods.DELETE,
      interceptors: {
        responseInterceptor: res => res
      }
    });
  }
}
export default new TagService();

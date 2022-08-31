import request from '@/service';
import { Category } from '@/types';
import { Methods, Paths } from '@/enums';
class CategoryService {
  // 分页查询
  findAll(data: Record<string, string | number>) {
    return request<Record<string, string | number>, { rows: Array<Category>; count: number }>({
      url: Paths.Category,
      method: Methods.GET,
      data,
      interceptors: {
        responseInterceptor: res => res
      }
    });
  }

  // 全部分类
  findAllCategorys() {
    return request<{ rows: Array<Category>; count: number }>({
      url: `${Paths.Category}/get/allcategory`,
      method: Methods.GET,
      interceptors: {
        responseInterceptor: res => res
      }
    });
  }

  findOne(id: number) {
    return request<number, Category>({
      url: `${Paths.Category}/${id}`,
      method: Methods.GET,
      interceptors: {
        responseInterceptor: res => res
      }
    });
  }

  create(data: Partial<Category>) {
    return request<Partial<Category>, Category>({
      url: Paths.Category,
      method: Methods.POST,
      data,
      interceptors: {
        responseInterceptor: res => res
      }
    });
  }

  update(data: Partial<Category>) {
    return request<Partial<Category>, Category>({
      url: `${Paths.Category}/update`,
      method: Methods.POST,
      data,
      interceptors: {
        responseInterceptor: res => res
      }
    });
  }

  remove({ id: number }) {
    return request<{ id: number }, Category>({
      url: `${Paths.Category}/delete`,
      method: Methods.POST,
      data: { id: number },
      interceptors: {
        responseInterceptor: res => res
      }
    });
  }
}
export default new CategoryService();

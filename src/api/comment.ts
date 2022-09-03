import request from '@/service';
import { IComment, List } from '@/types';
import { Methods, Paths } from '@/enums';

class commentService {
  //根据文章的id查询所有评论
  find(data: { id: number; pageNum: number; pageSize: number }) {
    return request<{ id: number; pageNum: number; pageSize: number }, List<IComment>>({
      url: `${Paths.Comment}/article/${data.id}`,
      method: Methods.GET,
      data,
      interceptors: {
        responseInterceptor: res => res
      }
    });
  }

  findAllByPage(data: Record<string, string | number> = {}) {
    return request<Record<string, string | number>, List<IComment>>({
      url: Paths.Comment,
      method: Methods.GET,
      data,
      interceptors: {
        responseInterceptor: res => res
      }
    });
  }

  // 包含子评论
  findAll(data: Record<string, string | number> = {}) {
    return request<Record<string, string | number>, List<IComment>>({
      url: `${Paths.Comment}/all/child`,
      method: Methods.GET,
      data,
      interceptors: {
        responseInterceptor: res => res
      }
    });
  }

  create(data: Partial<IComment>) {
    return request<Partial<IComment>, IComment>({
      url: Paths.Comment,
      method: Methods.POST,
      data,
      interceptors: {
        responseInterceptor: res => res
      }
    });
  }

  remove(id: number) {
    return request<number, IComment>({
      url: `${Paths.Comment}/${id}`,
      method: Methods.DELETE,
      interceptors: {
        responseInterceptor: res => res
      }
    });
  }
}

export default new commentService();

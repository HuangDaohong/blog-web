import request from '@/service';
import { Article, List } from '@/types';
import { Methods, Paths } from '@/enums';

/**
 * data是一个对象，里面的属性名是接口的参数名，属性值是参数的值
 * request(1,2):第一个参数是data类型，即请求参数类型，第二个参数是返回类型，即请求返回类型
 */
class ArticleService {
  findAll(data: Record<string, string | number> = {}) {
    return request<Record<string, string | number>, List<Article>>({
      url: `${Paths.Article}/web/all`,
      method: Methods.GET,
      data,
      interceptors: {
        responseInterceptor: res => res
      }
    });
  }

  // 文章点赞加1
  like(id: number) {
    return request<number, any>({
      url: `${Paths.Article}/${id}/like`,
      method: Methods.PATCH,
      interceptors: {
        responseInterceptor: res => res
      }
    });
  }

  // 随机获取推荐文章列表
  recommend(data: Record<string, number> = {}) {
    return request<Record<string, number>, List<Article>>({
      url: `${Paths.Article}/web/recommend`,
      method: Methods.GET,
      data,
      interceptors: {
        responseInterceptor: res => res
      }
    });
  }

  // 根据id删除文章
  remove(id: number) {
    return request<string, Article>({
      url: `${Paths.Article}/${id}`,
      method: Methods.DELETE,
      interceptors: {
        responseInterceptor: res => res
      }
    });
  }

  // 批量删除文章
  removeMany(data: { ids: number[] }) {
    return request<{ ids: number[] }, Article>({
      url: Paths.Article,
      method: Methods.DELETE,
      data,
      interceptors: {
        responseInterceptor: res => res
      }
    });
  }

  // 创建文章
  create(data: Partial<Article>) {
    return request<Partial<Article>, Article>({
      url: Paths.Article,
      method: Methods.POST,
      data,
      interceptors: {
        responseInterceptor: res => res
      }
    });
  }

  // 更新文章
  update(id: number, data: Partial<Article>) {
    return request<Partial<Article>, Article>({
      url: `${Paths.Article}/${id}`,
      method: Methods.PUT,
      data,
      interceptors: {
        responseInterceptor: res => res
      }
    });
  }

  // 根据id查询文章
  findOne(id: number) {
    return request<number, Article>({
      url: `${Paths.Article}/${id}`,
      method: Methods.GET,
      interceptors: {
        responseInterceptor: res => res
      }
    });
  }

  // 根据article_id查询文章
  findOneByArticleId(article_id: string) {
    return request<string, Article>({
      url: `${Paths.Article}/detail/${article_id}`,
      method: Methods.GET,
      interceptors: {
        responseInterceptor: res => res
      }
    });
  }

  // 上传文章图片
  uploadimgs(data: any) {
    return request({
      url: `${Paths.Article}/uploadimgs`,
      method: Methods.POST,
      data,
      interceptors: {
        responseInterceptor: res => res
      }
    });
  }
}

export default new ArticleService();

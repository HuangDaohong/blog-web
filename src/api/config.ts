import request from '@/service';
import { SiteData, Visitor, List } from '@/types';
import { Methods, Paths } from '@/enums';

class ConfigService {
  fetchSiteData() {
    return request<any, SiteData>({
      url: Paths.Config,
      method: Methods.GET,
      interceptors: {
        responseInterceptor: res => res
      }
    });
  }
  fetchVisitorData(data: Record<string, string | number> = {}) {
    return request<Record<string, string | number>, List<Visitor>>({
      url: Paths.Visitor,
      method: Methods.GET,
      data,
      interceptors: {
        responseInterceptor: res => res
      }
    });
  }
  createVisitor(data: Partial<Visitor>) {
    return request<Partial<Visitor>, Visitor>({
      url: Paths.Visitor,
      method: Methods.POST,
      data,
      interceptors: {
        responseInterceptor: res => res
      }
    });
  }
}

export default new ConfigService();

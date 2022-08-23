import request from '@/service';
import { SiteData } from '@/types';
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
}

export default new ConfigService();

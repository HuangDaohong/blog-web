import { META } from '@/config/constant';
/**
 * @description: 判断用户是否离开当前页面
 */
export const checkIsLocalPage = () => {
  window.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'hidden') {
      document.title = META.hidden_title;
    } else {
      document.title = META.title + ' - ' + META.sub_title;
    }
  });
};

export enum PublishState {
  Publish = 0, // 发布
  Draft = 1 // 草稿
}

export enum OnlineState {
  Online = 1, // 在线
  Offline = 0 // 下线
}

export enum OriginState {
  Original = 0, // 原创
  Reprint = 1, // 转载
  Hybrid = 2 // 混合
}

// export enum CommentState {
//   Recycle = -1,
//   Reject = 0,
//   Pass = 1
// }

export enum WeightSate {
  Large = 2, //推荐
  Medium = 1, //热门
  Small = 0 //普通
}

export enum Paths {
  Login = '/login',
  User = '/users',
  Article = '/article',
  Category = '/category',
  Tag = '/tags',
  Config = '/config',
  Comment = '/comment',
  Friend = '/friend',
  Wallpaper = '/wallpapers',
  WebLog = '/weblog',
  Visitor = '/viewer'
}

export enum Methods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE'
}

export enum Title {
  Talks = '动态',
  Friends = '友情链接',
  Categorys = '分类',
  Tags = '标签',
  Archives = '归档',
  Msg = '留言板',
  Link = '友情链接',
  Works = '一些作品',
  About = '关于'
}

export const publishStateMap = new Map(
  [
    {
      value: PublishState.Draft,
      name: '草稿',
      color: 'orange'
    },
    {
      value: PublishState.Publish,
      name: '已发布',
      color: 'green'
    }
  ].map(item => [item.value, item])
);

export const onlineStateMap = new Map(
  [
    {
      value: OnlineState.Online,
      name: '上线',
      color: 'green'
    },
    {
      value: OnlineState.Offline,
      name: '下线',
      color: 'orange'
    }
  ].map(item => [item.value, item])
);

export const OriginStateMap = new Map(
  [
    {
      value: OriginState.Reprint,
      name: '转载',
      color: 'error'
    },
    {
      value: OriginState.Original,
      name: '原创',
      color: 'success'
    },
    {
      value: OriginState.Hybrid,
      name: '混合',
      color: 'warning'
    }
  ].map(item => [item.value, item])
);

export const WeightStateMap = new Map(
  [
    {
      value: WeightSate.Large,
      name: '推荐',
      color: 'success'
    },
    {
      value: WeightSate.Medium,
      name: '热门',
      color: 'error'
    },
    {
      value: WeightSate.Small,
      name: '无权重',
      color: 'default'
    }
  ].map(item => [item.value, item])
);

export const ps = (state: PublishState) => {
  return publishStateMap.get(state)!;
};

export const oos = (state: OnlineState) => {
  return onlineStateMap.get(state)!;
};

export const os = (state: OriginState) => {
  return OriginStateMap.get(state)!;
};

// export const cs = (state: CommentState) => {
//   return CommentStateMap.get(state)!;
// };

export const ws = (state: WeightSate) => {
  return WeightStateMap.get(state)!;
};

// ReturnType<T> 获取函数返回值类型
export const publishStates = Array.from<ReturnType<typeof ps>>(publishStateMap.values());

export const onlineStates = Array.from<ReturnType<typeof oos>>(onlineStateMap.values());

export const originStates = Array.from<ReturnType<typeof os>>(OriginStateMap.values());

// export const commentStates = Array.from<ReturnType<typeof cs>>(CommentStateMap.values());

export const weightStates = Array.from<ReturnType<typeof ws>>(WeightStateMap.values());

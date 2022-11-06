import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
// createSlice 创建reducer的切片
// 它需要一个配置对象作为参数，通过对象的不同的属性来指定它的配置
export const configSlice = createSlice({
  name: 'config',
  initialState: {
    historyWords: [
      { value: 'js', date: 'hot' },
      { value: 'react', date: 'hot' },
      { value: '面试', date: 'hot' }
    ] as Array<{ value: string; date: string }>
  },
  reducers: {
    updateHistoryWords: (state, action: PayloadAction<string>) => {
      if (!action.payload.trim()) {
        return;
      }
      // 获取当前时间,转为多久前
      const date = dayjs().format('YYYY-MM-DD HH:mm:ss');
      // 添加到数组头部
      state.historyWords.unshift({ value: action.payload, date });
      // 去重
      state.historyWords = state.historyWords.filter((item, index) => {
        return state.historyWords.findIndex(i => i.value === item.value) === index;
      });
      // 截取前20个
      state.historyWords = state.historyWords.slice(0, 20);
    }
  }
});

const { updateHistoryWords } = configSlice.actions;

export { updateHistoryWords };

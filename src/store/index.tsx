import { atom, selector } from 'recoil';
export const keywordState = atom({
  key: 'keywordState',
  default: null
});
export const getkeywordState = selector({
  key: 'getkeywordState', // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const keyword = get(keywordState);
    return keyword;
  }
});

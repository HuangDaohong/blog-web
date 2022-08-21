/**
 * 打乱数组
 * @param {any[]} array
 * @return {any[]}
 */
export const shuffleArray = (array: any[]) => {
  if (!array) return [];
  const res = [...array];
  const len = res.length;
  for (let i = len - 1; i > 0; i--) {
    const randomPos = Math.floor(Math.random() * (i + 1));
    [res[i], res[randomPos]] = [res[randomPos], res[i]];
  }
  return res;
};

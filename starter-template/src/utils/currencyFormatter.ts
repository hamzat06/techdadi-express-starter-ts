export const formatter = (num: number) => {
  return Number(num)
    .toFixed(2)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

/**
 * 将数字转换为千分位分割，用于金额显示
 */

const PRECISION = 2; // 小数点位数

const convertMoney = val => {
  if (!val) return;
  val = val.toString();
  let one = val.split(".")[0];
  one = one.split('').reverse().join('');
  let two = val.split(".")[1] ? val.split(".")[1] : "00";
  const len = one.length;
  let oldI = 0;
  const temp = [];

  for (let i = 1; i <= len; i += 1) {
    if (i % 3 === 0 && i !== 0) {
      temp.push(one.substring(oldI, i).split('').reverse().join(''));
      oldI = i;
    }
  }

  if (len % 3 !== 0) {
    temp.push(one.substring(oldI, len).split('').reverse().join(''));
  }

  if (two.length < PRECISION) {
    for (let i = two.length; i < PRECISION; i += 1) {
      two += '0';
    }
  }
  return temp.reverse().join(",") + "." + two;
};

export default convertMoney;

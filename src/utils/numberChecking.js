export default function isNumber(value) {
  const num = Number(value);
  return !isNaN(num) && num.toString() === value.toString();
}

const array = process.argv.filter(function (value, index) {
  value = parseInt(value, 10);
  if (value !== undefined && typeof value === "number" && !isNaN(value)) {
    return value;
  }
});

function canBeSplitted(array) {
  if (array.length === 0) {
    return 0;
  }
  const mitad = Math.trunc(array.length / 2);
  let sum = 0;
  let sum1 = 0;
  for (let i = 0; i < array.length; i++) {
    if (i < mitad) {
      sum = sum + parseInt(array[i], 10);
    } else {
      sum1 = sum1 + parseInt(array[i], 10);
    }
  }
  if (sum === sum1) {
    return 1;
  }
  return -1;
}

console.log(canBeSplitted(array));

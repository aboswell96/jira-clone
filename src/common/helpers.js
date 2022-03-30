export function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

//Input: Array of Objects, attribute to pluck
//Output: Array of values under that attribute
export function pluck(array, attribute) {
  return array.map((obj) => obj[attribute]);
}

export const get_jhash = (b: number): number => {
  var x = 123456789;
  var i;
  var k = 0;
  for (i = 0; i < 1677696; i++) {
    x = ((x + b) ^ (x + (x % 3) + (x % 17) + b) ^ i) % 16776960;
    if (x % 117 == 0) {
      k = (k + 1) % 1111;
    }
  }
  return k;
}
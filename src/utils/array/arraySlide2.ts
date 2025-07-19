export function arraySlide2<A>(array: Array<A>, f: (x: A, y: A) => void): void {
  for (let i = 0; i < array.length - 1; i++) {
    f(array[i], array[i + 1])
  }
}

import assert from "node:assert"
import { test } from "node:test"
import { arraySlide2 } from "./arraySlide2.ts"

test("arraySlide2", () => {
  const results: Array<[number, number]> = []
  arraySlide2([1, 2, 3, 4], (x, y) => results.push([x, y]))
  assert.deepStrictEqual(results, [
    [1, 2],
    [2, 3],
    [3, 4],
  ])
})

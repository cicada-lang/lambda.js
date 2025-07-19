import assert from "node:assert"
import { test } from "node:test"
import { freshen } from "./freshen.ts"

test("freshen create new string not in set", () => {
  assert.deepStrictEqual(freshen(new Set(["x"]), "x"), "x₁")
  assert.deepStrictEqual(freshen(new Set(["x", "x₁"]), "x"), "x₂")
  assert.deepStrictEqual(freshen(new Set(["x", "x₁", "x₂"]), "x"), "x₃")
})

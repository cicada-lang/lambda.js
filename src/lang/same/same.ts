import { type Value } from "../value/index.ts"
import { emptyCtx } from "./Ctx.ts"
import { sameInCtx } from "./sameInCtx.ts"

export function same(left: Value, right: Value): boolean {
  return sameInCtx(emptyCtx(), left, right)
}

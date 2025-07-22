import { type Value } from "../value/index.ts"
import { emptyCtx } from "./Ctx.ts"
import { sameInCtx } from "./sameInCtx.ts"

export function same(lhs: Value, rhs: Value): boolean {
  return sameInCtx(emptyCtx(), lhs, rhs)
}

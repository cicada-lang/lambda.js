import { type Value } from "../value/index.ts"
import { emptyCtx } from "./Ctx.ts"
import { equalInCtx } from "./equalInCtx.ts"

export function equal(lhs: Value, rhs: Value): boolean {
  return equalInCtx(emptyCtx(), lhs, rhs)
}

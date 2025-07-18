import { type Value } from "../value/index.ts"
import { emptyCtx } from "./Ctx.ts"
import { equalInCtx } from "./equalInCtx.ts"

export function equal(left: Value, right: Value): boolean {
  return equalInCtx(emptyCtx(), left, right)
}

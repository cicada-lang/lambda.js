import { type Value } from "../value/index.ts"
import { emptyCtx } from "./Ctx.ts"
import { equivalentInCtx } from "./equivalentInCtx.ts"

export function equivalent(left: Value, right: Value): boolean {
  return equivalentInCtx(emptyCtx(), left, right)
}

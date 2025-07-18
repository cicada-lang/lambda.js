import { type Exp } from "../exp/index.ts"
import { type Value } from "../value/index.ts"
import { emptyCtx } from "./Ctx.ts"
import { readbackInCtx } from "./readbackInCtx.ts"

export function readback(value: Value): Exp {
  return readbackInCtx(emptyCtx(), value)
}

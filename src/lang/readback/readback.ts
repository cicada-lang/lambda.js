import { type Exp } from "../exp/index.ts"
import { type Value } from "../value/index.ts"
import { emptyReadbackCtx, readbackInCtx } from "./readbackInCtx.ts"

export function readback(value: Value): Exp {
  return readbackInCtx(emptyReadbackCtx(), value)
}

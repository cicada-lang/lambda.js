import * as Exps from "../exp/index.ts"
import { type Exp } from "../exp/index.ts"
import { type Neutral } from "../neutral/index.ts"
import { readback, ReadbackCtx } from "../readback/index.ts"

export function readbackNeutral(ctx: ReadbackCtx, neutral: Neutral): Exp {
  switch (neutral.kind) {
    case "Var": {
      return Exps.Var(neutral.name)
    }

    case "Apply": {
      return Exps.Apply(
        readbackNeutral(ctx, neutral.target),
        readback(ctx, neutral.arg),
      )
    }

    case "ApplyRecursive": {
      return Exps.Apply(
        readback(ctx, neutral.fn),
        readbackNeutral(ctx, neutral.arg),
      )
    }
  }
}

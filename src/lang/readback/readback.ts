import { apply } from "../apply/index.ts"
import * as Exps from "../exp/index.ts"
import { type Exp } from "../exp/index.ts"
import * as Neutrals from "../neutral/index.ts"
import { type Neutral } from "../neutral/index.ts"
import { freshen } from "../utils/freshen.ts"
import * as Values from "../value/index.ts"
import { type Value } from "../value/index.ts"

type ReadbackCtx = {
  usedNames: Set<string>
}

export function readback(ctx: ReadbackCtx, value: Value): Exp {
  switch (value.kind) {
    case "NotYet": {
      return readbackNeutral(ctx, value.neutral)
    }

    case "Lambda": {
      const freshName = freshen(ctx.usedNames, value.name)
      ctx = {
        ...ctx,
        usedNames: new Set([...ctx.usedNames, freshName]),
      }
      const arg = Values.NotYet(Neutrals.Var(freshName))
      const ret = apply(value, arg)
      return Exps.Lambda(freshName, readback(ctx, ret))
    }

    case "Lazy": {
      return readback(ctx, Values.lazyActive(value))
    }
  }
}

function readbackNeutral(ctx: ReadbackCtx, neutral: Neutral): Exp {
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
  }
}

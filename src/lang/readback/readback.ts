import { apply } from "../apply/index.ts"
import * as Exps from "../exp/index.ts"
import { type Exp } from "../exp/index.ts"
import { freshen } from "../utils/freshen.ts"
import * as Neutrals from "../value/index.ts"
import * as Values from "../value/index.ts"
import { type Neutral, type Value } from "../value/index.ts"

type Ctx = {
  usedNames: Set<string>
}

export function emptyReadbackCtx(): Ctx {
  return {
    usedNames: new Set(),
  }
}

function ctxUseName(ctx: Ctx, name: string): Ctx {
  return {
    ...ctx,
    usedNames: new Set([...ctx.usedNames, name]),
  }
}

export function readback(ctx: Ctx, value: Value): Exp {
  switch (value.kind) {
    case "NotYet": {
      return readbackNeutral(ctx, value.neutral)
    }

    case "Lambda": {
      const freshName = freshen(ctx.usedNames, value.name)
      ctx = ctxUseName(ctx, freshName)
      const arg = Values.NotYet(Neutrals.Var(freshName))
      const ret = apply(value, arg)
      return Exps.Lambda(freshName, readback(ctx, ret))
    }

    case "Lazy": {
      return readback(ctx, Values.lazyActive(value))
    }
  }
}

function readbackNeutral(ctx: Ctx, neutral: Neutral): Exp {
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

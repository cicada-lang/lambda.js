import { freshen } from "../../utils/freshen.ts"
import { apply } from "../evaluate/index.ts"
import * as Exps from "../exp/index.ts"
import { type Exp } from "../exp/index.ts"
import * as Neutrals from "../value/index.ts"
import * as Values from "../value/index.ts"
import { type Neutral, type Value } from "../value/index.ts"

export function readbackInCtx(ctx: Ctx, value: Value): Exp {
  switch (value.kind) {
    case "NotYet": {
      return readbackNeutralInCtx(ctx, value.neutral)
    }

    case "Lambda": {
      const freshName = freshen(ctx.usedNames, value.name)
      ctx = ctxUseName(ctx, freshName)
      const arg = Values.NotYet(Neutrals.Var(freshName))
      const ret = apply(value, arg)
      return Exps.Lambda(freshName, readbackInCtx(ctx, ret))
    }

    case "Lazy": {
      return readbackInCtx(ctx, Values.lazyActive(value))
    }

    case "DelayedApply": {
      return readbackInCtx(ctx, apply(value.target, value.arg))
    }
  }
}

function readbackNeutralInCtx(ctx: Ctx, neutral: Neutral): Exp {
  switch (neutral.kind) {
    case "Var": {
      return Exps.Var(neutral.name)
    }

    case "Apply": {
      return Exps.Apply(
        readbackNeutralInCtx(ctx, neutral.target),
        readbackInCtx(ctx, neutral.arg),
      )
    }
  }
}

type Ctx = {
  usedNames: Set<string>
}

export function emptyCtx(): Ctx {
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

import { freshen } from "../../utils/name/freshen.ts"
import { applyWithDelay } from "../evaluate/index.ts"
import * as Exps from "../exp/index.ts"
import { type Exp } from "../exp/index.ts"
import * as Neutrals from "../value/index.ts"
import * as Values from "../value/index.ts"
import {
  delayedApplyHead,
  lambdaIsDefined,
  type Neutral,
  type Value,
} from "../value/index.ts"
import {
  ctxBindName,
  ctxBlazeOccurred,
  ctxBlazeTrail,
  type Ctx,
} from "./Ctx.ts"

export function readbackInCtx(ctx: Ctx, value: Value): Exp {
  switch (value.kind) {
    case "NotYet": {
      return readbackNeutralInCtx(ctx, value.neutral)
    }

    case "Lambda": {
      if (lambdaIsDefined(value)) {
        if (ctxBlazeOccurred(ctx, value)) {
          return Exps.Var(value.definedName)
        } else {
          ctx = ctxBlazeTrail(ctx, value)
        }
      }

      const freshName = freshen(ctx.boundNames, value.name)
      ctx = ctxBindName(ctx, freshName)
      const arg = Values.NotYet(Neutrals.Var(freshName))
      const ret = applyWithDelay(value, arg)
      return Exps.Lambda(freshName, readbackInCtx(ctx, ret))
    }

    case "Lazy": {
      return readbackInCtx(ctx, Values.lazyActive(value))
    }

    case "DelayedApply": {
      const head = delayedApplyHead(value)
      if (head.kind === "Lambda") {
        if (lambdaIsDefined(head)) {
          if (ctxBlazeOccurred(ctx, head)) {
            return Exps.Apply(
              readbackInCtx(ctx, value.target),
              readbackInCtx(ctx, value.arg),
            )
          } else {
            ctx = ctxBlazeTrail(ctx, head)
          }
        }
      }

      return readbackInCtx(ctx, applyWithDelay(value.target, value.arg))
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

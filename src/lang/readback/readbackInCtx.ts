import { freshen } from "../../utils/name/freshen.ts"
import { applyWithDelay } from "../evaluate/index.ts"
import * as Exps from "../exp/index.ts"
import { type Exp } from "../exp/index.ts"
import * as Neutrals from "../value/index.ts"
import * as Values from "../value/index.ts"
import { lambdaIsDefined, type Neutral, type Value } from "../value/index.ts"
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
      // We should not `applyWithDelay` again,
      // when any outer named lambda occors in this delayed-apply.

      if (value.target.kind === "Lambda") {
        if (lambdaIsDefined(value.target)) {
          if (ctxBlazeOccurred(ctx, value.target)) {
            return Exps.Apply(
              Exps.Var(value.target.definedName),
              readbackInCtx(ctx, value.arg),
            )
          } else {
            ctx = ctxBlazeTrail(ctx, value.target)
          }
        }
      }

      // return Exps.Apply(
      //   readbackInCtx(ctx, value.target),
      //   readbackInCtx(ctx, value.arg),
      // )

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

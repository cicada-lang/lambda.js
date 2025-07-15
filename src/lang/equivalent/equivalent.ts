import { apply } from "../apply/index.ts"
import * as Neutrals from "../neutral/index.ts"
import { type Neutral } from "../neutral/index.ts"
import { freshen } from "../utils/freshen.ts"
import * as Values from "../value/index.ts"
import { type Value } from "../value/index.ts"

type Ctx = {
  usedNames: Set<string>
}

export function equivalent(ctx: Ctx, left: Value, right: Value): boolean {
  left = Values.lazyActiveDeep(left)
  right = Values.lazyActiveDeep(right)

  switch (left.kind) {
    case "NotYet": {
      return (
        right.kind === "NotYet" &&
        equivalentNeutral(ctx, left.neutral, right.neutral)
      )
    }

    case "Lambda": {
      const freshName = freshen(ctx.usedNames, left.name)
      ctx = {
        ...ctx,
        usedNames: new Set([...ctx.usedNames, freshName]),
      }
      const v = Neutrals.Var(freshName)
      const arg = Values.NotYet(v)
      return equivalent(ctx, apply(left, arg), apply(right, arg))
    }

    case "Lazy": {
      return equivalent(ctx, Values.lazyActive(left), right)
    }
  }
}

function equivalentNeutral(ctx: Ctx, left: Neutral, right: Neutral): boolean {
  switch (left.kind) {
    case "Var": {
      return right.kind === "Var" && right.name === left.name
    }

    case "Apply": {
      return (
        right.kind === "Apply" &&
        equivalentNeutral(ctx, left.target, right.target) &&
        equivalent(ctx, left.arg, right.arg)
      )
    }
  }
}

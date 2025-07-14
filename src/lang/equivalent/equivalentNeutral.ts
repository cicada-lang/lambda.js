import { equivalent, EquivalentCtx } from "../equivalent/index.ts"
import { type Neutral } from "../neutral/index.ts"

export function equivalentNeutral(
  ctx: EquivalentCtx,
  left: Neutral,
  right: Neutral,
): boolean {
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

import { type Neutral, type Value } from "../value/index.ts"
import { formatExp } from "./formatExp.ts"

export function formatValue(value: Value): string {
  switch (value.kind) {
    case "NotYet": {
      return formatNeutral(value.neutral)
    }

    case "Lambda": {
      if (value.definedName === undefined) {
        return `(lambda (${value.name}) ${value.ret})`
      } else {
        return value.definedName
      }
    }

    case "Lazy": {
      return formatExp(value.exp)
    }

    case "DelayedApply": {
      const target = formatValue(value.target)
      const arg = formatValue(value.arg)
      return `(${target} ${arg})`
    }
  }
}

function formatNeutral(neutral: Neutral): string {
  switch (neutral.kind) {
    case "Var": {
      return neutral.name
    }

    case "Apply": {
      const target = formatNeutral(neutral.target)
      const arg = formatValue(neutral.arg)
      return `(${target} ${arg})`
    }
  }
}

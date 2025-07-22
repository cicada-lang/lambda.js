import { DelayedApply, type Value } from "./Value.ts"

export function delayedApplyHead(delayedApply: DelayedApply): Value {
  if (delayedApply.target.kind === "DelayedApply") {
    return delayedApplyHead(delayedApply.target)
  }

  return delayedApply.target
}

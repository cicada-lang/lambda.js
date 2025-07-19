import { type Lambda } from "./Value.ts"

export function lambdaIsDefined(lambda: Lambda): boolean {
  return lambda.definedName !== undefined
}

export function lambdaSameDefined(x: Lambda, y: Lambda): boolean {
  return (
    lambdaIsDefined(x) && lambdaIsDefined(y) && x.definedName === y.definedName
  )
}

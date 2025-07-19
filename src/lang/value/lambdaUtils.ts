import { type Lambda } from "./Value.ts"

type DefinedLambda = Lambda & { definedName: string }

export function lambdaIsDefined(lambda: Lambda): lambda is DefinedLambda {
  return lambda.definedName !== undefined
}

export function lambdaSameDefined(x: Lambda, y: Lambda): boolean {
  return (
    lambdaIsDefined(x) &&
    lambdaIsDefined(y) &&
    x.definedName === y.definedName &&
    x.mod === y.mod
  )
}

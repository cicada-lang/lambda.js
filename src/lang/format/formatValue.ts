import { readback } from "../readback/index.ts"
import { type Value } from "../value/index.ts"
import { formatExp } from "./formatExp.ts"

export function formatValue(value: Value): string {
  return formatExp(readback(value))
}

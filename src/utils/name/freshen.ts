import { stringToSubscript } from "../string/stringToSubscript.ts"

export function freshen(usedNames: Set<string>, name: string): string {
  let counter = 1
  let freshName = name
  while (true) {
    if (usedNames.has(freshName)) {
      const subscript = stringToSubscript(String(counter++))
      freshName = `${name}${subscript}`
    } else {
      return freshName
    }
  }
}

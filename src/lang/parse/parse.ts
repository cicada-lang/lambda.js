import { parseDataArray } from "@xieyuheng/x-data.js"
import { type Stmt } from "../stmt/index.ts"
import { matchStmt } from "./matchStmt.ts"

export function parseStmts(text: string): Array<Stmt> {
  return parseDataArray(text).map(matchStmt)
}

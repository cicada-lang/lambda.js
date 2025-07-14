import type { Bind } from "../../lang/exp/index.ts"
import { bindsToArray, type Exp } from "../exp/index.ts"

export function formatExp(exp: Exp): string {
  switch (exp.kind) {
    case "Var": {
      return exp.name
    }

    case "Lambda": {
      const { names, ret } = formatLambda([exp.name], exp.ret)
      return `(lambda (${names.join(" ")}) ${ret})`
    }

    case "Apply": {
      const { target, args } = formatApply(exp.target, [formatExp(exp.arg)])
      return `(${target} ${args.join(" ")})`
    }

    case "Let": {
      const binds = bindsToArray(exp.binds).map(formatBind)
      return `(let (${binds.join(" ")}) ${formatExp(exp.body)})`
    }
  }
}

function formatLambda(
  names: Array<string>,
  ret: Exp,
): { names: Array<string>; ret: string } {
  if (ret.kind === "Lambda") {
    return formatLambda([...names, ret.name], ret.ret)
  } else {
    return { names, ret: formatExp(ret) }
  }
}

function formatApply(
  target: Exp,
  args: Array<string>,
): { target: string; args: Array<string> } {
  if (target.kind === "Apply") {
    return formatApply(target.target, [formatExp(target.arg), ...args])
  } else {
    return { target: formatExp(target), args }
  }
}

function formatBind(bind: Bind): string {
  return `[${bind.name} ${formatExp(bind.exp)}]`
}

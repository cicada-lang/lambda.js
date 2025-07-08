import type { Bind } from "../../lang/exp/index.ts"
import { bindsBinds, type Exp } from "../exp/index.ts"

export function formatExp(exp: Exp): string {
  switch (exp.kind) {
    case "Var": {
      return exp.name
    }

    case "Fn": {
      const { names, ret } = formatFn([exp.name], exp.ret)
      return `(lambda (${names.join(" ")}) ${ret})`
    }

    case "FnRec": {
      const { names, ret } = formatFn([exp.name], exp.ret)
      return `(lambda (${names.join(" ")}) ${ret})`
    }

    case "Ap": {
      const { target, args } = formatAp(exp.target, [formatExp(exp.arg)])
      return `(${target} ${args.join(" ")})`
    }

    case "Let": {
      const binds = bindsBinds(exp.binds).map(formatBind)
      return `(let (${binds.join(" ")}) ${formatExp(exp.body)})`
    }
  }
}

function formatFn(
  names: Array<string>,
  ret: Exp,
): { names: Array<string>; ret: string } {
  if (ret.kind === "Fn") {
    return formatFn([...names, ret.name], ret.ret)
  } else {
    return { names, ret: formatExp(ret) }
  }
}

function formatAp(
  target: Exp,
  args: Array<string>,
): { target: string; args: Array<string> } {
  if (target.kind === "Ap") {
    return formatAp(target.target, [formatExp(target.arg), ...args])
  } else {
    return { target: formatExp(target), args }
  }
}

function formatBind(bind: Bind): string {
  return `[${bind.name} ${formatExp(bind.exp)}]`
}

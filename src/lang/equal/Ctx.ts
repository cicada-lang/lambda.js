export type Ctx = {
  usedNames: Set<string>
}

export function emptyCtx(): Ctx {
  return {
    usedNames: new Set(),
  }
}

export function ctxUseName(ctx: Ctx, name: string): Ctx {
  return {
    ...ctx,
    usedNames: new Set([...ctx.usedNames, name]),
  }
}

export type Ctx = {
  boundNames: Set<string>
}

export function emptyCtx(): Ctx {
  return {
    boundNames: new Set(),
  }
}

export function ctxBindName(ctx: Ctx, name: string): Ctx {
  return {
    ...ctx,
    boundNames: new Set([...ctx.boundNames, name]),
  }
}

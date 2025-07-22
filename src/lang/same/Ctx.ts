export type Ctx = {
  boundNames: Set<string>
  depth: number
}

export function emptyCtx(): Ctx {
  return {
    boundNames: new Set(),
    depth: 0,
  }
}

export function ctxDepthAdd1(ctx: Ctx): Ctx {
  return {
    ...ctx,
    depth: ctx.depth + 1,
  }
}

export function ctxBindName(ctx: Ctx, name: string): Ctx {
  return {
    ...ctx,
    boundNames: new Set([...ctx.boundNames, name]),
  }
}

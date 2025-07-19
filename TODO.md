`equalInCtx` call `applyOneStep` instead of `apply`
`equalInCtx` compare current pair to `ctx.trail` handle recursive function

`readback` handle recursive function

fix `examples/factorial.lisp`
fix `examples/nat-even-odd.lisp`

refactor `load` to support circular imports

- if we can support mutually defined recursive function,
  we should also support circular imports.

# later

`let-one` vs `let` and `let*`

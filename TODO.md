`same` and `sameInCtx` -- do not partial evaluate function with `definedName`

`assert-same`
`assert-not-same`

`equalInCtx` with `ctx.trail` handle recursive function
`equalInCtx` call `applyOneStep`

`readback` handle recursive function

fix `examples/factorial.lisp`
fix `examples/nat-even-odd.lisp`

refactor `load` to support circular imports

- if we can support mutually defined recursive function,
  we should also support circular imports.

# later

`let-one` vs `let` and `let*`

# builtin

add builtin

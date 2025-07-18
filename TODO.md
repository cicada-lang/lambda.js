move `Def` to `mod/`

`Lambda` has optional `definedName`
`readback` handle recursive function
`equivalent` handle recursive function -- simple way

move test from `todo/` back to `examples/`

refactor `load` to support circular imports

- if we can support mutually defined recursive function,
  we should also support circular imports.

`DelayedApply` as value
refactor `apply` to `delay` and `apply`
`equivalent` with `ctx.trail` handle recursive function -- the right way

# later

`let-one` vs `let` and `let*`

remove lazy evaluation

`assert-equal` and `assert-not-equal` only take two args
`assert-same` and `assert-not-same` only take two args

`readback` handle recursive function

refactor `load` to support circular imports

- if we can support mutually defined recursive function,
  we should also support circular imports.

# later

`let-one` vs `let` and `let*`

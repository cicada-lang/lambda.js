`run` should be async
call `run` in `load`
rename `run/` to `load/`

call `handleImport` after `handleDefine` -- to support circular imports

- if we can support mutually defined recursive function,
  we should also support circular imports.

# lazy evaluation

[problem] we can use `Y`! -- `DelayedApply` can replace `Lazy`? -- what evaluation strategy is this?
[maybe] bring lazy evaluation back
[maybe] remove lazy -- if the new evaluation strategy is good!
